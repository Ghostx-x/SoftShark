import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date



    @OneToMany('Task', (task: any) => task.project)
    tasks!: any[]
}