import { Injectable }     from '@angular/core';
import {HttpService} from "app/contact/services/http.service";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {UserApiService} from "./user-api.service";

@Injectable()
export class UserService {

  constructor (private http: HttpService, private authenticationService: AuthenticationService,
               private userApiService: UserApiService, private userApi: UserApiService) {}

  login(userName: string, password: string) {
    if (environment.endPointUrl) {
      return this.authenticationService.authenticate(userName, password).flatMap(() => {
        return this.userApiService.login();
      })
    }
    else {
      return Observable.of(null);
    }
  }

}
