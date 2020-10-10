import {IBrand} from "../../../domain/contracts/brand.interface";
import {ICategory} from "../../../domain/contracts/category.interface";
import {IProvider} from "../../../domain/contracts/provider.interface";
import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {BrandOrm} from "./brand.orm";
import {CategoryOrm} from "./category.orm";
import {ProviderOrm} from "./provider.orm";

@Entity('PRODUCT')
export class ProductOrm{

    @ManyToOne(type => BrandOrm, brand => brand.reference)
    brand: BrandOrm;

    @ManyToOne(type => CategoryOrm, category => category.reference)
    category: CategoryOrm;

    @Column({
        default: 0
    })
    cost: number;

    @Column({
        default: " "
    })
    description: string;

    @Column()
    name: string;

    @Column({
        default: 0
    })
    price: number;

    @ManyToOne(type => ProviderOrm, provider => provider.identification)
    provider: ProviderOrm;

    @Column({
        default: 0
    })
    quantity: number;

    @PrimaryColumn()
    reference: string;
}