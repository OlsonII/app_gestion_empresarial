import {Product} from "../../../domain/entity/product.entity";
import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity('PRODUCT_TRANSACTIONS')
export class ProductTransactionOrm{

    @ObjectIdColumn()
    _id: ObjectID;
    public inputQuantity: number;
    @Column({nullable: false})
    public outputQuantity: number;
    @Column({nullable: false})
    public product: Product;
    @Column({nullable: false})
    public date: string;

}