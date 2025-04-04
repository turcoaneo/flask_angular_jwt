export class UserDTO {
  email!: string;
  alias!: string;

  constructor(email: string, alias: string) {
    this.email = email;
    this.alias = alias;
  }
}

export type User = {
  email: string;
  alias: string;
}
