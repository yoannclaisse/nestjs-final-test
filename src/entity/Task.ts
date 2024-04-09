import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"

// name: string, userId: string, priority: number

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => User)
    @JoinColumn({  name: "userId" })
    user: User;

    @Column()
    priority: number

    @Column()
    name: string

}
