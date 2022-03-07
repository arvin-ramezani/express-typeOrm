import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Banker } from "./Banker.entity";
import { Transaction } from "./Transaction.entity";
import { Person } from "./utils/Person.utils.entity";

@Entity("client")
export class Client extends Person {
  @Column({
    default: true,
    name: "active",
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: "simple-array",
  })
  family_members: string[];

  @Column({
    type: "numeric",
  })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.client, {
    cascade: true,
  })
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
