import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from '../entity/Task';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
    // ici on fait appel à un module nestjs pour utiliser typeORM
    imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => UserModule)],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule { }
