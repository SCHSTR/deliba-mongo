require('dotenv').config()
const mongoose = require('mongoose')

//const database_url = 'mongodb://localhost:27017/delibaDB''
const database_url = 'mongodb+srv://delibabot:cachorroamarelo@delibadb.jqsv4.mongodb.net/'

mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true } , err =>{
  if(err){
      console.error('Err!' + err)
  }else{
      console.log('Connected to mongodb sucefully!')
  }
});

module.exports = mongoose
