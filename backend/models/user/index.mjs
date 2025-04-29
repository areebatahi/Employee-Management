import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    lastName: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    profileImage: {
      type: String,
      required: true, // can be URL or filename
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    isCustomer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Optional index
// userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;
