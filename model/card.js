// eslint-disable-next-line import/no-extraneous-dependencies
// import { Types } from "mongoose";

// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link:
    {
      type: String,
      required: true,
    },
  owner:
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  likes:
    {
      type: Array,
      required: true,
      default: [],
    },
  createdAt:
    {
      type: Date,
      required: true,
      default: Date.now,
    },
});
module.exports = mongoose.model('card', cardSchema);
