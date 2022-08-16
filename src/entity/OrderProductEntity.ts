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

    @Column()
    orderId:number 

    @OneToOne(() => OrderEntity)
    @JoinColumn()
    order: OrderEntity

    @Column({ nullable: false, default: 0 })
    quantity: number

    @Column()
    productId:number 

    @OneToOne(() => ProductEntity)
    @JoinColumn()
    product: ProductEntity

    @Column({ nullable: true })
    sizeId:number 

    @OneToOne(() => SizeProductEntity)
    @JoinColumn()
    size: SizeProductEntity

    @Column({ nullable: false })
    currentPrice: number

}