import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CustomerEntity {

    constructor(object?: Partial<CustomerEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    fullName: string

    @Column({ nullable: false, unique: true })
    phone: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ type: "timestamp without time zone" })
    dateOfBirth: Date

    @Column({ nullable: true })
    address: string

    @Column({ nullable: false, unique: true })
    username: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false, type: "text" })
    status: "active" | "inactive"

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date

}