import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin", "student"] },
  isActive: { type: Boolean, default: true }, // Added isActive field
  phone: { type: String },
  department: { type: String },
  rollNumber: { type: String },
  profileCompleted: { type: Boolean, default: false },
  image: { type: Buffer }, // Changed to Buffer type
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);