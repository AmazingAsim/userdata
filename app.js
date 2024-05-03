let express=require('express')
let app=express()
let cors=require('cors')
let userroute=require('./routes/userroute')
let db=require('./config/config')
db.dbconnect();
let port=process.env.PORT || 4040
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','DELETE']
}))
app.use(express.static('./views'));
app.use('/api',userroute)
app.listen(port)