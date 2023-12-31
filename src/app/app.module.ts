import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { IconsModule } from './icons.module';
import { NgxGridModule } from '@egjs/ngx-grid';
import { PrimeNGModule } from './primeng.module';
import { AuthInterceptor } from '@/core/interceptors/auth.interceptor';
import { AppStoreModule } from './store.module';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { AppLayoutModule } from './layout/dashboard/app.layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    IconsModule,
    NgxGridModule,
    PrimeNGModule,
    AppStoreModule,
    NgxPopperjsModule,
    AppLayoutModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
