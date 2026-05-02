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
    enum: [
      "Residential solutions",
      "Specialized solutions",
      "Technical solutions",
      "Premium finishes"
    ],
  },
  description: {
    type: String,
    required: true,
  },
  faq: {
    type: [FaqSchema],
    default: [],
  }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
