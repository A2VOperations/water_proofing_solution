import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
