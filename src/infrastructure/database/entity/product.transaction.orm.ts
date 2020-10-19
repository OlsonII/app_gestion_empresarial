import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ProductOrm} from "./product.orm";

@Entity('PRODUCT_TRANSACTIONS')
export class ProductTransactionOrm{

    @ObjectIdColumn()
    _id: ObjectID;
    public inputQuantity: number;
    @Column({nullable: false})
    public outputQuantity: number;
    @Column({nullable: false})
    public description: string;
    @Column({nullable: false})
    public product: ProductOrm;
    @Column({nullable: false})
    public date: string;

}