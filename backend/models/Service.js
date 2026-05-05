import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const ServiceSchema = new mongoose.Schema({
  photos: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isHeroProduct: {
    type: String,
    default: "no",
  },
  faq: {
    type: [FaqSchema],
    default: [],
  }
}, { timestamps: true });

if (mongoose.models.Service) {
  delete mongoose.models.Service;
}

export default mongoose.model('Service', ServiceSchema);
