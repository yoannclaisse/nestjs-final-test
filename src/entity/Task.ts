import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"

// name: string, userId: string, priority: number

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne((type) => User)
    @JoinColumn({  name: "userId" })
    user: User;

    @Column()
    priority: number

    @Column()
    name: string

}
