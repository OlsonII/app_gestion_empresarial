import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn} from "typeorm";

@Entity({
    name: 'BRAND'
})
export class BrandOrm{
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    reference: string;
    @Column()
    name: string;
}