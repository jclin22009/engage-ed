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

app.get("/lessons",function(req,res){
    res.render("Lessons");
})

app.get("/test",function(req,res){
    res.render("Upload");
})

app.post("/publish",function (req, res, next) {
    var lessonTitle = req.header("X-Title");
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
