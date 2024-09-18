import { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import User from "../model/User";

class UserResource {
  async create(req: Request, res: Response) {
    const user = new User();
    user.name = req.body.name;

    try {
      await new UserRepository().save(user);
      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: "User wasn't created" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let userId = parseInt(req.params["id"]);

      await new UserRepository().delete(userId);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: "User wasn't created" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const res_user = await new UserRepository().findAll();
      res.status(200).json({ data: res_user });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let userId = parseInt(req.params["id"]);
      const res_user = await new UserRepository().findById(userId);
      res.status(200).json({ data: res_user });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let userId = parseInt(req.params["id"]);
      const user = new User();

      user.id = userId;
      user.name = req.body.name;

      await new UserRepository().update(user);
      res.status(200).json({ message: "User updated" });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  }

  async findPostByUserId(req: Request, res: Response) {
    try {
      let userId = parseInt(req.params["id"]);
      const result = await new UserRepository().findPostByUserId(userId);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  }

}

export default new UserResource();
