import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity('CATEGORIES')
export class CategoryOrm{
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    reference: string;
    @Column()
    name: string;
}