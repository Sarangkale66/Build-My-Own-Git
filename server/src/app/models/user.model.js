import mongoose, { model } from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username must be less than 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  fullname: {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [50, 'First name must be less than 50 characters'],
      match: [/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces']
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [50, 'Last name must be less than 50 characters'],
      match: [/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces']
    }
  },
  bio: {
    type: String,
    default: "",
    maxlength: [500, 'Bio must be less than 500 characters'],
    trim: true
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function (value) {
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        return age >= 13 && age <= 120;
      },
      message: 'Age must be between 13 and 120 years'
    }
  }
}, { timestamps: true, versionKey: false });

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

userSchema.virtual('displayName').get(function () {
  return `${this.fullname.firstname} ${this.fullname.lastname}`;
});

const userModel = model("user", userSchema);
export default userModel;