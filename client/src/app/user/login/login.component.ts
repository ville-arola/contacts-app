import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../user";
import {UserService} from "../services/user.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User;
  legend: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  loginUser() {
    this.userService.login(this.user.userName, this.user.password).catch(data => {
      this.legend = 'Invalid login information';
      return Observable.of(data);
    }).subscribe(response => {
      let user = new User(this.user.userName, 'Local', 'User', 'local.user@example.com');
      if (environment.endPointUrl) {
        let res = response.json();
        user = new User(res.userName, res.firstName, res.lastName, res.email);
      }
      this.userService.setUser(user);
      this.router.navigate(['/contact']);
    });
  }

  handleEnter(event) {
    if (event.keyCode == 13) {
      if (this.user.userName && this.user.password) {
        this.loginUser();
      }
      else if (!this.user.userName) {
        document.getElementById('userName').focus();
      }
      else if (!this.user.password) {
        document.getElementById('password').focus();
      }
    }
  }
}
