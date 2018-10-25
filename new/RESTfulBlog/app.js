var bodyParser = require("body-parser"),
methodOverride = require('method-override'),
expressSanitizer = require('express-sanitizer'),
mongoose       = require("mongoose"),
express        = require('express'),
app            = express();

mongoose.connect("mongodb://localhost:27017/aa");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

 
// Mount express-sanitizer here
app.use(expressSanitizer()); // this line follows bodyParser() instantiations
 
app.use(methodOverride('_method'));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTES
app.get("/", function(req,res){
    res.redirect("/blogs");
});

//INDEX ROUTES
app.get("/blogs",function(req,res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.find({},function(err,blogs){
        if(err){
            console.log("ERR");
        }else{
            res.render("index",{blogs: blogs});
        }
    });
});
//NEW ROUTES
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//CREATE ROUTES
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    })
    //
});

//SHOW ROUTES
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTES
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog: foundBlog});
        }
    })
});

//UPDATE ROUTES
app.put("/blogs/:id", function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});

//DELETE ROUTES
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs/");
        }else{
            res.redirect("/blogs/");
        }
    });
});


app.listen(1337, "127.0.0.1", function(){
    console.log("SERVER IS RUNNING!");

});