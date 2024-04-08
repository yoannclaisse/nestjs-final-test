import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/User';
@Controller('')
export class UserController {
    
    constructor(private userService: UserService) {}

    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
    
    @Get('/id/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUser(Number(id));
    }

    @Post()
    createUser(@Body() post: User, ){
        // console.log(post)
        return this.userService.addUser(post.email, post.username).catch(
            error => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
        )
    }
}
