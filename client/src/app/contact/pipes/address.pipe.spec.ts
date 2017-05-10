import { AddressPipe } from './address.pipe';
import {Contact} from "../contact";

describe('AddressPipe', () => {

  let pipe = new AddressPipe();

  it('should return streetAddress and city', () => {
    let contact = new Contact('Firstname', 'Lastname', '982397', 'Streetaddress', 'City');
    expect(pipe.transform(contact)).toBe(contact.streetAddress + ', ' + contact.city);
  });

  it('should return streetAddress', () => {
    let contact = new Contact('Firstname', 'Lastname', '982397', 'Streetaddress', '');
    expect(pipe.transform(contact)).toBe(contact.streetAddress);
    contact.city = null;
    expect(pipe.transform(contact)).toBe(contact.streetAddress);
  });

  it('should return city', () => {
    let contact = new Contact('Firstname', 'Lastname', '982397', '', 'City');
    expect(pipe.transform(contact)).toBe(contact.city);
    contact.streetAddress = null;
    expect(pipe.transform(contact)).toBe(contact.city);
  });

  it('should return empty string', () => {
    let contact = new Contact('Firstname', 'Lastname', '982397', '', '');
    expect(pipe.transform(contact)).toBe('');
    expect(pipe.transform(null)).toBe('');
  });


});
