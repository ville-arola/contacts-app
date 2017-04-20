import { Injectable } from '@angular/core';
import { Contact } from "../contact";

@Injectable()
export class LocalStorageService {
  private localStorageKey = 'contacts';

  constructor() {
    if (localStorage.getItem(this.localStorageKey) === null) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  public saveContacts(contacts: Contact[]): void {
    localStorage[this.localStorageKey] = JSON.stringify(contacts);
  }

  public loadContacts(): Contact[] {
    return JSON.parse(localStorage[this.localStorageKey]);
  }
}
