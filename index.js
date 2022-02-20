const express = require("express")
const path = require("path")
const multer = require("multer")
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

// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, "lessons")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+".ejs")
    }
  })

// Define the maximum size for uploading
const maxSize = 10 * 1000 * 1000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){

        // Set the filetypes, it is optional
        var filetypes = /html|json/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      }

// mypic is the name of file attribute
}).single("mypic");

app.get("/",function(req,res){
    res.render("Home");
})

app.get("/editor",function(req,res){
    res.render("Editor");
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

    //console.log(req.header("X-Title"));
    //console.log(req.body);
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {

        if(err) {

            // ERROR occured (here it can be occured due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)
        }
        else {

            // SUCCESS, image successfully uploaded
            res.send("Success!")
        }
    })
})

// Take any port number of your choice which
// is not taken by any other process
app.listen(8080,function(error) {
    if(error) throw error
        console.log("Server created Successfully on PORT 8080")
})
