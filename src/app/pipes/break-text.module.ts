import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakTextPipe } from './break-text.pipe';

@NgModule({
  declarations: [BreakTextPipe],
  imports: [
    CommonModule
  ],
  exports: [BreakTextPipe]
})
export class BreakTextModule { }
