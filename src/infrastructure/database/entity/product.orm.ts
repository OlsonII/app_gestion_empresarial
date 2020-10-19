import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {BrandOrm} from "./brand.orm";
import {CategoryOrm} from "./category.orm";
import {ProviderOrm} from "./provider.orm";

@Entity('PRODUCTS')
export class ProductOrm{

    @Column()
    brand: BrandOrm;
    @Column()
    category: CategoryOrm;
    @Column({default: 0})
    cost: number;
    @Column({default: " "})
    description: string;
    @Column()
    name: string;
    @Column({default: 0})
    price: number;
    @Column({
        default: 0
    })
    quantity: number;
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    reference: string;
}