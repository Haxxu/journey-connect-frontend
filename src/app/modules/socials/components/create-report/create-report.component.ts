import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
})
export class CreateReportComponent {
  @Input() context_id: string = '';
  @Input() context_type: string = 'post';
}
