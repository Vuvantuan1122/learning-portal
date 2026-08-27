// Seed script with configurable admin password (do NOT commit secrets)
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Question = require('../models/Question')

async function main(){
  if(!process.env.MONGODB_URI){
    console.error('MONGODB_URI is not set. Set it in your environment before running this script.')
    process.exit(1)
  }
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@lp.test'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123' // change via env in production

  // create admin user if not exists
  const admin = await User.findOne({ email: adminEmail })
  if(!admin){
    const hash = await bcrypt.hash(adminPassword, 10)
    await User.create({ name: 'Admin', email: adminEmail, passwordHash: hash, role:'admin', stats: { totalAttempts:0, correctCount:0, perTopic: {} } })
    console.log(`Created admin (${adminEmail}) with provided ADMIN_PASSWORD (change after first login)`)
  } else {
    console.log('Admin already exists')
  }

  // sample questions
  const count = await Question.countDocuments()
  if(count===0){
    await Question.create([
      { text: 'Thủ đô của Việt Nam là gì?', options:[{id:'a',text:'Hà Nội'},{id:'b',text:'Hồ Chí Minh'},{id:'c',text:'Đà Nẵng'},{id:'d',text:'Huế'}], answer:'a', topic:'Địa lý', explain:'Thủ đô là Hà Nội' },
      { text: '2 + 2 = ?', options:[{id:'a',text:'3'},{id:'b',text:'4'},{id:'c',text:'5'},{id:'d',text:'22'}], answer:'b', topic:'Toán', explain:'2+2=4' }
    ])
    console.log('Seeded sample questions')
  } else {
    console.log('Questions already seeded')
  }

  process.exit(0)
}

main().catch(e=>{ console.error(e); process.exit(1) })
