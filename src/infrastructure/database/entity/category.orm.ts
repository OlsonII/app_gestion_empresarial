import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity({
    name: 'CATEGORIES'
})
export class CategoryOrm{
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    reference: string;
    @Column()
    name: string;
}