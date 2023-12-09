import { getMediaUrlById } from '@/utils/media';
import { ChatService } from '@/services/chat.service';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChatSelectors } from '@/core/store/chat/chat.selector';
import ChatActions from '@/core/store/chat/chat.action';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { SocketService } from '@/services/socket.service';
import { socket_constants } from '@/config/socket_constant';
import { NgxPopperjsModule, NgxPopperjsPlacements } from 'ngx-popperjs';
import { NgIconsModule } from '@ng-icons/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import {
  formatDate_HH_mm_DD_MMM_YYYY,
  formatTime_HH_mm,
  isSameDay,
} from '@/utils/format';
import { FriendService } from '@/services/friend.service';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [
    CommonModule,
    ChatInputComponent,
    NgxPopperjsModule,
    NgIconsModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  providers: [ConfirmationService],
})
export class ChatBoxComponent implements OnInit, OnDestroy, AfterViewChecked {
  private destroy$ = new Subject<void>();
  targetUserId: string = '';
  meInfo: any;
  targetUser: any;
  meInfo$ = this.store.select(selectMeInfo);
  isChatBoxVisible$ = this.store.select(ChatSelectors.selectIsChatBoxVisible);
  targetUser$ = this.store.select(ChatSelectors.selectTargetUser);
  messages$ = this.store.select(ChatSelectors.selectMessages);
  isScrollToBottom$ = this.store.select(ChatSelectors.selectIsScrollToBottom);
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  NgxPopperjsPlacements = NgxPopperjsPlacements;
  firstScroll: boolean = true;
  chatId: string = '';
  messageId: string = '';
  messageOwnerId: string = '';
  messageContent: string = '';
  messageModeType: 'create' | 'edit' = 'create';
  formatTime_HH_mm = formatTime_HH_mm;
  getMediaUrlById = getMediaUrlById;
  isSameDay = isSameDay;
  formatDate_HH_mm_DD_MMM_YYYY = formatDate_HH_mm_DD_MMM_YYYY;
  isFriend: boolean = true;

  constructor(
    private store: Store,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService,
    private confirmationService: ConfirmationService,
    private friendService: FriendService
  ) {
    this.meInfo$.subscribe({
      next: (value) => {
        this.meInfo = value;
        this.store.dispatch(ChatActions.setMe({ me: this.meInfo }));
      },
    });
  }

  ngOnInit(): void {
    this.store
      .select(ChatSelectors.selectTargetUserId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userId) => {
          if (userId && this.meInfo?._id && userId !== this.targetUserId) {
            this.targetUserId = userId;

            this.loadMessages();

            this.friendService.checkIsFriend(this.targetUserId).subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.isFriend = res.data;
                }
              },
            });
          }
        },
      });

    this.targetUser$.subscribe({
      next: (value: any) => {
        this.targetUser = value;
      },
    });

    this.isScrollToBottom$.subscribe({
      next: (isScroll: boolean) => {
        if (isScroll) {
          // this.scrollToBottom();
          this.firstScroll = true;
          this.store.dispatch(
            ChatActions.setIsScrollToBottom({ isScrollToBottom: false })
          );
        }
      },
    });

    // Add message
    this.socketService
      .listen(socket_constants.CREATE_MESSAGE)
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: any) => {
        this.store.dispatch(
          ChatActions.addMessage({
            message: {
              message: message,
              added_at: '',
            },
          })
        );
      });

    // Edit message
    this.socketService
      .listen(socket_constants.UPDATE_MESSAGE)
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: any) => {
        this.store.dispatch(
          ChatActions.editMessage({
            message,
          })
        );
      });

    // Delete message
    this.socketService
      .listen(socket_constants.DELETE_MESSAGE)
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: any) => {
        this.store.dispatch(
          ChatActions.deleteMessage({
            message,
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.socketService.outRoom(this.chatId);
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewChecked() {
    if (this.firstScroll && this.messageContainer) {
      this.scrollToBottom();
      this.firstScroll = false;
    }
  }

  loadMessages() {
    this.chatService.getMessages(this.meInfo._id, this.targetUserId).subscribe({
      next: (res: any) => {
        this.socketService.outRoom(this.chatId);
        let user = res.data?.users.find(
          (item: any) => item?._id === this.targetUserId
        );
        this.store.dispatch(
          ChatActions.setAllChatInfo({
            chatId: res.data?._id,
            messages: res.data?.messages,
            targetUser: user,
          })
        );
        this.chatId = res.data?._id;

        this.socketService.joinRoom(res.data?._id);
      },
    });
  }

  scrollToBottom(): void {
    try {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop =
          this.messageContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error(err);
    }
  }

  hanldeOpenMessageMenu(message: any) {
    this.messageId = message?._id;
    this.messageOwnerId = message?.owner;
    this.messageContent = message?.content;
  }

  handleEditMessage() {
    this.messageModeType = 'edit';
  }

  handleDeleteMessage() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this message?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.chatService.deleteMessage(this.messageId).subscribe({
          next: (res: any) => {
            if (res.success) {
            }
          },
        });
      },
    });
  }

  handleCloseChatBox() {
    this.targetUserId = '';
    this.messageId = '';
    this.messageOwnerId = '';
    this.messageContent = '';
    this.isFriend = true;
    this.store.dispatch(ChatActions.setTargetUserId({ userId: '' }));
    this.store.dispatch(ChatActions.setChatBoxVisibility({ isVisible: false }));
    this.store.dispatch(
      ChatActions.setAllChatInfo({
        chatId: '',
        messages: [],
        targetUser: null,
      })
    );
  }
}
