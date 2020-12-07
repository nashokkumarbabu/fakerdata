const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const entitySchema = new Schema({
name: {
  type: String,
  required: true
 },
data: [Schema.Types.Mixed]
}, {strict: false});
const Entity = mongoose.model("Entity", entitySchema);
module.exports = Entity;