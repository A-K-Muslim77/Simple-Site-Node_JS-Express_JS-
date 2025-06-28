const express = require('express')
const path = require('path')
const port = 5000
const app =express()

const fs = require('fs'); // Added for file logging
const rfs = require('rotating-file-stream'); // Rotating log support


//  Create logs directory if not exists
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Create a rotating stream (daily)
const accessLogStream = rfs.createStream((time, index) => {
    if (!time) return 'access.log';
    const day = time.toISOString().slice(0, 10); // e.g. "2025-06-28"
    return `${day}.log`;
}, {
    interval: '1d',      // rotate daily
    path: logDirectory
});

//  Logging middleware
app.use((req, res, next) => {
    const start = new Date();
    res.on('finish', () => {
        const log = {
            timestamp: start.toISOString(),
            ip: req.ip || req.connection.remoteAddress,
            method: req.method,
            url: req.url,
            status: res.statusCode
        };
        accessLogStream.write(JSON.stringify(log) + '\n');
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