const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const personSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  public: { // public key
    type: String, // Array of numbers
  },
  private: { // end coords
    type: String, // Array of numbers
  },
  picture: {
    type: String,
    required: true
  },
});

// Custom validation function to ensure only two numbers are in the array


module.exports = mongoose.model("Person", personSchema);
