import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusType } from "../type/CommonType";

@Entity()
export default class ColorEntity {

    constructor(object?: Partial<ColorEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    color: string

    @Column({ nullable: false, type: "text" })
    status: StatusType

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
}