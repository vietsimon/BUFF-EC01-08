import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenderType, StatusType } from "../type/CommonType";
import BrandEntity from "./BrandEntity";
import CategoryEntity from "./CategoryEntity";
import ColorEntity from "./ColorEntity";
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

    @ManyToOne(type => CategoryEntity)
    category: CategoryEntity

    @Column({ nullable: false, unique: true })
    key: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true , type: "text" })
    description: string

    @Column({ nullable: true, type: "text" })
    detail: string

    @Column({ nullable: false, default: 0, type: "decimal" })
    price: number

    @Column({ nullable: false, default: 0, type: "decimal" })
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

    @Column({ nullable: true })
    brandId: number

    @ManyToOne(type => BrandEntity)
    brand: BrandEntity

    @Column({ nullable: true })
    sizeId: number

    @ManyToOne(type => SizeProductEntity)
    size: SizeProductEntity

    @Column({ nullable: true })
    colorId: number

    @ManyToOne(type => ColorEntity)
    color: ColorEntity

    @Column({ nullable: false, type: "text" })
    status: StatusType

    @Column({ type: "timestamp without time zone" })
    createdAt: Date

    @Column({ type: "timestamp without time zone" })
    updatedAt: Date
}