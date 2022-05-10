import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CutoutPipe } from './cutout.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    CommonModule
  ]
})
export class SharedModule { }
