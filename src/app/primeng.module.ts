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
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';

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
    SkeletonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RippleModule,
    TableModule,
    ChipModule,
    TagModule,
  ],
})
export class PrimeNGModule {}
