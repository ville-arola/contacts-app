import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import { LocalStorageService } from "./local-storage.service";
import { ContactApiService } from "./contact-api.service";

@Injectable()
export class ContactService {

  constructor(private localStorageService: LocalStorageService,
              private contactApiService: ContactApiService) {
  }

  public getContacts() {
    return this.contactApiService.loadContacts();
  }

  public addContact(contact: Contact) {
    return this.contactApiService.saveContact(contact);
  }

  public updateContact(contact: Contact) {
    return this.contactApiService.updateContact(contact);
  }

  public removeContact(id: string) {
    return this.contactApiService.removeContact(id);
  }
}
