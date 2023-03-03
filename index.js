const express = require('express');
const { default: mongoose } = require('mongoose');
const { MONGOURI } = require('./keys');
const exphbs =  require('express-handlebars');
const app = express();


mongoose.connect(MONGOURI)
    
             console.log("Database Connected !!!")       
     
 
             
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


 app.use(express.json())

 app.use(require('./routes/auth'))
 app.use(require('./routes/jobPosition'))
     
const PORT = 3500
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`));
