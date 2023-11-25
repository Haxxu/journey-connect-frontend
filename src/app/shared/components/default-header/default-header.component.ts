import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class DefaultHeaderComponent {}
