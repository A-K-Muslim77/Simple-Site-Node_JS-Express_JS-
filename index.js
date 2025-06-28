const express = require('express')
const path = require('path')
const port = 5000
const app =express()

const fs = require('fs'); // Added for file logging


//  Logging middleware
app.use((req, res, next) => {
  const start = new Date();

  // When response finishes, log details
  res.on('finish', () => {
    const timestamp = start.toLocaleString();
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const ip = req.ip || req.connection.remoteAddress;

    const logEntry = `[${timestamp}] ${ip} ${method} ${url} ${status}\n`;

    fs.appendFile(path.join(__dirname, 'log.txt'), logEntry, (err) => {
      if (err) {
        console.error('Failed to write log:', err);
      }
    });
  });

  next();
});







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