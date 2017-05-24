import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../user";
import {UserService} from "../services/user.service";

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
      console.log(response);
      this.router.navigate(['/contact']);
    });
  }
}
