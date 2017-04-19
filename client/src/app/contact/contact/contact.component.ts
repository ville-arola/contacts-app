import { Component, OnInit } from '@angular/core';
import {ContactService} from "../services/contact.service";
import {Contact} from "../contact";
import {DialogService} from "../services/dialog.service";



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService, private dialog: DialogService) {}

  addContact(): void {
    let input = this.dialog.contactDialog();
    input.subscribe(result => {
      if (result) {
        this.contactService.addContact(result);
        this.loadContacts();
      }
    });
  }

  editContact(contact: Contact): void {
    let input = this.dialog.contactDialog(contact);
    input.subscribe(result => {
      if (result) {
        this.contactService.updateContact(result);
        this.loadContacts();
      }
    });
  }

  removeContact(contact: Contact): void {
    this.contactService.removeContact(contact.id);
    this.loadContacts();
  }

  showContactOnMap(contact: Contact): void {
    let addressString = contact.streetAddress + ', ' + contact.city;
    this.dialog.mapDialog(addressString);
  }

  loadContacts() {
    this.contactService.getContacts().then(contacts => this.contacts = contacts);
  }

  ngOnInit(): void {
    this.loadContacts();
  }
}
