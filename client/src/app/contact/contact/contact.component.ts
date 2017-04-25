import { Component, OnInit } from '@angular/core';
import { ContactService } from "../services/contact.service";
import { Contact } from "../contact";
import { DialogService } from "../services/dialog.service";
import * as _ from "lodash";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService, private dialog: DialogService) {}

  loadContacts() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  addContact(): void {
    let input = this.dialog.contactDialog();
    input.subscribe(result => {
      if (result) {
        this.contactService.addContact(result).subscribe(response => {
          this.loadContacts();
        });
      }
    });
  }

  editContact(contact: Contact): void {
    let input = this.dialog.contactDialog(contact);
    input.subscribe(result => {
      if (result) {
        this.contactService.updateContact(result).subscribe(response => {
          this.loadContacts();
        });
      }
    });
  }

  removeContact(contact: Contact): void {
    this.contactService.removeContact(contact.id).subscribe(response => {
      this.loadContacts();
    });
  }

  showContactOnMap(contact: Contact): void {
    let addressString = contact.streetAddress + ', ' + contact.city;
    this.dialog.mapDialog(addressString);
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  notEmpty(): boolean {
    return !_.isEmpty(this.contacts);
  }
}
