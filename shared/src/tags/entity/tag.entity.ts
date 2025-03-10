import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entity/post.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Post, (post) => post.tags)
    posts: Post[]
}