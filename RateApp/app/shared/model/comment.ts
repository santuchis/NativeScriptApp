import { User } from "./user";
import { Product } from "./product";

export class Comment {
    constructor(
          public id: string,
          public date: number,
          public text: string,
          public stars: number,
          public likesCount: number,
          public dislikesCount: number,
          public createdBy: User,
          public product: Product
        ) {}
}