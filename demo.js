const express=require("express");
const port=8000;
const app=express();
const users= require('./MOCK_DATA.json');
const fs=require("fs");

app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`${Date.now}: ${req.method}: ${req.path}`,
        (err,data)=>{
            next();
        });
});
//routes

app.get('/api/users',(req,res)=>{
    return res.json(users);
});

app.get('/users',(req,res)=>{
    const html=`
        <ul>
            ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    return res.send(html);
}); 

app
.route('/users/:id')
    .get((req,res)=>{
        const id= Number(req.params.id);
        const user= users.find((user)=>user.id===id);
        return res.json(user);
    })
    .patch((req,res)=>{
        return res.json({status: "pending"});
    })
    .delete((req,res)=>{
        return res.json({status:pending});
    });


app.post('/api/users',(req,res)=>{
    const body=req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err, data)=>{
        return res.json({status:"success", id: users.length});
    });
    
});

app.listen(port, ()=> console.log('server started at port: ${port}'));