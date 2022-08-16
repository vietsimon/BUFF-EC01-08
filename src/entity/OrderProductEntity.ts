import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({ nullable: false, default: 0 })
    quantity: number

    @ManyToOne(() => ProductEntity)
    @JoinColumn()
    product: ProductEntity

    @ManyToOne(() => SizeProductEntity)
    @JoinColumn()
    size: SizeProductEntity

    @Column({ nullable: false, type: "decimal",default:0 })
    currentPrice: number

    @Column({ nullable: true, type: "timestamp with time zone" })
    updatedAt: Date

    @Column({ nullable: true, type: "timestamp with time zone" })
    createdAt: Date
    
    @Column({default:"active"})
    status : string

}