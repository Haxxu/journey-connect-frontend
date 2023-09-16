import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
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

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ReactiveFormsModule,
    PickerModule,
    AvatarModule,
    OverlayPanelModule,
    InputTextareaModule,
    DropdownModule,
    NgIconsModule,
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

  constructor(private formBuilder: FormBuilder) {
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
}
