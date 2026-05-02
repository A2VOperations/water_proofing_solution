import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  companyTitle: {
    type: String,
  },
  numbers: {
    type: [String],
  },
  address: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
