import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, DividerModule, EditorModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  createPostForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.createPostForm = this.formBuilder.group({
      content: '',
    });
  }
}
