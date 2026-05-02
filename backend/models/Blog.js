import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String },
  category: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  readTime: { type: String },
  description: { type: String },
  content: { type: String }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
