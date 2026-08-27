import mongoose from 'mongoose'

const OptionSchema = new mongoose.Schema({ id: String, text: String })
const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [OptionSchema],
  answer: String,
  topic: String,
  difficulty: { type: String, default: 'medium' },
  explain: String,
  tags: [String],
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema)
