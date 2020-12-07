const jsonata = require("jsonata");
const mongoose = require("mongoose");
const jsf = require('json-schema-faker');
const getFakeSchema = async (entityDoc) => {
    console.log(entityDoc+" :: entityDoc");
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
        console.log(sample);
        return sample;
      });
};


module.exports = {
  getFakeSchema
};
