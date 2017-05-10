import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { MdSidenav } from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  toolbarVisible: boolean;
  sidenavMode: string;

  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        //console.log(event);
        this.toolbarVisible = event.urlAfterRedirects != '/login';
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
}
