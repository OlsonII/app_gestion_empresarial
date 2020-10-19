import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity('PROVIDERS')
export class ProviderOrm{

    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    identification: string;
    @Column()
    company: string;
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    street: string;
    @Column()
    telephone: string;

}