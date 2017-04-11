import { Injectable } from '@angular/core';
import { Contact } from "../contact";
import * as _ from "lodash";
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class ContactService {

  constructor(private localStorageService: LocalStorageService) {
  }

  public getContacts(): Promise<Contact[]> {
    let contacts = this.localStorageService.loadContacts();
    /*
    contacts.push(new Contact('Ville', 'Arola', '81726812874', 'Katu', 'Kaupunki'));
    contacts.push(new Contact('Matti', 'Meikäläinen', '81728742894', 'Katu 2', 'Kaupunki'));
    contacts.push(new Contact('Erkki', 'Esimerkki', '1764866758', 'Katu 3', 'Kaupunki'));
    */
    return Promise.resolve(contacts);
  }

  public addContact(contact: Contact): void {
    let contacts = this.localStorageService.loadContacts();
    contacts.push(contact);
    this.localStorageService.saveContacts(contacts);
  }

  public updateContact(contact: Contact): void {
    let contacts = this.localStorageService.loadContacts();
    let index = _.findIndex(contacts, ['id', contact.id]);
    if (index >= 0) {
      contacts.splice(index, 1, contact);
      this.localStorageService.saveContacts(contacts);
    }
  }

  public removeContact(id: string): void {
    let contacts = this.localStorageService.loadContacts();
    let index = _.findIndex(contacts, ['id', id]);
    if (index >= 0) {
      contacts.splice(index, 1);
      this.localStorageService.saveContacts(contacts);
    }
  }
}
