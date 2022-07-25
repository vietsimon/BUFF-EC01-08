import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusType } from "../type/CommonType";

@Entity()
export default class ManagerEntity {

    constructor(object?: Partial<ManagerEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column({ nullable: false, unique: true })
    username: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false, type: "text" })
    status: StatusType

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
}
