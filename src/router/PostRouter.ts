import PostResource from "../resource/PostResource";
import BaseRoutes from "./BaseRoutes";

class PostRouter extends BaseRoutes {
  public routes(): void {
    this.router.post("/:id", PostResource.create);
    // this.router.put("/:id", UserResource.update);
    // this.router.get("", UserResource.findAll);
    this.router.get("/:id", PostResource.findById);
    this.router.delete("/:id", PostResource.delete);
  }
}

export default new PostRouter().router;