import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import { ContactStorage } from "./contact-storage";
import { Observable } from "rxjs";
import * as _ from "lodash";

@Injectable()
export class LocalStorageService implements ContactStorage{
  private localStorageKey = 'contacts';

  constructor() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  public getContacts(): Observable<Contact[]>  {
    let contacts = this.loadContacts();
    return Observable.of(contacts);
  }

  public addContact(contact: Contact): Observable<any>  {
    if (contact) {
      let contacts = this.loadContacts();
      if (_.findIndex(contacts, ['id', contact.id]) < 0) {
        contacts.push(contact);
        this.saveContacts(contacts);
      }
    }
    return Observable.of(null);
  }

  public editContact(contact: Contact): Observable<any> {
    if (contact) {
      let contacts = this.loadContacts();
      let index = _.findIndex(contacts, ['id', contact.id]);
      if (index >= 0) {
        contacts.splice(index, 1, contact);
        this.saveContacts(contacts);
      }
    }
    return Observable.of(null);
  }

  public removeContact(id: string): Observable<any> {
    if (id) {
      let contacts = this.loadContacts();
      let index = _.findIndex(contacts, ['id', id]);
      if (index >= 0) {
        contacts.splice(index, 1);
        this.saveContacts(contacts);
      }
    }
    return Observable.of(null);
  }

  private loadContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  private saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
  }
}
