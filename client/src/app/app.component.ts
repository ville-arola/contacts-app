import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { MdSidenav } from "@angular/material";
import {HttpService} from "./contact/services/http.service";
import {UserService} from "./user/services/user.service";
import {User} from "./user/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  toolbarVisible: boolean;
  sidenavMode: string;
  user: User;

  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private router: Router, private http: HttpService, private userService: UserService) {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        //console.log(event);
        this.toolbarVisible = event.urlAfterRedirects != '/login';
        this.user = this.userService.getUser();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    let width = document.body.clientWidth; //event ? event.target.innerWidth : window.innerWidth;
    console.log(width + ' ' + (width >= 830));
    this.sidenavMode = width >= 830 ? 'side' : 'over';
  }

  ngOnInit() {
    this.onWindowResize(null);
  }

  toggleSidenav(){
    this.sidenav.toggle();
  }

  logOut() {
    this.http.destroyToken();
    this.router.navigate(['/login']);
  }
}
