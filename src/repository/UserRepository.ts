import Post from "../model/Post";
import User from "../model/User";

interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
  save(user: User): Promise<void>;
}

export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Failed");
    }
  }

  async findById(userId: number): Promise<User> {
    try {
      const res_user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!res_user) {
        throw new Error("User not found");
      }
      return res_user;
    } catch (error) {
      throw new Error("Failed to create User");
    }
  }

  async update(user: User): Promise<void> {
    try {
      const res_user = await User.findOne({
        where: {
          id: user.id,
        },
      });

      if (!res_user) {
        throw new Error("User not found");
      }
      res_user.name = user.name;
      await res_user.save();
    } catch (error) {
      throw new Error("Failed to create User");
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      const res_user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!res_user) {
        throw new Error("User not found");
      }
      await res_user.destroy();
    } catch (error) {
      throw new Error("Failed to remove User");
    }
  }

  async save(user: User): Promise<void> {
    try {
      await User.create({ name: user.name });
    } catch (error) {
      throw new Error("Failed to create User");
    }
  }

  async findPostByUserId(id: number): Promise<Post[]> {
    try {
      // return await Post.findAll({ include: User, where: { user_id: id } });
      return await Post.findAll({ include: User, where: { user_id: id } });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create Post");
    }
  }
}
