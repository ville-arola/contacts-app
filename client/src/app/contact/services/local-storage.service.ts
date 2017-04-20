import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import { ContactStorage } from "./contact-storage";
import { Observable } from "rxjs";
import * as _ from "lodash";

@Injectable()
export class LocalStorageService implements ContactStorage{
  private localStorageKey = 'contacts';

  constructor() {
    if (localStorage.getItem(this.localStorageKey) === null) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  public getContacts(): Observable<Contact[]>  {
    let contacts = this.loadContacts();
    return Observable.of(contacts);
  }

  public addContact(contact: Contact): Observable<any>  {
    let contacts = this.loadContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
    return Observable.of(null);
  }

  public editContact(contact: Contact): Observable<any> {
    let contacts = this.loadContacts();
    let index = _.findIndex(contacts, ['id', contact.id]);
    if (index >= 0) {
      contacts.splice(index, 1, contact);
      this.saveContacts(contacts);
    }
    return Observable.of(null);
  }

  public removeContact(id: string): Observable<any> {
    let contacts = this.loadContacts();
    let index = _.findIndex(contacts, ['id', id]);
    if (index >= 0) {
      contacts.splice(index, 1);
      this.saveContacts(contacts);
    }
    return Observable.of(null);
  }

  private loadContacts(): Contact[] {
    return JSON.parse(localStorage[this.localStorageKey]);
  }

  private saveContacts(contacts: Contact[]): void {
    localStorage[this.localStorageKey] = JSON.stringify(contacts);
  }
}
