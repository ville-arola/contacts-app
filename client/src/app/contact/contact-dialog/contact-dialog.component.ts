import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {

  contact: Contact;
  editMode: boolean;

  constructor(public dialog: MdDialogRef<ContactDialogComponent>) {
  }

  passContact(){
    this.dialog.close(this.contact);
  }

  closeDialog(){
    this.dialog.close();
  }

  ngOnInit() {
    this.editMode = true;
    if (!this.contact) {
      this.contact = new Contact();
      this.editMode = false;
    }
  }
}
