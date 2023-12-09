import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '@/services/chat.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgIconsModule } from '@ng-icons/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { NgxPopperjsModule } from 'ngx-popperjs';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule,
    OverlayPanelModule,
    PickerModule,
    TooltipModule,
    ButtonModule,
    NgxPopperjsModule,
  ],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit, OnChanges {
  constructor(private store: Store, private chatService: ChatService) {}
  contentForm = new FormControl('');
  edit: boolean = false;
  @Input() user1Id: string = '';
  @Input() user2Id: string = '';
  @Input() type: 'create' | 'edit' = 'create';
  @Input() content?: string;
  @Output() onSuccess = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() messageId: string = '';

  handleEmojiClick(event: any) {
    const emoji = event.emoji.native;
    const currentContent = this.contentForm.value;
    const updatedContent = currentContent + emoji;
    this.contentForm?.setValue(updatedContent);
  }

  ngOnInit(): void {
    // if (this.type === 'edit') {
    //   this.contentForm.setValue(this.content || '');
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue === 'edit') {
      this.contentForm.setValue(this.content || '');
    }
  }

  handleCancel() {
    this.contentForm.setValue('');
    this.messageId = '';
    this.onCancel.emit();
  }

  handleSubmit() {
    if (this.type === 'create') {
      this.chatService
        .sendMessage(
          this.user1Id,
          this.user2Id,
          this.contentForm.value?.trim() || ''
        )
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.contentForm.setValue('');
              this.onSuccess.emit();
            }
          },
        });
    } else if (this.type === 'edit') {
      this.chatService
        .editMessage(this.messageId, this.contentForm.value?.trim() || '')
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.contentForm.setValue('');
              this.onSuccess.emit();
              this.onCancel.emit();
            }
          },
        });
    }
  }
}
