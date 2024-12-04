const path=require('path');
const express=require('express');
const ejs=require('ejs');
const mysql=require('mysql2');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"05062003",
    database:"login",
    port:"3306"
});
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.get('/one',(req,res)=> {
    res.render('one')
});
con.connect(function(err){
    if(err){
        console.error('error connecting to the database:',err);
        return;
    }
    console.log('connected to the database');
})
app.post('/one',(req,res)=>{
    let i=req.body.id;
    let u=req.body.name;
    let p=req.body.passward;
    console.log(req.body.id);
    let sql=`insert into para(name ,id,passward) VALUES("`+u+`",`+i+`,"`+p+`")`;
con.query(sql,function(err){
    if(err){
        console.log(err)
    }
    res.send('<h1>Data inserted successfully</h1><a href="http://localhost:9000">go back to form</a>');
})

})
// app.get('/two',(req,res)=>{
//     res.render('two')
// })
app.get('/two',(req,res)=>{
    let sql ="select * from para";
    con.query(sql,function(err,result){
        if(err){
            console.log("error")
        }console.log(result);
        // res.json(result);
        res.render('two',{para:result});
    })
    
});
app.get('/three',(req,res)=>{
        res.render('three')
     })
app.post('/three',(req,res)=>{
    let d=req.body.id;
    console.log(d);
    let sql ="delete from para where id= "+d;
    con.query(sql,function(err,result){
        if(err){
            console.log("error")
        }
        res.json(result);
        res.send('<h1>Data delete </h1><a href="http://localhost:9000">go back to form</a>')
    })
});
app.get('/four',(req,res)=>{
    res.render("four");
});
app.post('/four',(req,res)=>{
    let i=req.body.id;
    let u=req.body.name;
    let p=req.body.passward;
    console.log(req.body.id);
    let sql=`update para set name='${u}',passward='${p}' where id='${i}'`;
con.query(sql,function(err){
    if(err){
        console.log(err)
    }
    res.send('<h1>Data updated successfully</h1><a href="http://localhost:9000/two">go back to form</a>');
})

})
app.listen(9000,()=>{
    console.log('server is running at port 8000')
});