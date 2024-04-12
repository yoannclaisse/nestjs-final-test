import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../prisma/models/User';

@Controller('')
export class UserController {

    constructor(private userService: UserService) {}

    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        return this.userService.getUser(email);
    }

    @Get('/id/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(Number(id));
    }

    @Post()
    async createUser(@Body() post: User) {
        const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        if (!emailRegex.test(post.email)) {
            throw new HttpException('email is not valid', HttpStatus.BAD_REQUEST)
        }
        const userEmail = await this.userService.getUser(post.email)
        if (!!userEmail) {
            throw new HttpException('User already exist', HttpStatus.CONFLICT)
        }
        // console.log(post)
        return this.userService.addUser(post.email/*, post.username*/).catch(
            error => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
        )
    }
}
