import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import CustomerEntity from "./CustomerEntity";
import OrderProductEntity from "./OrderProductEntity";

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

    @ManyToOne(() => CustomerEntity)
    @JoinColumn()
    guest: CustomerEntity

    @Column({ nullable: false, type: "decimal", default: 0 })
    totalPrice: number

    @Column({ nullable: false })
    shippingAddress: string

    @Column({ nullable: true })
    note: string

    @Column({ nullable: false, default: 0 })
    shippingFee: number

    @Column({ nullable: true })
    discountCode: string

    @Column({ type: "decimal", default: 0 })
    discountFee: number

    //GHN , GHTK...
    @Column({ nullable: true })
    shippingMethod: string

    @Column({ nullable: true })
    shippingProvinceId: string

    @Column({ nullable: true })
    shippingDistrictId: string

    @Column({ nullable: true })
    shippingWardId: string

    //paypal, vnpay
    @Column({ nullable: true })
    paymentMethod: string

    @Column({ nullable: false, type: "text" })
    status: string

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date

    @ManyToMany(() => OrderProductEntity)
    @JoinTable()
    orderProducts : OrderProductEntity[]
}