import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { Task } from '../../prisma/models/Task';

@Injectable()
export class TaskService {
    constructor(
        private prisma: PrismaService
    ) { }

    // Ajout d'une task
    addTask(name: string, userId: number, priority: number): Promise<Task> {
        return this.prisma.task.create({
            data: {
                name: name,
                priority: priority,
                userId: userId
            }
        })
    }

    // Récupération des tasks par leur nom
    getTaskByName(name: string): Promise<Task> {
        return this.prisma.task.findFirst({
            where: {
                name: name
            }
        })
    }

    // Récupération des tasks des Users
    getUserTasks(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: {
                userId: userId
            }
        })
    }

    // Reset data pour les tests
    resetData(): Prisma.PrismaPromise<any> {
        return this.prisma.task.deleteMany({})
    }
}
