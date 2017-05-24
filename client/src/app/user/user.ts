export class User {
  id: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(userName?: string, firstName?: string, lastName?: string, email?: string, id?: number,  password?: string) {
    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }
}
