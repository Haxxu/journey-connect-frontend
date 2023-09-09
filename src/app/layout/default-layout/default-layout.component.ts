import { DefaultHeaderComponent } from '@/shared/components/default-header/default-header.component';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [RouterModule, DefaultHeaderComponent],
})
export class DefaultLayoutComponent {}
