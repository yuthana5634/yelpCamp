var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b014429df2c47da4efb2_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b014429df2c47da4efb2_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b014429df2c47da4efb2_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b014429df2c47da4efb2_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_340.jpg"}
];

app.get("/",function(req, res){
    res.render("landding");
});



app.get("/campgrounds",function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //res.send("YOU HIT THE POST ROUTE!");
    //get data from form and add to campground array
    //redirect back to camgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.listen(1337, "127.0.0.1", function(){
    console.log("The TelpCamp Server Has Started!");
});