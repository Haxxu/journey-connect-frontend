import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { UserService } from '@/services/user.service';
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    CommonModule,
    NgIconsModule,
    OverlayPanelModule,
    AutoCompleteModule,
    AvatarModule,
  ],
})
export class HeaderComponent implements OnInit {
  suggestions: any[] = [{}];
  meInfo$ = this.store.select(selectMeInfo);

  constructor(private userService: UserService, private store: Store) {}

  ngOnInit(): void {}

  search(event: any) {
    console.log(event);
  }
}
