import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenderType, StatusType } from "../type/CommonType";
import BlogCategoryEntity from "./BlogCategoryEntity";

@Entity()
export default class BlogEntity {

    constructor(object?: Partial<BlogEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    categoryId: number

    @ManyToOne(type => BlogCategoryEntity)
    category: BlogCategoryEntity

    @Column({ nullable: false, unique: true })
    key: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, type: "json" })
    images: Array<string>
    
    @Column({ nullable: false })
    description: string

    @Column({ nullable: true })
    detail: string

    @Column({ nullable: false, type: "text" })
    status: StatusType

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
}