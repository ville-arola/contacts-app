import { Injectable } from '@angular/core';
import {Contact} from "../contact";
import {Http, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs/Observable";
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*

@Injectable()
export class ContactApiService implements ContactStore {

  private url: string = environment.endpointUrl + '/contacts';

  constructor(private http: Http) {
  }

  loadContacts() {
    return this.http
      .get(this.url)
      .map(function (response) {
        return response.json() as Contact[];
      });
  }

}
}

*/
