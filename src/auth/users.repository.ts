import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";


// export class TaskRepository extends Repository<Task> {
//     constructor(private dataSource: DataSource){
//         super(Task, dataSource.createEntityManager());
//     }
@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.create({ username, password });
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}