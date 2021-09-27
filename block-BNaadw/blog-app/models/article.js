// var mongoose = require("mongoose");

// var Schema = mongoose.Schema

// var articleSchema = new Schema({
//     title: { type: String , required: true},
//     description:{ type: String, required:true},
//     likes: {type: Number},
//     comments : [{ type: Schema.Types.ObjectId}],
//     author : String,
//     slug 
// })

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slug');

let articleSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    likes: { type: Number, default: 0 },
    comments: { type: [Schema.Types.ObjectId], ref: 'Comment' },
    author: String,
    slug: String,
  },
  { timestamps: true }
);

articleSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

module.exports = mongoose.model('Article', articleSchema);