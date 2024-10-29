import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString } from "class-validator";
import { Repo } from "../repos/repo.entities";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @IsString()
  label: string = "";

  @Field(() => [Repo], { nullable: true })
  @ManyToMany(() => Repo, (repo) => repo.langs)
  @JoinTable()
  repos!: Repo[];
}
