import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenderType, StatusType } from "../type/CommonType";

@Entity()
export default class DefineDataEntity {

    constructor(object?: Partial<DefineDataEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    group: string

    @Column()
    key : string
    
    @Column()
    content : string

    @Column({ nullable: false, type: "text" })
    status: StatusType

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
}
