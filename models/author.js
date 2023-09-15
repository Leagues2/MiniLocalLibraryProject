const mongoose = require("mongoose")
const{DateTime} = require("luxon")
const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    first_name : {type: String , required : true , maxLength : 100},
    family_name:  {type: String , required : true , maxLength : 100} , 
    date_of_birth : {type:Date} ,
    date_of_death : {type:Date},

})

// Virtual for Author's Full name

AuthorSchema.virtual("date_of_birth_formatted").get(function() {
  if (this.date_of_birth == null) {
    return ""; // Return an empty string if date_of_death is null or undefined
  }

  const date = DateTime.fromJSDate(this.date_of_birth);

  // Get the day, month, and year components
  const day = date.day;
  const month = date.toFormat('LLL'); // Format the month as a short name, e.g., "Oct"
  const year = date.year;
  
  let daySuffix = '';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }

  return `${month} ${day}${daySuffix}, ${year}`;
});



AuthorSchema.virtual("date_of_death_formatted").get(function() {
  if (this.date_of_death == null) {
    return ""; // Return an empty string if date_of_death is null or undefined
  }

  const date = DateTime.fromJSDate(this.date_of_death);

  // Get the day, month, and year components
  const day = date.day;
  const month = date.toFormat('LLL'); // Format the month as a short name, e.g., "Oct"
  const year = date.year;
  
  let daySuffix = '';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }

  return `${month} ${day}${daySuffix}, ${year}`;
});


AuthorSchema.virtual("url").get(function(){
    // We don't use an arrow function as we'll need the this object
    return `/catalog/author/${this._id}`
})

module.exports = mongoose.model("Author" , AuthorSchema)