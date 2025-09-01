import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'

export enum TaskStatus { TODO = 'todo',  IN_PROGRESS = 'in_progress',  DONE = 'done'}

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column({ type: 'enum', enum: TaskStatus })
    status!: TaskStatus

    @Column({ type: 'timestamp', nullable: true })
    due_date!: Date

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date



    @OneToMany('Comment', (comment: any) => comment.task)
    comments!: any[]

    @ManyToOne('Project', (project: any) => project.tasks, { onDelete: 'CASCADE' })
    project!: any

    @ManyToOne('User', (user: any) => user.tasks, { onDelete: 'SET NULL', nullable: true })
    assigned_to!: any
}