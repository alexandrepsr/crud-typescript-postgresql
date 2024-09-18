import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Post from "./Post";

@Table({
  tableName: User.USER_TABLE_NAME,
})
export default class User extends Model {
  public static USER_TABLE_NAME = "user" as string;
  public static USER_ID = "id" as string;
  public static USER_NAME = "name" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_NAME,
  })
  name!: string;

  @HasMany(() => Post)
  posts!: Post[];
}
