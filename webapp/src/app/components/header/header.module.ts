import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { LoginFormModule } from '../login-form/login-form.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    LoginFormModule,
    RouterModule
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
