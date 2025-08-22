import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    name!:string
    @Column({ unique: true })
    email!: string
    @Column()
    profession!:string
    @Column({ type: 'jsonb', nullable: true })
    metadata: any
}