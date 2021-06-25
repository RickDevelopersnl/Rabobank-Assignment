import { NgModule } from '@angular/core';
import { UploadIssuesComponent } from './upload-issues.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UploadIssuesComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: UploadIssuesComponent }])],
})
export class UploadIssuesModule {}
