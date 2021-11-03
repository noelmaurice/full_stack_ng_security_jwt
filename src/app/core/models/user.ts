export class User {
  username!: string;
  password?: string;
  email?: string;
  roles?: string[];

  constructor(options: {
    username: string,
    password?: string,
    email?: string,
    roles?: string[]
    })
  {
    this.username= options.username;
    this.password = options.password || '';
    this.email = options.email || '';
    this.roles = options.roles || [];
  }
}

