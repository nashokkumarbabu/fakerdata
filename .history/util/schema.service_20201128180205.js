const jsonata = require("jsonata");
const mongoose = require("mongoose");
const jsf = require("json-schema-faker");
const getFakeSchema = async (entityDoc) => {
//   const schema = {
//     type: "object",

//     properties: {
//       id: {
//         $ref: "#/definitions/positiveInt",
//       },
//       name: {
//         type: "string",
//         faker: "name.findName",
//       },
//       email: {
//         type: "string",
//         format: "email",
//         faker: "internet.email",
//       },
//     },
//     required: ["id", "name", "email"],

//     definitions: {
//       positiveInt: {
//         type: "integer",
//         minimum: 0,
//         exclusiveMinimum: true,
//       },
//     },
//   };

entityDoc = entityDoc._doc;
  let schema = {};
  schema.properties = {};
  schema.required= [];
  schema.type = "object";
  let entityVersion = entityDoc.versions.filter((entityVersion) => {
    
    return (entityVersion.version = 1);
  });

  let properties = entityVersion[0].schema.forEach((fieldSchema) => {
    let defaultTypebinding = fieldSchema.typebindings.filter((typebinding) => {
      return (typebinding.language == "default");
    });
    let fakerTypebinding = fieldSchema.typebindings.filter((typebinding) => {
      return (typebinding.language == "FAKER");
    });

    schema.properties[fieldSchema.field] ={};
    schema.required.push(fieldSchema.field+'');
    schema.properties[fieldSchema.field].type = defaultTypebinding[0].dataType;
    schema.properties[fieldSchema.field].faker = fakerTypebinding[0].dataType;
       
      
  });
  //schema.properties = properties;
  schema.required = [];
  console.log(JSON.stringify(schema));

    jsf.resolve(schema).then(function (data) {
      console.log(data);
      return data;
    //});
  });
  
};

module.exports = {
  getFakeSchema,
};
