import UserResource from "../resource/UserResource";
import BaseRoutes from "./BaseRoutes";

class UserRouter extends BaseRoutes {
  public routes(): void {
    this.router.post("", UserResource.create);
    this.router.put("/:id", UserResource.update);
    this.router.get("", UserResource.findAll);
    this.router.get("/:id", UserResource.findById);
    this.router.delete("/:id", UserResource.delete);
    this.router.get("/:id/post", UserResource.findPostByUserId);
  }
}

export default new UserRouter().router;