import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let blogPosts = [];

const createBlogObject = (req) => {
  //const regEx = /[`~@%^&*()|<>\{\}\[\]\\\/]/gi

  let blogPost  = req.body.blogPost;
  let firstName = req.body.fName;
  let lastName  = req.body.lName;

  // if (blogPost === "" || !blogPost) {
  //   console.log(`Post is empty`);
  //   errorObject = {
  //     errorCheck: true,
  //     errorLocation: 1,
  //     errorMessage: errorMessage[0]
  //   };
  //   blogPosts.push(errorObject);
  // } if (firstName === "" || !firstName) {
  //   console.log(`First Name is empty`);
  //   errorObject = {
  //     errorCheck: true,
  //     errorLocation: 2,
  //     errorMessage: errorMessage[1]
  //   };
  //   blogPosts.push(errorObject);
  // } if (lastName === "" || !lastName) {
  //   console.log(`Last Name is empty`)
  //   errorObject = {
  //     errorCheck: true,
  //     errorLocation: 3,
  //     errorMessage: errorMessage[2]
  //   }
  //   blogPosts.push(errorObject);
  // } else {
    console.log(`posting blog`)
    let blogP     = new Object();
    //blogP.index = blogPosts.length;
    blogP.post  = blogPost;
    blogP.fName = firstName;
    blogP.lName = lastName;
    blogP.time  = new Date().toLocaleString('en-US');
    //indexCount ++;
    blogPosts.push(blogP);

    // console.log(`blogP object =`,blogP);
    // console.log(`blogPosts array is`, blogPosts);
  }
  // console.log(`blogPosts array is`, blogPosts);
//}

const deleteItem = (req) => {
  let item = req.body.postId;
  let index = blogPosts.findIndex(post => post.time === item);
  blogPosts.splice(index, 1);
  console.log(`new blogPosts`, blogPosts);
};

const editItem = (req) => {
  let item = req.body.postId;
  let index = blogPosts.findIndex(post => post.time === item);
  // let itemToEdit = blogPosts.map(() => {

  // });
  //blogPosts.splice(index, 1);
  console.log(`item is ${item} and index is ${index}`);
};

const resetPage = () => {
  blogPosts = [];
};

app.get("/", (req, res) => {
  resetPage();
  console.log(`get /`);
  res.render("index.ejs");
});

app.post("/blog", (req, res) => {
  createBlogObject(req);
  console.log(`post /blog`);
  res.render("index.ejs", { data: blogPosts });
  console.log(`blogPosts is`, blogPosts);
});

app.post("/edit", (req, res) => {
  editItem(req);
  console.log(`post /edit`);
  res.render("edit.ejs", { data: blogPosts });
});

app.post("/delete", (req, res) => {
  deleteItem(req);
  console.log(`post /delete`);
  res.render("index.ejs", { data: blogPosts });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});