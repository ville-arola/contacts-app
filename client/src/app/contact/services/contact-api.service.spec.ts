import { inject, TestBed } from '@angular/core/testing';
import { ContactApiService } from "./contact-api.service";
import { Contact } from "../contact";
import * as _ from "lodash";
import {HttpModule, Response, ResponseOptions, XHRBackend} from "@angular/http";
import { MockBackend } from "@angular/http/testing";

describe('ContactApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ContactApiService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  function contactArray() {
    return [
      new Contact('First', 'Contact', '28787468', 'Street address', 'City', 1278686386),
      new Contact('Second', 'Contact', '28787468', 'Street address', 'City', 1297912837),
      new Contact('Third', 'Contact', '28787468', 'Street address', 'City', 287638)
    ];
  }

  it('#getContacts should return all contacts', inject([ContactApiService, XHRBackend], (service: ContactApiService, mockBackend) => {
    // what you want to send from server
    const mockResponse = contactArray();

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    // what you expect to get from api service
    service.getContacts().subscribe((contacts) => {
      expect(contacts.length).toBe(3);
      let contactsOnServer = contactArray();
      expect(_.isEmpty(_.differenceWith(contacts, contactsOnServer, _.isMatch))).toBe(true);
      expect(_.isEmpty(_.differenceWith(contactsOnServer, contacts, _.isMatch))).toBe(true);
    });
  }));

  /*
  // HOW TO TEST THE OTHER METHODS?


  it('#addContact should add contact to server', inject([ContactApiService, XHRBackend], (service: ContactApiService, mockBackend) => {
  }));

  it('#addContact should not add existing contact to server storage', inject([ContactApiService], (service: ContactApiService) => {
  }));

  it('#addContact should not alter server storage if new contact is not provided', inject([ContactApiService], (service: ContactApiService) => {
  }));

  it('#editContact should replace matching contact in server storage with edited contact', inject([ContactApiService], (service: ContactApiService) => {
  }));

  it('#editContact should not alter server storage if no matching contact exists', inject([ContactApiService], (service: ContactApiService) => {
  }));

  it('#editContact should not alter server storage if no edited contact is provided', inject([ContactApiService], (service: ContactApiService) => {
  }));

  it('#removeContact should remove existing contact from server storage', inject([ContactApiService], (service: ContactApiService) => {
  }));

  it('#removeContact should not alter server storage if provided contact id does not exist', inject([ContactApiService], (service: ContactApiService) => {
  }));

  it('#removeContact should not alter server storage if no contact id is provided', inject([ContactApiService], (service: ContactApiService) => {
  }));
*/

});
