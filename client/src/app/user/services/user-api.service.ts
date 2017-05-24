import { Injectable } from '@angular/core';
import {HttpService} from "../../contact/services/http.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserApiService {

  private url: string = environment.endPointUrl + '/user';

  constructor(private http: HttpService) { }

  login() {
    return this.http.put(this.url, {});
  }
}
