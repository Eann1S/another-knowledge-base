import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "../posts/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string;

    @Column()
    hashed_password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[]
}
