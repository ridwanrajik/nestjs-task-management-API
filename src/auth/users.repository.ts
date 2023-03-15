import { EntityRepository } from "typeorm";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

}