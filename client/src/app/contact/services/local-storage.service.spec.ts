import { inject, TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import {Contact} from "../contact";
import * as _ from "lodash";

describe('LocalStorageService', () => {

  let localStorageKey = 'contacts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  //Local Storage Mock
  beforeEach(() => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake(function(key) {
      return store[key];
    });

    spyOn(localStorage, 'setItem').and.callFake(function(key, value) {
      store[key] = value;
    });
  });

  function contactArray() {
    return [
      new Contact('First', 'Contact', '28787468', 'Street address', 'City', '1278686386'),
      new Contact('Second', 'Contact', '28787468', 'Street address', 'City', '1297912837'),
      new Contact('Third', 'Contact', '28787468', 'Street address', 'City', '287638')
    ];
  }

  it('Should initialize local storage', inject([LocalStorageService], (service: LocalStorageService) => {
    let data = localStorage.getItem(localStorageKey);
    expect(JSON.parse(data)).toEqual([]);
  }));

  it('#getContacts should return all contacts', inject([LocalStorageService], (service: LocalStorageService) => {
    let contacts = contactArray();
    let contactIds = _.map(contacts, 'id');
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
    service.getContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(3);
      _.forEach(contacts, function(c) {
        expect(contactIds).toContain(c.id);
      });
    });
  }));

  it('#addContact should add contact to localStorage', inject([LocalStorageService], (service: LocalStorageService) => {
    let contacts = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
    let newContact = new Contact('Newname', 'Lastname', '9827928759', 'New St', 'New City');
    let contactIds = _.map(contacts, 'id');

    // expect newContact has unique id
    expect(contactIds).not.toContain(newContact.id);

    // contact is added to list
    service.addContact(newContact).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(contactsAfter.length).toBe(contacts.length + 1);
      expect(_.isMatch(contactsAfter[contactsAfter.length-1], newContact)).toBe(true);
    });
  }));

  it('#addContact should not add existing contact to localStorage', inject([LocalStorageService], (service: LocalStorageService) => {
    let contactsBefore = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));
    let existingContact = contactsBefore[0];
    let contactIds = _.map(contactsBefore, 'id');

    // expect existingContact is in contacts
    expect(contactIds).toContain(existingContact.id);

    // contact is not added to list
    service.addContact(existingContact).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(_.isEmpty(_.differenceWith(contactsBefore, contactsAfter, _.isMatch))).toBe(true);
      expect(_.isEmpty(_.differenceWith(contactsAfter, contactsBefore, _.isMatch))).toBe(true);
    });
  }));

  it('#addContact should not alter localStorage if new contact is not provided', inject([LocalStorageService], (service: LocalStorageService) => {
    let contactsBefore = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));
    let contactIds = _.map(contactsBefore, 'id');

    // contact is not added to list
    service.addContact(null).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(_.isEmpty(_.differenceWith(contactsBefore, contactsAfter, _.isMatch))).toBe(true);
      expect(_.isEmpty(_.differenceWith(contactsAfter, contactsBefore, _.isMatch))).toBe(true);
    });
  }));

  it('#editContact should replace matching contact in localStorage with edited contact', inject([LocalStorageService], (service: LocalStorageService) => {
    let contactsBefore = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));
    let editedContact = contactsBefore[1];
    editedContact.firstName = 'New firstname';
    editedContact.lastName = 'New Lastname';
    editedContact.phone = '1234567890';
    editedContact.streetAddress = 'New Street Address';
    editedContact.city = 'New city';
    let contactIds = _.map(contactsBefore, 'id');

    // matching contact exists
    expect(contactIds).toContain(editedContact.id);

    // contact is replaced from localStorage
    service.editContact(editedContact).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(contactsAfter.length).toBe(contactsBefore.length);
      let index = _.findIndex(contactsAfter, ['id', editedContact.id]);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(_.isMatch(contactsAfter[index], editedContact)).toBe(true);
    });
  }));

  it('#editContact should not alter localStorage if no matching contact exists', inject([LocalStorageService], (service: LocalStorageService) => {
    let contactsBefore = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));
    let editedContact = new Contact('Newname', 'Lastname', '9827928759', 'New St', 'New City');
    let contactIds = _.map(contactsBefore, 'id');

    // matching contact exists
    expect(contactIds).not.toContain(editedContact.id);

    // localStorage is not altered
    service.editContact(editedContact).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(contactsAfter.length).toBe(contactsBefore.length);
      let index = _.findIndex(contactsAfter, ['id', editedContact.id]);
      expect(index).toBeLessThan(0);
      expect(_.isEmpty(_.differenceWith(contactsBefore, contactsAfter, _.isMatch))).toBe(true);
      expect(_.isEmpty(_.differenceWith(contactsAfter, contactsBefore, _.isMatch))).toBe(true);
    });
  }));

  it('#editContact should not alter localStorage if no edited contact is provided', inject([LocalStorageService], (service: LocalStorageService) => {
    let contactsBefore = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));

    // localStorage is not altered
    service.editContact(null).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(_.isEmpty(_.differenceWith(contactsBefore, contactsAfter, _.isMatch))).toBe(true);
      expect(_.isEmpty(_.differenceWith(contactsAfter, contactsBefore, _.isMatch))).toBe(true);
    });
  }));

  it('#removeContact should remove existing contact from localStorage', inject([LocalStorageService], (service: LocalStorageService) => {
    let contactsBefore = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));
    let deletedContact = contactsBefore[1];
    let contactIds = _.map(contactsBefore, 'id');

    // deleted contact exists
    expect(contactIds).toContain(deletedContact.id);

    // contact is removed from localStorage
    service.removeContact(deletedContact.id).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(_.isMatch(_.differenceWith(contactsBefore, contactsAfter, _.isMatch)[0], deletedContact)).toBe(true);
    });
  }));

  it('#removeContact should not alter localStorage if provided contact id does not exist', inject([LocalStorageService], (service: LocalStorageService) => {
     let contactsBefore = contactArray();
     localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));
     let deletedContact = new Contact('Newname', 'Lastname', '9827928759', 'New St', 'New City');
     let contactIds = _.map(contactsBefore, 'id');

     // deleted contact doesn't exist
     expect(contactIds).not.toContain(deletedContact.id);

     // no contacts are removed from localStorage
     service.removeContact(deletedContact.id).subscribe(() => {
       let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
       expect(_.isEmpty(_.differenceWith(contactsBefore, contactsAfter, _.isMatch))).toBe(true);
       expect(_.isEmpty(_.differenceWith(contactsAfter, contactsBefore, _.isMatch))).toBe(true);
     });
  }));

  it('#removeContact should not alter localStorage if no contact id is provided', inject([LocalStorageService], (service: LocalStorageService) => {
    let contactsBefore = contactArray();
    localStorage.setItem(localStorageKey, JSON.stringify(contactsBefore));

    // no contacts are removed from localStorage
    service.removeContact(null).subscribe(() => {
      let contactsAfter = JSON.parse(localStorage.getItem(localStorageKey));
      expect(_.isEmpty(_.differenceWith(contactsBefore, contactsAfter, _.isMatch))).toBe(true);
      expect(_.isEmpty(_.differenceWith(contactsAfter, contactsBefore, _.isMatch))).toBe(true);
    });
  }));

});
