import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenderType, StatusType } from "../type/CommonType";
import SizeProductEntity from "./SizeProductEntity";

@Entity()
export default class ProductEntity {

    constructor(object?: Partial<ProductEntity>) {
        Object.assign(this, object)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    categoryId: number

    @Column({ nullable: false, unique: true })
    key: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    description: string

    @Column({ nullable: false, default: 0 })
    price: number

    @Column({ nullable: false, default: 0 })
    oldPrice: number

    @Column({ nullable: false, type: "json" })
    images: Array<string>

    @Column({ nullable: false, type: "text" })
    gender: GenderType

    @Column({ nullable: false })
    technology: string

    @Column({ nullable: false })
    material: string

    @Column({ nullable: false })
    activity: string

    @Column({ nullable: false })
    label: string

    @ManyToOne(() => SizeProductEntity, (size) => size.id)
    @JoinColumn()
    size: SizeProductEntity

    @Column({ nullable: false, type: "text" })
    status: StatusType

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
}