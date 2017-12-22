export class Product {
      constructor(
            public id: string,
            public name: string,
            public brand: string,
            public description: string,
            public features: string,
            public commentsCount: number,
            public likesCount: number,
            public dislikesCount: number,
            public rate: number,
            public createAt: number,
            public images: string[]) {}

      
}