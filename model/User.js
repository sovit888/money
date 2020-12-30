const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid').v4;

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    middle_name: { type: String, trim: true, default: null },
    last_name: { type: String, required: true, trim: true },
    document_images: { type: String, required: true },
    salt: { type: String, required: true },
    enc_password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    reset_token: { type: String, default: null },
    expiry_token: { type: Date, default: null }
  },
  { timestamps: true }
);

UserSchema.virtual('password').set(function (plainpassword) {
  this.salt = uuid();
  this.enc_password = this.securePassword(plainpassword);
});

UserSchema.method({
  authenticate: function (password) {
    return this.enc_password === this.securePassword(password);
  },
  depositBalance: function (amount) {
    this.balance += amount;
    this.save();
  },
  transferBalance: function (amount) {
    this.balance -= amount;
    this.save();
  },
  securePassword: function (plainpassword) {
    return crypto
      .createHmac('sha256', this.salt)
      .update(plainpassword)
      .digest('hex');
  }
});

module.exports = mongoose.model('user', UserSchema);
