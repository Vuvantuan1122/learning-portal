import mongoose from 'mongoose'

const AttemptSchema = new mongoose.Schema({
  userId: String,
  questionId: String,
  chosen: String,
  correct: Boolean,
  topic: String,
  timeSpent: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Attempt || mongoose.model('Attempt', AttemptSchema)
