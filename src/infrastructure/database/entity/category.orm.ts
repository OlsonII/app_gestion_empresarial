import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity('BRANDS')
export class CategoryOrm{
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    reference: string;
    @Column()
    name: string;
}