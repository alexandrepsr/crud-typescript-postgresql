import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "post",
})
class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
  })
  declare slug: string;

  @Column({
    type: DataType.TEXT,
  })
  declare content: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare status: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  user!: User

  @BeforeCreate
  static async generateSlug(instance: Post) {
    const count = await Post.count({
      where: {
        title: instance.title,
      },
    });

    let suffix = "";
    if (count > 0) suffix = `-${count + 1}`;
    instance.slug =
      instance.title.toLocaleLowerCase().replace(" ", "-") + suffix;
  }
}

export default Post;
