const Author = require('../models/author')
const asyncHandler = require('express-async-handler')

//display list of all authors
exports.author_list = asyncHandler(async (req,res,next)=>
{
    res.send("NOT IMPLEMENTED : Author list")
})
// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
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