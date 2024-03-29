const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: { type: String, required: true, minlength: 6 },
});

userSchema.pre("save", async function hashPassword(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
