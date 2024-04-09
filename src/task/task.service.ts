import { Inject, Injectable, NotImplementedException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/Task';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
    constructor(
        // Ce repository va interagir avec la class Task
        // Il permet de gérer le CRUD
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    // Ajout d'une task
    async addTask(name: string, userId: number, priority: number): Promise<Task> {
        // this.userRepository.findOneBy({ id: userId }).
        //     then(user => {
        //         const task = new Task()
        //         task.name = name
        //         task.priority = priority
        //         task.user = user
        //         return this.taskRepository.save(task)
        //     }).
        //     catch( error => {
        //         throw(error)
        //     })
        const user = await this.userService.getUserById(userId)
        if (!!user) {
            const task = new Task()
            task.name = name
            task.priority = priority
            task.user = user
            return this.taskRepository.save(task)
        } else {
            throw ('Invalid user id')
        }
    }

    getTaskByName(name: string): Promise<Task> {
        return this.taskRepository.findOneBy({
            name: name
        })
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        const user = await this.userService.getUserById(userId)
        if (!!user) {
            return this.taskRepository.find({
                where: {
                    user: user
                }
            })
        } else {
            throw ('Invalid user id')
        }
    }

    resetData(): Promise<void> {
        return this.taskRepository.clear()
    }
}
