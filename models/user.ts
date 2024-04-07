import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true }
  }, { timestamps: true })

const User = models.User || mongoose.model("User", userSchema)

export default User