import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import { Http } from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactApiService {

  url = 'http://localhost:50854/api/contacts';

  constructor(private http: Http) {}

  loadContacts() {
    return this.http
      .get(this.url)
      .map(response => response.json() as Contact[]);
  }

  saveContact(contact: Contact) {
    return this.http.post(this.url, contact);
  }

  updateContact(contact: Contact) {
    return this.http.put(this.url + '/' + contact.id, contact);
  }

  removeContact(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}

