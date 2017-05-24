import { Injectable } from '@angular/core';
import {HttpService} from "../../contact/services/http.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthenticationService {

  url = environment.endPointUrl + '/authentication';

  constructor(private http: HttpService) {}

  authenticate(userName:string, password:string) {
    return this.http.post(this.url, {
      userName: userName,
      password: password
    }).map((response) => {
      let data = response.json();
      this.http.setToken(data.token);
    });
  }
}
