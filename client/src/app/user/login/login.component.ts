import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() userName: string;
  @Input() password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkInputs() {
    if (!_.isEmpty(this.userName) && !_.isEmpty(this.password)) {
      console.log('OK go...');
    }
  }

  loginUser() {
    this.router.navigate(['/contact']);
  }
}
