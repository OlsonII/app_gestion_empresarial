import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity('CLIENTS')
export class ClientOrm{

    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    identification: string;
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    street: string;
    @Column()
    telephone: string;

}