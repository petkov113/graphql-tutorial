import mongoose, { Schema } from 'mongoose'

export const Directors = mongoose.model(
  'Director',
  new Schema({
    name: String,
    age: Number,
  })
)
