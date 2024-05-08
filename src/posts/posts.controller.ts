import * as express from "express";
import Post from "./post.interface";
import postModel from "./posts.model";
import Controller from "interfaces/controller.interface";

export default class PostsController implements Controller {
  public path = "/posts";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, this.modifyPostById);
    this.router.delete(`${this.path}/:id`, this.deletePostById);
  }

  private getAllPosts = (
    request: express.Request,
    response: express.Response
  ) => {
    postModel.find().then((posts) => {
      response.send(posts);
    });
  };

  private createAPost = (
    request: express.Request,
    response: express.Response
  ) => {
    const post: Post = request.body;
    const createdPost = new postModel(post);
    createdPost.save().then((savedPost) => {
      response.send(savedPost);
    });
  };

  private getPostById = (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;
    postModel.findById(id).then((post) => {
      response.send(post);
    });
  };

  private modifyPostById = (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;
    const postData: Post = request.body;
    postModel.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      response.send(post);
    });
  };

  private deletePostById = (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;
    postModel.findByIdAndDelete(id).then((dbResponse) => {
      if (dbResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
  };
}
