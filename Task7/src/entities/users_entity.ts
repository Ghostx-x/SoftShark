import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    profession!: string



    @OneToMany('Task', (task: any) => task.assigned_to)
    tasks!: any[]
}