import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { RecommendService } from '@/services/recommend.service';

@Component({
  selector: 'app-recommend-posts',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './recommend-posts.component.html',
  styleUrls: ['./recommend-posts.component.scss'],
})
export class RecommendPostsComponent {
  loading: boolean = false;
  loading1: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private recommendService: RecommendService
  ) {}

  generateNewCsvTrainFile() {
    this.loading = true;
    this.recommendService.generateNewCsvFile().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Generate new csv file successfully',
          });
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  trainNewModel() {
    this.loading1 = true;
    this.recommendService.trainNewModel().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Train new model successfully',
          });
        }
        this.loading1 = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading1 = false;
      },
    });
  }
}
