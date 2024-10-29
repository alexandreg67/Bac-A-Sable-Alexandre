import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString } from "class-validator";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  @IsString()
  name: string = "";

  @Field()
  @Column()
  @IsString()
  url: string = "";

  @Field()
  @Column({ type: "boolean", default: false })
  isPrivate!: boolean;

  // Relation avec Status (un repo a un statut)
  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.repos)
  status!: Status;

  // Relation avec les langues (Many-to-Many) avec suppression en cascade
  @Field(() => [Lang])
  @ManyToMany(() => Lang, (lang) => lang.repos, { cascade: true })
  langs!: Lang[];
}
