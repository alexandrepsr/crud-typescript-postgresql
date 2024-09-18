import Post from "../model/Post";

interface IPostRepository {
  findAll(): Promise<Post[]>;
  findById(id: number): Promise<Post>;
  update(post: Post): Promise<void>;
  delete(id: number): Promise<void>;
  save(post: Post): Promise<void>;
}

export class PostRepository implements IPostRepository {
  async findAll(): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<Post> {
    try {
      const res_post = await Post.findOne({
        where: {
          id: id,
        },
      });

      if (!res_post) {
        throw new Error("Post not found");
      }
      return res_post;
    } catch (error) {
      throw new Error("Failed to create User");
    }
  }
  async update(post: Post): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async delete(userId: number): Promise<void> {
    try {
      const res_post = await Post.findOne({
        where: {
          id: userId,
        },
      });

      if (!res_post) {
        throw new Error("User not found");
      }
      await res_post.destroy();
    } catch (error) {
      throw new Error("Failed to remove User");
    }
  }

  async save(post: Post): Promise<void> {
    try {
      await Post.create({
        title: post.title,
        content: post.content,
        user_id: post.user_id,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create Post");
    }
  }
}
