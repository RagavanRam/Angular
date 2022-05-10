import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';
import { DatabaseService } from './../shared/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription | any;
  isAuthenticated: boolean = false;
  unsubscribeUser: Subscription | any;

  collapsed = true;

  constructor(private DB: DatabaseService, private authService: AuthenticationService) { }

  ngOnInit(): void {
   this.unsubscribeUser = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onSaveData() {
    this.DB.storeRecipes().subscribe();
  }

  onFetchData() {
    this.DB.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    if(this.unsubscribeUser) {
      this.unsubscribeUser.unsubscribe();
    }
  }

}
