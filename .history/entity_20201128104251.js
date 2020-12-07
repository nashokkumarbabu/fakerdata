const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const entitySchema = new Schema({
name: {
  type: String,
  required: true
 },
data: {
  type: String,
  required: true
 }
}, {strict: false});
const Entity = mongoose.model("Entity", entitySchema);
module.exports = Entity;