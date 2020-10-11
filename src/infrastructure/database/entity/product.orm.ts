import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn} from "typeorm";
import {BrandOrm} from "./brand.orm";
import {CategoryOrm} from "./category.orm";
import {ProviderOrm} from "./provider.orm";

@Entity('PRODUCT')
export class ProductOrm{

    @Column(type => CategoryOrm)
    brand: BrandOrm;
    @Column(type => CategoryOrm)
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
    @Column(type => ProviderOrm)
    provider: ProviderOrm;
    @Column({
        default: 0
    })
    quantity: number;
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    reference: string;
}