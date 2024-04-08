import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class TaskService {
    constructor() {}

    addTask(name: string, userId: number, priority: number): Promise<void> {
        throw new NotImplementedException();
    }

    getTaskByName(name: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    getUserTasks(userId: number): Promise<unknown[]> {
        throw new NotImplementedException();
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
