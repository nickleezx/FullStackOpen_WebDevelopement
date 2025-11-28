import { Schema, model } from 'mongoose'

import uniqueValidator from 'mongoose-unique-validator'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator)

export const MIN_NAME_LENGTH = schema.path('name').options.minlength;

export default model('Author', schema)