import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'int' })
    task_id!: number

    @Column({ type: 'text' })
    content!: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date

    @ManyToOne('Task', (task: any) => task.comments, { onDelete: 'CASCADE' })
    task!: any
}
