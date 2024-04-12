import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    // ici on fait appel à un module nestjs pour utiliser typeORM
    imports: [],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
