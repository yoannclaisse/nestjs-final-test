import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../prisma/models/User';

@Controller('')
export class UserController {

    constructor(private userService: UserService) { }

    // sur la route "/user/email" on récupère le user avec son email passé en paramètre
    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        return this.userService.getUser(email);
    }

    // sur la route "/user/id/1" on récupère le user avec son id passé en paramètre
    @Get('/id/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(Number(id));
    }

    // Sur la route "/user", on créer un user
    @Post()
    createUser(@Body() post: User) {
        const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        if (!emailRegex.test(post.email)) {
            throw new HttpException('email is not valid', HttpStatus.BAD_REQUEST)
        }
        return this.userService.getUser(post.email).then((user) => {
            if (!!user) { 
                throw new HttpException('User already exists', HttpStatus.CONFLICT) 
            }
            return this.userService.addUser(post.email/*, post.username*/).catch(
                error => {
                    throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
                }
            )
        })
    }
}
