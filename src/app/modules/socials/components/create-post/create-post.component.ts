import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextareaModule } from 'primeng/inputtextarea';

import {
  allowedValuesValidator,
  allowedValuesAsyncValidator,
} from '@/shared/validators/allowedValues.validator';
import { DropdownModule } from 'primeng/dropdown';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { NgxGridModule } from '@egjs/ngx-grid';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PickerModule,
    AvatarModule,
    OverlayPanelModule,
    InputTextareaModule,
    DropdownModule,
    NgIconsModule,
    ButtonModule,
    TooltipModule,
    NgxGridModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  createPostForm: any;
  showEmojiPicker: boolean = false;
  visibilityOptions: any[] = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
    { label: 'Friend only', value: 'friend_only' },
  ];
  visibility: string = 'Public';
  gap = 4;
  align = 'justify' as const;
  masonryItems = [
    { title: 'item 1' },
    { title: 'item 2' },
    { title: 'item 3' },
  ];
  frame = [
    [1, 1, 2, 2],
    [3, 3, 2, 2],
    [4, 4, 4, 5],
  ];
  rectSize = 0;
  useFrameFill = true;
  defaultDirection: 'start' | 'end' = 'end';
  columnRange = [1, 5];
  rowRange = 1;
  sizeRange = [0, 5000];
  isCroppedSize = false;
  displayedRow = -1;
  medias = [
    {
      id: 0,
      url: 'https://imgupscaler.com/images/samples/midjourney-before.webp',
      type: '',
    },
    {
      id: 1,
      url: 'https://www.w3schools.com/w3images/fjords.jpg',
      type: '',
    },
    {
      id: 2,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY2SkU6yFEglZQ4bEfIgnHbpxQkCD0HT-crw&usqp=CAU',
      type: '',
    },
    {
      id: 3,
      url: 'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',
      type: '',
    },
    // {
    //   id: 4,
    //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVn_cYBBf-vN5O9ESPhrEo4nsP9z1km4sMpQ&usqp=CAU',
    //   type: '',
    // },
    // {
    //   id: 5,
    //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgeLJQx70TedhBr8pJ0wu__xdNQQUEkoKF1w&usqp=CAU',
    //   type: '',
    // },
    // {
    //   id: 6,
    //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0pSIRuueE0BfIZVk6oZ8X9xJYXq_xEnlM8Q&usqp=CAU',
    //   type: '',
    // },
    // {
    //   id: 7,
    //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG76vGDk6FRTub8opBWzNMLFYZmvMjwYoABFIvaHPqlVCrOtHiO3ol2VyDAUnweQY9WpI&usqp=CAU',
    //   type: '',
    // },
    // {
    //   id: 8,
    //   url: 'https://naver.github.io/egjs-infinitegrid/assets/image/1.jpg',
    //   type: '',
    // },
    // {
    //   id: 9,
    //   url: 'https://naver.github.io/egjs-infinitegrid/assets/image/2.jpg',
    //   type: '',
    // },
    // {
    //   id: 10,
    //   url: 'https://naver.github.io/egjs-infinitegrid/assets/image/3.jpg',
    //   type: '',
    // },
    // {
    //   id: 11,
    //   url: 'https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg',
    //   type: '',
    // },
    // {
    //   id: 12,
    //   url: 'https://naver.github.io/egjs-infinitegrid/assets/image/5.jpg',
    //   type: '',
    // },
    // {
    //   id: 13,
    //   url: 'https://thumbs.dreamstime.com/b/no-image-available-text-blackboard-11434613.jpg',
    //   type: '',
    // },
    // {
    //   id: 14,
    //   url: 'https://thumbs.dreamstime.com/b/no-image-available-text-blackboard-11434613.jpg',
    //   type: '',
    // },
    // {
    //   id: 15,
    //   url: 'https://thumbs.dreamstime.com/b/no-image-available-text-blackboard-11434613.jpg',
    //   type: '',
    // },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      post_type: [
        'individual_post',
        Validators.required,
        allowedValuesAsyncValidator([
          'group_post',
          'individual_post',
          'share_post',
        ]),
      ],
      medias: [],
      places: [],
      friend_tags: [],
      visibility: [
        'public',
        Validators.required,
        allowedValuesAsyncValidator([
          'private_group',
          'public_group',
          'friend_only',
          'public',
          'private',
        ]),
      ],
    });
  }

  handleEmojiClick(event: any) {
    const emoji = event.emoji.native;
    const currentTitle = this.createPostForm.value.title;
    const updatedTitle = currentTitle + emoji;
    this.createPostForm.get('emoji')?.setValue(emoji);
    this.createPostForm.get('title')?.setValue(updatedTitle);
  }

  handleCreatePost() {
    console.log(this.createPostForm.value);
  }

  handleClickVisibility(option: any, visibilityOp: any) {
    this.createPostForm.get('visibility')?.setValue(option.value);
    this.visibility = option.label;
    visibilityOp.hide();
  }

  handleRemoveMedia(id: number) {
    this.medias = this.medias.filter((media) => media.id !== id);
    this.cdr.detectChanges();
  }
}
