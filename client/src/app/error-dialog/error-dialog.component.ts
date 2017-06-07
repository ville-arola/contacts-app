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
    setTimeout(function() {dialog.close()}, 5000);
  }
}
