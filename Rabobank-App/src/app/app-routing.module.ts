import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/upload-issues', pathMatch: 'full' },
  {
    path: 'upload-issues',
    loadChildren: () => import('./upload-issues/upload-issues.module').then((m) => m.UploadIssuesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
