import {Component} from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {

  message: string;

  constructor(public dialog: MdDialogRef<ErrorDialogComponent>) {
  }

  init(message: string) {
    let dialog = this.dialog;
    this.message = message;
    setTimeout(function() {dialog.close()}, 1000 + 100 * message.length);
  }
}
