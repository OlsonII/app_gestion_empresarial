import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn} from "typeorm";

@Entity({
    name: 'CATEGORY'
})
export class CategoryOrm{
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    reference: string;
    @Column()
    name: string;
}