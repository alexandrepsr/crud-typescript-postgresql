import { Request, Response } from "express";
import Post from "../model/Post";
import { PostRepository } from "../repository/PostRepository";

class PostResource {
  async create(req: Request, res: Response) {
    const userId = parseInt(req.params["id"]);

    const post = new Post();
    post.title = req.body.title;
    post.content = req.body.content;
    post.user_id = userId;

    try {
      await new PostRepository().save(post);
      res.status(201).json({ message: "Post created" });
    } catch (error) {
      res.status(500).json({ message: "Post wasn't created", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let postId = parseInt(req.params["id"]);

      await new PostRepository().delete(postId);
      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      res.status(500).json({ message: "Post wasn't created" });
    }
  }

  async findById(req: Request, res: Response) {
    const postId = parseInt(req.params["id"]);

    try {
      const result = await new PostRepository().findById(postId);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Post not found", error });
    }
  }
}

export default new PostResource();
