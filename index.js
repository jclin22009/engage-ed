const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs");
const app = express()

// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")

// Serve CSS/other assets
app.use(express.static(__dirname));

// Parse lessons sent as HTML
app.use(bodyParser.text({
  type: "text/html"
}));

app.get("/",function(req,res){
    res.render("Home");
})

app.get("/editor",function(req,res){
    res.render("Editor");
})

app.get("/browse",function(req,res){
    var lessons = path.join(__dirname, 'lessons');

    fs.readdir(lessons, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    res.render("Browse", {data: files});

    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
    });
    });
})

app.get("/testcourse",function(req,res){
    res.render("Course");
})

app.get("/viewcourse",function(req,res){
    var lessonTitle = req.header("X-Lesson");
    res.render("Boilerplate", {data: lessonTitle});
})

app.post("/publish",function (req, res, next) {
    console.log("Received req");
    var lessonTitle = req.header("X-Title");
    console.log(lessonTitle);
    var body = req.body;
    fs.writeFile("lessons/" + lessonTitle + ".ejs", body, function(err) {
      if (err) {
        return console.error(err);
      }
    });
})

// Take any port number of your choice which
// is not taken by any other process
app.listen(8080,function(error) {
    if(error) throw error
        console.log("Server created Successfully on PORT 8080")
})
