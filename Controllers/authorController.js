const Author = require('../models/author')
const Book = require("../models/book");
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator"); // validator and sanitizer

//display list of all authors
exports.author_list = asyncHandler(async (req, res, next) => {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  
    // Log the authors to the consol
  
    res.render("author_list", {
      title: "Author List",
      author_list: allAuthors,
    });
  });
// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
    const[author , allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({author : req.params.id} ,"title summary").exec()
    ])
    if(author == null)
    {
        // no results
        const err = new Error("Author Not found")
        err.status = 404
        return next(err)
    }
    res.render("author_detail" , {
        title : "Author Detail",
        author : author,
        author_books : allBooksByAuthor
    })
  });
// Display detail page for a specific Author.
exports.author_create_get = asyncHandler(async (req,res,next)=>
{
    res.send(`NOT IMPLEMENTED : Auhtor detail : ${req.params.id}`)
})

//display author create form on GET
exports.author_create_get = asyncHandler(async (req,res,next)=>
{
    res.send("NOT IMPLEMENTED : Author create get")
})

// Handle Author create on POST.
exports.author_create_post = asyncHandler(async (req,res,next)=>
{
    res.send("NOT IMPLEMENTED: Author create POST");
})

//Display Author delete from GET
exports.author_delete_get = asyncHandler(async (req,res,next)=>
{
    res.send(`NOT IMPLEMENTED: Author delete get`)
})
// handle Author delete on post
exports.author_delete_post = asyncHandler(async (req,res,next)=>
{
    res.send(`NOT IMPLEMENTED: Author delete post`)
})

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req,res,next)=>
{
    res.send(`NOT IMPLEMENTED: Author update get`)
})

// handle Author update on post.
exports.author_update_post = asyncHandler(async (req,res,next)=>
{
    res.send(`NOT IMPLEMENTED: Author update post`)
})