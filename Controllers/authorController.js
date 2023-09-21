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
//display author create form on GET
exports.author_create_get =  (req,res,next)=>
{
    res.render("author_form" , {title: "Create Author"})
}

// Handle Author create on POST.

exports.author_create_post = [
      // Validate and sanitize fields.
    body("first_name")
    .trim()
    .isLength({min:1 , max : 100})
    .escape()
    .withMessage("First name Must be specified.")
    .isAlphanumeric()
    .withMessage("The first name has non-alphanumeric characters"),
    body("family_name")
    .trim()
    .isLength({min:1 , max : 100})
    .escape()
    .withMessage("family name Must be specified.")
    .isAlphanumeric()
    .withMessage("The family name has non-alphanumeric characters"),
    body("date_of_birth")
    .optional({values : "falsy"})
    .isISO8601()
    .toDate(),
    body("date_of_death")
    .optional({values : "falsy"})
    .isISO8601()
    .toDate(),
    
// Process request after validation and sanitization.   
asyncHandler(async (req,res,next)=>
{
    // Extract the validation errors from a request.
    const errors = validationResult(req)
   // Create Author object with escaped and trimmed data
    const author = new Author({
        first_name : req.body.first_name , 
        family_name : req.body.family_name,
        date_of_birth : req.body.date_of_birth,
        date_of_death : req.body.date_of_death,
    })
    if(!errors.isEmpty)
    {
       // There are errors. Render form again with sanitized values/errors messages.
       res.render("author_form",{
        title : "Create author", 
        author : author,
        errors : errors ,
    })
    return 
    }
    else
    {
    //Either to check if the author name already exist in the db or just have multiple authors
    // Data from form is valid.
    // Save author.
      await author.save();
      // Redirect to new author record.
      res.redirect(author.url);
    }
})]

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);
  
    if (author === null) {
      // No results.
      res.redirect("/catalog/authors");
    }
  
    res.render("author_delete", {
      title: "Delete Author",
      author : author,
      author_books : allBooksByAuthor
    });
  });
  
// handle Author delete on post
exports.author_delete_post = asyncHandler(async (req,res,next)=>
{
    const [author, allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({ author: req.params.id }, "title summary").exec(),
      ]);

    if(allBooksByAuthor > 0)
    {
        // Author has books. Render in same way as for GET route.
        res.render("author_delete" , {
            title : "Delete Author",
            author : author,
            author_books : allBooksByAuthor
        })
        return
    }
    await Author.findByIdAndRemove(req.body.authorid)
    res.redirect("/catalog/authors")
    
})

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req,res,next)=>
{
    const author = await Author.findById(req.params.id).exec()

    if(author === null)
    {
      const err = new Error ("Author not found")
      err.status = 404
      return next(err)
    }

    res.render("author_form" , {title : "Update Author" , author : author})
})

// handle Author update on post.
exports.author_update_post =
[
  body("first_name")
  .trim()
  .isLength({min:1 , max : 100})
  .escape()
  .withMessage("First name Must be specified.")
  .isAlphanumeric()
  .withMessage("The first name has non-alphanumeric characters"),
  body("family_name")
  .trim()
  .isLength({min:1 , max : 100})
  .escape()
  .withMessage("family name Must be specified.")
  .isAlphanumeric()
  .withMessage("The family name has non-alphanumeric characters"),
  body("date_of_birth")
  .optional({values : "falsy"})
  .isISO8601()
  .toDate(),
  body("date_of_death")
  .optional({values : "falsy"})
  .isISO8601()
  .toDate(),
asyncHandler(async (req,res,next)=>
{// Extract the validation errors from a request.
  const errors = validationResult(req)
  // Create Author object with escaped and trimmed data
   const author = new Author({
       first_name : req.body.first_name , 
       family_name : req.body.family_name,
       date_of_birth : req.body.date_of_birth,
       date_of_death : req.body.date_of_death,
       _id :req.params.id
   })
   if(!errors.isEmpty)
   {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form",{
       title : "update author", 
       author : author,
       errors : errors ,
   })
   return 
   }
   else
   {
    const updatedAuhtor = await Author.findByIdAndUpdate(req.params.id , author  )
    res.render(updatedAuhtor.url)
   }
})]