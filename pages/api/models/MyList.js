import mongoose from 'mongoose'
import { uuid } from 'uuidv4';

const MyListSchema = mongoose.Schema({
  id: { type: String, default: uuid },
  title: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  }
})

export default mongoose.models.MyList || mongoose.model('MyList', MyListSchema)