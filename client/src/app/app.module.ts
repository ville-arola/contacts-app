import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgPipesModule } from 'ngx-pipes';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactService } from "./contact/services/contact.service";
import { ContactApiService } from "./contact/services/contact-api.service";
import { ContactListItemComponent } from './contact/contact-list-item/contact-list-item.component';
import { ContactDialogComponent } from './contact/contact-dialog/contact-dialog.component';
import { MapDialogComponent } from './contact/map-dialog/map-dialog.component';
import { DialogService } from "./contact/services/dialog.service";
import { LocalStorageService } from "./contact/services/local-storage.service";
import { AddressPipe } from './contact/pipes/address.pipe';
import { ContactComponent } from './contact/contact/contact.component';
import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { HapticClickDirective } from './directives/haptic-click.directive';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactDialogComponent,
    MapDialogComponent,
    AddressPipe,
    ContactComponent,
    LoginComponent,
    HapticClickDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgPipesModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [ContactDialogComponent, MapDialogComponent],
  providers: [ContactService, DialogService, LocalStorageService, ContactApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

