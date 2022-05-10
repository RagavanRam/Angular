import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SharedModule } from './../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationInterceptorService } from './authentication-interceptor.service';



@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    SharedModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '', component: AuthenticationComponent}
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true}
  ]
})
export class AuthenticationModule { }
