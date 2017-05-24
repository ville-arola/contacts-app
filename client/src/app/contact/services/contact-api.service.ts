import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from "../../../environments/environment";
import { ContactStorage } from "./contact-storage";
import {HttpService} from "./http.service";


@Injectable()
export class ContactApiService implements ContactStorage{

  url = environment.endPointUrl + '/contacts';

  constructor(private http: HttpService) {}

  getContacts() {
    return this.http
      .get(this.url)
      .map(response => response.json() as Contact[]);
  }

  addContact(contact: Contact) {
    return this.http.post(this.url, contact);
  }

  editContact(contact: Contact) {
    return this.http.put(this.url + '/' + contact.id, contact);
  }

  removeContact(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
