import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | null {
    return null ?? this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | null {
    return null ?? this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const existeUser = this.findById(receivedUser.id);
    const user = Object.assign(existeUser, {
      ...existeUser,
      updated_at: new Date(),
      admin: true,
    });

    this.users.push(user);

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
