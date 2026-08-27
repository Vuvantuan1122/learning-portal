import dbConnect from '../../../lib/db'
import Question from '../../../models/Question'
import Attempt from '../../../models/Attempt'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'

function auth(req){
  const token = req.headers.authorization
  if(!token) throw new Error('No token')
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  return payload
}

export default async function handler(req,res){
  await dbConnect()
  if(req.method==='POST'){
    try{
      const payload = auth(req)
      const {examId, questionId, chosen, timeSpent} = req.body
      const q = await Question.findById(questionId)
      if(!q) return res.status(404).json({message:'Question not found'})
      const correct = q.answer === chosen
      await Attempt.create({userId: payload.id, questionId, chosen, correct, topic: q.topic, timeSpent})
      // update user stats
      const u = await User.findById(payload.id)
      u.stats = u.stats || { totalAttempts:0, correctCount:0, perTopic: {} }
      u.stats.totalAttempts = (u.stats.totalAttempts||0) + 1
      if(correct) u.stats.correctCount = (u.stats.correctCount||0) + 1
      u.stats.perTopic = u.stats.perTopic || {}
      const t = u.stats.perTopic[q.topic] || { attempts:0, correct:0 }
      t.attempts = (t.attempts||0) + 1
      if(correct) t.correct = (t.correct||0) + 1
      u.stats.perTopic[q.topic] = t
      await u.save()
      return res.json({correct})
    }catch(err){
      return res.status(401).json({message:err.message})
    }
  }
  res.status(405).end()
}
