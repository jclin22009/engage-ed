const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

app.get("/",function(req,res){
    res.render("Home");
})

app.get("/editor",function(req,res){
    res.render("Editor");
})

app.get("/browse",function(req,res){
    var lessons = path.join(__dirname, 'lessons');

    var filenames = fs.readdirSync(lessons);
    var filenamesNoExt = []

    function removeExt(file) {
      filenamesNoExt.push(path.parse(file).name);
    }

    filenames.forEach(removeExt);

    res.render("Browse", {data: filenamesNoExt});

    /*fs.readdir(lessons, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    res.render("Browse", {data: files});
    });*/
})

app.get("/viewcourse",function(req,res){
    var lessonTitle = req.cookies['lesson'];
    res.render("Boilerplate", {data: lessonTitle});
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
