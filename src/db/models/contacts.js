import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },

    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userID: {
      // нова властивість
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    photo: { type: String },
  },
  { timestamps: true }, // автоматично додає createdAt та updatedAt
);

export const Contact = model('Contact', contactSchema);
