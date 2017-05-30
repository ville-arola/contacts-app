import {environment} from "../../environments/environment";
export class Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  city: string;

  constructor(firstName?: string, lastName?: string, phone?: string, streetAddress?: string, city?: string, id?: number) {
    if (!environment.endPointUrl) {
      this.id = Date.now();
    }
    else {
      this.id = id ? id : 0;
    }
    this.firstName = firstName ? firstName : '';
    this.lastName = lastName ? lastName : '';
    this.phone = phone ? phone : '';
    this.streetAddress = streetAddress ? streetAddress : '';
    this.city = city ? city : '';
  }
}
