import { Injectable }     from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {UserApiService} from "./user-api.service";

@Injectable()
export class UserService {

  constructor (private authenticationService: AuthenticationService, private userApiService: UserApiService) {}

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
