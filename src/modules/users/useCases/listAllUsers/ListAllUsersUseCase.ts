import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const existsUser = this.usersRepository.findById(user_id);
    if (!existsUser.admin) {
      throw new Error(`User not Admin`);
    }

    const allUser = this.usersRepository.list();
    return allUser;
  }
}

export { ListAllUsersUseCase };
