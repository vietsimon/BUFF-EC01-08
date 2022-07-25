import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import OrderEntity from "./OrderEntity";
import ProductEntity from "./ProductEntity";
import SizeProductEntity from "./SizeProductEntity";

@Entity()
export default class OrderProductEntity {

    constructor(object?: Partial<OrderProductEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @OneToOne(() => OrderEntity)
    @JoinColumn()
    order: OrderEntity

    @Column({ nullable: false, default: 0 })
    quantity: number

    @OneToOne(() => ProductEntity)
    @JoinColumn()
    product: ProductEntity

    @OneToOne(() => SizeProductEntity)
    @JoinColumn()
    size: SizeProductEntity

    @Column({ nullable: false })
    currentPrice: number

}