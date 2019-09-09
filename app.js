//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const homeStartingContent = "Test out this app by navigating through the pages. You can compose new blogs by hitting the compose link at the top and it'll automatically truncate up to 100 words of the blog on the homepage and create and automatic link that can go directly to the blog page";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const port = 3000;

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', (req, res) => {


  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/about', (req, res) => {
  res.render("about", {
    startingAbout: aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    startingContact: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  
  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);
    storedTitle === requestedTitle ? 
    res.render("post", {
      title: post.title,
      content: post.content
    }) 
    : console.log("It's not a match :(");
  });
});




app.listen(process.env.PORT || port, function () {
  console.log(`Server started on port ${process.env.PORT || port}`);
});