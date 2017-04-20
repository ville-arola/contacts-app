import { Contact } from "../contact";
import { Observable } from "rxjs";

export interface ContactStorage {
  getContacts(): Observable<Contact[]>
  addContact(contact: Contact): Observable<any>;
  editContact(contact: Contact): Observable<any>;
  removeContact(id: string): Observable<any>;
}
