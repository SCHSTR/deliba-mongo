require('dotenv').config()
const mongoose = require('mongoose')

const database_url = process.env.DB_URL

mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } , err =>{
  if(err){
      console.error('Err!' + err)
  }else{
      console.log('Connected to mongodb sucefully!')
  }
});

module.exports = mongoose
