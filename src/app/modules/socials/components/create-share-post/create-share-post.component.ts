import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-share-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-share-post.component.html',
  styleUrls: ['./create-share-post.component.scss'],
})
export class CreateSharePostComponent {
  @Input() post: any;
}
