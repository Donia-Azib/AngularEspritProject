/*title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  publish :{type:Boolean,required:true} */
  export class Article {

    constructor(
        private title?:String,private description?:String,
        private imageUrl?:String,private publish?:Boolean,
        private userId?:String,private _id?:String)
    {}

}