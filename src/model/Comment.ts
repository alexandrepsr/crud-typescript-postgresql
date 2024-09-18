import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "./User";
import Post from "./Post";

@Table({
  tableName: "comment",
})
export default class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare text: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;
  
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  declare post_id: number;
}
