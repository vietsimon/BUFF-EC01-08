import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusType } from "../type/CommonType";

@Entity()
export default class BlogCategoryEntity {

    constructor(object?: Partial<BlogCategoryEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    key: string

    @Column({ nullable: false })
    name: string

    @Column()
    description: string

    @Column({ nullable: false, type: "text" })
    status: StatusType

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
    
    @Column({nullable:true})
    sort: number
}