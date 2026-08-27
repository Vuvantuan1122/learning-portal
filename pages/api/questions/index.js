import dbConnect from '../../../lib/db'
import Question from '../../../models/Question'
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
  if(req.method==='GET'){
    const q = await Question.find().limit(200)
    return res.json(q)
  }
  if(req.method==='POST'){
    try{
      const payload = auth(req)
      const me = await User.findById(payload.id)
      if(!me || me.role!=='admin') return res.status(403).json({message:'Forbidden'})
      const body = req.body
      const q = await Question.create(body)
      return res.json(q)
    }catch(err){
      return res.status(401).json({message: err.message})
    }
  }
  res.status(405).end()
}
