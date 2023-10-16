import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmotionService } from '@/services/emotion.service';

@Component({
  selector: 'app-emotions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emotions.component.html',
  styleUrls: ['./emotions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmotionsComponent implements OnInit {
  @Input() contextType = 'post';
  @Input() contextId = '';
  @Output() updateEmotion = new EventEmitter<any>();
  currentEmotion: any;

  constructor(
    private emotionService: EmotionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMyEmotion();
  }

  getMyEmotion() {
    this.emotionService
      .getMyEmotion(this.contextType, this.contextId)
      .subscribe((res) => {
        if (res.success) {
          this.currentEmotion = res.data.emotion;
          this.cdr.detectChanges();
        }
      });
  }

  handleAddEmotion(type: string) {
    this.emotionService
      .addEmotion(this.contextType, this.contextId, type)
      .subscribe((res: any) => {
        if (res.success) {
          this.currentEmotion = res.data.emotion;
          this.updateEmotion.emit();
          this.cdr.detectChanges();
        }
      });
  }

  emotions: any[] = [
    {
      src: '/assets/emotions/like.emotion.svg',
      label: 'Like',
      key: 'like',
    },
    {
      src: '/assets/emotions/heart.emotion.svg',
      label: 'Heart',
      key: 'heart',
    },
    {
      src: '/assets/emotions/wow.emotion.svg',
      label: 'Wow',
      key: 'wow',
    },
    {
      src: '/assets/emotions/haha.emotion.svg',
      label: 'Haha',
      key: 'haha',
    },
    {
      src: '/assets/emotions/sad.emotion.svg',
      label: 'Sad',
      key: 'sad',
    },
    {
      src: '/assets/emotions/angry.emotion.svg',
      label: '@#$%!',
      key: 'angry',
    },
  ];

  emotionsKeyValue = {
    like: '/assets/emotions/like.emotion.svg',
    heart: '/assets/emotions/heart.emotion.svg',
    wow: '/assets/emotions/wow.emotion.svg',
    haha: '/assets/emotions/haha.emotion.svg',
    sad: '/assets/emotions/sad.emotion.svg',
    angry: '/assets/emotions/angry.emotion.svg',
  };

  getCurrentEmotionImg() {
    switch (this.currentEmotion?.type) {
      case 'like':
        return this.emotions[0].src;
      case 'heart':
        return this.emotions[1].src;
      case 'wow':
        return this.emotions[2].src;
      case 'haha':
        return this.emotions[3].src;
      case 'sad':
        return this.emotions[4].src;
      case 'angry':
        return this.emotions[5].src;
      default:
        return '';
    }
  }

  handleToggleEmotion() {
    if (this.currentEmotion) {
      this.emotionService
        .removeEmotion(this.contextType, this.contextId)
        .subscribe((res: any) => {
          if (res.success) {
            this.currentEmotion = null;
            this.updateEmotion.emit();
            this.cdr.detectChanges();
          }
        });
    } else {
      this.handleAddEmotion('like');
    }
  }
}
