import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import { Http } from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from "../../../environments/environment";
import { ContactStorage } from "./contact-storage";


@Injectable()
export class ContactApiService implements ContactStorage{

  url = environment.endPointUrl + '/contacts';

  constructor(private http: Http) {}

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

  removeContact(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}

