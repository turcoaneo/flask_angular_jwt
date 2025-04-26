export class UserDTO {
  email!: string;
  alias!: string;

  constructor(email: string, alias: string) {
    this.email = email;
    this.alias = alias;
  }

  static createUserDTO(user: User) {
    return new UserDTO(user.email, user.alias);
  }
}

export type User = {
  email: string;
  alias: string;
}
