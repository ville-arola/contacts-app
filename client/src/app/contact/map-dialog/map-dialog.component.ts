import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
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
  width: number;
  height: number;

  constructor(public dialog: MdDialogRef<MapDialogComponent>, private sanitizer: DomSanitizer, private elementRef: ElementRef ) { }

  closeMap() {
    this.dialog.close();
  }

  getMapSrc(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.mapUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDmUcAU7BWA5VkyY5KvP84kM8fc_bdXMoM&q=' + this.address;
    this.onWindowResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    let w = document.body.clientWidth;
    let h = window.innerHeight;
    this.width = Math.min(w*0.6, 600);
    this.height = Math.min(h*0.75, 480);
  }
}
