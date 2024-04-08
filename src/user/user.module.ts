import { Module } from '@nestjs/common';
import { User } from '../entity/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    // ici on fait appel à un module nestjs pour utiliser typeORM
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
