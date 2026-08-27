import dbConnect from '../../lib/db'
import Attempt from '../../models/Attempt'
import User from '../../models/User'

export default async function handler(req,res){
  await dbConnect()
  if(req.method!=='GET') return res.status(405).end()
  // leaderboard by accuracy
  const agg = await Attempt.aggregate([
    { $group: { _id: '$userId', attempts: { $sum: 1 }, correct: { $sum: { $cond: ['$correct',1,0] } } } },
    { $project: { userId: '$_id', attempts:1, correct:1, accuracy: { $cond: [{ $eq: ['$attempts',0] },0, { $divide: ['$correct','$attempts'] }] } } },
    { $sort: { accuracy: -1, correct: -1 } },
    { $limit: 100 }
  ])
  // populate user
  const users = await User.find({_id: { $in: agg.map(a=>a.userId) }}).select('name')
  const map = Object.fromEntries(users.map(u=>[u._id.toString(), u.name]))
  const list = agg.map(a=>({ userId: a.userId, name: map[a.userId] || 'User', attempts: a.attempts, correct: a.correct, accuracy: a.accuracy }))
  res.json(list)
}
