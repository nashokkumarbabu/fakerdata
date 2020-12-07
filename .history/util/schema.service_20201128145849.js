const jsonata = require("jsonata");
const mongoose = require("mongoose");
const Entity = mongoose.model("Entity");

const getFakeSchema = (entityDoc) => {
    const schema = {
        type: "object",
    
        properties: {
          id: {
            $ref: "#/definitions/positiveInt",
          },
          name: {
            type: "string",
            faker: "name.findName",
          },
          email: {
            type: "string",
            format: "email",
            faker: "internet.email",
          },
        },
        required: ["id", "name", "email"],
    
        definitions: {
          positiveInt: {
            type: "integer",
            minimum: 0,
            exclusiveMinimum: true,
          },
        },
      };
      jsf.resolve(schema).then((sample) => {
        doc.data = sample;
        
      });
};


module.exports = {
  getFakeSchema
};
