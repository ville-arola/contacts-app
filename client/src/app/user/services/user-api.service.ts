import { Injectable } from '@angular/core';
import {HttpService} from "../../utils/http.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserApiService {

  private url: string = environment.endPointUrl + '/user';

  constructor(private http: HttpService) { }

  login() {
    return this.http.put(this.url, {});
  }
}
