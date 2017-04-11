import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../contact";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  @Input() contacts: Contact[];
  @Output() editContact: EventEmitter<Contact>;
  @Output() removeContact: EventEmitter<Contact>;
  @Output() showContactOnMap: EventEmitter<Contact>;

  constructor() {
    this.editContact = new EventEmitter();
    this.removeContact = new EventEmitter();
    this.showContactOnMap = new EventEmitter();
  }

  ngOnInit() {
  }
}
