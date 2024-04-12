import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '../../prisma/models/User';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    // Ajouter un user
    addUser(email: string/*, username: string*/): Promise<User> {
        const user = new User()
        user.email = email
        user.username = ""
        return this.prisma.user.create({ data: user })
    }

    // Récupérer un user par son email
    getUser(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    // Récupérer un user par son id
    getUserById(id: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }

    // Supprimer un user pour les tests
    resetData(): Promise<any> {
        return this.prisma.$transaction([
            this.prisma.task.deleteMany({}),
            this.prisma.user.deleteMany({})
        ])
    }
}
