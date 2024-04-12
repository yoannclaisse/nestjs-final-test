import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    createTask(@Body() post: any) {
        
        if(post.name == '') {
            throw new HttpException('Name is empty', HttpStatus.BAD_REQUEST)
        }
        const userId = Number.parseInt(post.userId)
        if(!Number.isInteger(userId) || Number(userId) <= 0) {
            throw new HttpException('User id is invalid', HttpStatus.BAD_REQUEST)
        }
        const priority = Number.parseInt(post.priority)
        if(!Number.isInteger(priority) || Number(priority) <= 0) {
            throw new HttpException(`Priority ${priority} must be a number`, HttpStatus.BAD_REQUEST)
        }
        return this.taskService.addTask(post.name, userId, priority).catch(
            error => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
        )
    }

    @Get(':name')
    getTaskByName(@Param('name') name: string) {
        return this.taskService.getTaskByName(name)
    }

    @Get('/user/:id')
    getUserTasks(@Param('id') id:string) {
        const userId = Number.parseInt(id)
        if(!Number.isInteger(userId) || Number(userId) <= 0) {
            throw new HttpException('User id is invalid', HttpStatus.BAD_REQUEST)
        }
        // const user = await this.userService.getUserById(Number(id))
        // if (!user) {
        //     throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST)
        // }
        return this.taskService.getUserTasks(Number(userId))
    }
    
}
