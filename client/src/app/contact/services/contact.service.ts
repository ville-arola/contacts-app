import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import { LocalStorageService } from "./local-storage.service";
import { ContactApiService } from "./contact-api.service";
import { ContactStorage } from "./contact-storage";
import { environment } from "../../../environments/environment";

@Injectable()
export class ContactService {

  contactStorage: ContactStorage;

  constructor(private localStorageService: LocalStorageService,
              private contactApiService: ContactApiService) {
    this.contactStorage = environment.endPointUrl ? contactApiService : localStorageService;
  }

  public getContacts() {
    return this.contactStorage.getContacts();
  }

  public addContact(contact: Contact) {
    return this.contactStorage.addContact(contact);
  }

  public updateContact(contact: Contact) {
    return this.contactStorage.editContact(contact);
  }

  public removeContact(id: string) {
    return this.contactStorage.removeContact(id);
  }
}
