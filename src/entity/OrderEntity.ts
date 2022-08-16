import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import CustomerEntity from "./CustomerEntity";

@Entity()
export default class OrderEntity {

    constructor(object?: Partial<OrderEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    orderCode: string

    @Column()
    guestId: number

    @OneToOne(() => CustomerEntity)
    @JoinColumn()
    guest: CustomerEntity

    @Column({ nullable: false, type: "decimal" })
    totalPrice: number

    @Column({ nullable: false })
    shippingAddress: string

    @Column({ nullable: true })
    note: string

    @Column({ nullable: false })
    shippingFee: number

    @Column({ nullable: false })
    discountCode: string

    @Column({ type: "decimal" })
    discountFee: number

    @Column({ nullable: false, type: "text" })
    status: string

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
}