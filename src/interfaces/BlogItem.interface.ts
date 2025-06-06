import mongoose, { Schema } from 'mongoose'

export interface IBlogItem {
  _id: string
  title: string
  description: string
  image: string
  authorId: string
  createdAt: string
  updatedAt: string
}

export interface CreateBlog {
  title: string
  description: string
  image: string
  authorId: string
}

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctors',
    required: true
  }
})

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
export default Blog
