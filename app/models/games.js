import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    year: Number,
    description: String,
    picture: String,
    postDate: { type: Date, default: Date.now } // Default: TimeStamp
  }
)

export default mongoose.model('Game', gameSchema);
