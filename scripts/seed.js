// Simple seed script
const mongoose = require('mongoose')
const User = require('../models/User')
const Question = require('../models/Question')

async function main(){
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected')
  // create admin
  const admin = await User.findOne({email:'admin@lp.test'})
  if(!admin){
    await User.create({ name: 'Admin', email: 'admin@lp.test', passwordHash: '$2a$10$7QpQp7qg7k6cQKqjKQKqKe6g7QpQp7qg7k6cQKqjKQKqKe', role:'admin' })
    console.log('Created admin (password: admin123) - please change in production')
  }
  // sample questions
  const count = await Question.countDocuments()
  if(count===0){
    await Question.create([
      { text: 'Thủ đô của Việt Nam là gì?', options:[{id:'a',text:'Hà Nội'},{id:'b',text:'Hồ Chí Minh'},{id:'c',text:'Đà Nẵng'},{id:'d',text:'Huế'}], answer:'a', topic:'Địa lý', explain:'Thủ đô là Hà Nội' },
      { text: '2 + 2 = ?', options:[{id:'a',text:'3'},{id:'b',text:'4'},{id:'c',text:'5'},{id:'d',text:'22'}], answer:'b', topic:'Toán', explain:'2+2=4' }
    ])
    console.log('Seeded questions')
  }
  process.exit(0)
}
main().catch(e=>{ console.error(e); process.exit(1) })
