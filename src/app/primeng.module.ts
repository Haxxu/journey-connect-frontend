import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    DividerModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    FileUploadModule,
    DialogModule,
    AutoCompleteModule,
  ],
})
export class PrimeNGModule {}
