export class Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  city: string;

  constructor(firstName?: string, lastName?: string, phone?: string, streetAddress?: string, city?: string, id?: number) {
    this.id = id ? id : 0;
    this.firstName = firstName ? firstName : '';
    this.lastName = lastName ? lastName : '';
    this.phone = phone ? phone : '';
    this.streetAddress = streetAddress ? streetAddress : '';
    this.city = city ? city : '';
  }
}
