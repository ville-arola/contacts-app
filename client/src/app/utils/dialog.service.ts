import { Injectable } from '@angular/core';
import { MdDialog } from "@angular/material";
import { Contact } from "../contact/contact";
import { ContactDialogComponent } from "../contact/contact-dialog/contact-dialog.component";
import { MapDialogComponent } from "../contact/map-dialog/map-dialog.component";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public contactDialog(contact?: Contact){
    let dialogRef = this.dialog.open(ContactDialogComponent);
    dialogRef.componentInstance.contact = contact;
    return dialogRef.afterClosed();
  }

  public mapDialog(address: string){
    let dialogRef = this.dialog.open(MapDialogComponent);
    dialogRef.componentInstance.address = address;
    return dialogRef.afterClosed();
  }

  public errorDialog(message: string) {
    let dialogRef = this.dialog.open(ErrorDialogComponent);
    dialogRef.componentInstance.init(message);
    return dialogRef.afterClosed();
  }
}
