import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../user";
import {UserService} from "../services/user.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  loginUser() {
    this.userService.login(this.user.userName, this.user.password).subscribe(response => {
      //console.log(response.json());
      let user = new User('', 'Local', 'User', 'local.user@example.com');
      if (environment.endPointUrl) {
        user = new User(response.json().userName, response.json().firstName, response.json().lastName, response.json().email);
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
