import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User {
    const userExists = this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new Error(`User does not exist`);
    }

    const updateUser = this.usersRepository.turnAdmin(userExists);

    return updateUser;
  }
}

export { TurnUserAdminUseCase };
