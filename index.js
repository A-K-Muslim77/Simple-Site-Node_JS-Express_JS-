const express = require('express')
const path = require('path')
const port = 5000
const app =express()


app.use(express.static(path.join(__dirname,"public")))


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","home.html"))
})

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","about.html"))
})


app.get("/team",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","team.html"))
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(port,()=>{
    console.log("Server is running at ",port);
    
})