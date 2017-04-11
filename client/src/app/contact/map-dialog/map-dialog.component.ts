import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {

  address: string;
  mapUrl: string;

  constructor(public dialog: MdDialogRef<MapDialogComponent>, private sanitizer: DomSanitizer) { }

  closeMap() {
    this.dialog.close();
  }

  getMapSrc(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.mapUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDmUcAU7BWA5VkyY5KvP84kM8fc_bdXMoM&q=' + this.address;
  }
}
