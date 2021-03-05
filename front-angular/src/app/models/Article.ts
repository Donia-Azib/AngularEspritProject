/*title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  publish :{type:Boolean,required:true} */
  export class Article {

    constructor(
        public title?:string,public description?:string,
        public imageUrl?:string,public publish?:Boolean,
        public userId?:string,public username?:string,public _id?:string)
    {}

}