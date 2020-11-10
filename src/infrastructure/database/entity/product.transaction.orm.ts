import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ProductOrm} from "./product.orm";
import {UserOrm} from "./user.orm";

@Entity('PRODUCT_TRANSACTIONS')
export class ProductTransactionOrm{

    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    public inputQuantity: number;
    @Column()
    public outputQuantity: number;
    @Column()
    public description: string;
    @Column()
    public product: ProductOrm;
    @Column()
    public date: string;
    @Column()
    public user: UserOrm;
}