import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        // Ce repository va interagir avec la class User
        // Il permet de gérer le CRUD
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    // Ajouter un user
    addUser(email: string/*, username: string*/): Promise<User> {
        const user = new User()
        user.email = email
        // user.username = username
        return this.userRepository.save(user);
    }

    // Trouver un user par son email
    getUser(email: string): Promise<User> {
        return this.userRepository.findOneBy({
            email: email
        })
    }

    // Trouver un user par son id
    getUserById(id: number): Promise<User> {
        return this.userRepository.findOneBy({
            id: id
        })
    }

    // Supprimer un user
    resetData(): Promise<void> {
        // TODO : à faire plus tard
        // return this.userRepository.delete(id)
        throw new NotImplementedException();
    }
}
