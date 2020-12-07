const jsonata = require("jsonata");
const mongoose = require("mongoose");
const jsf = require("json-schema-faker");
const getFakeSchema = async (entityDoc) => {


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

  return jsf.resolve(schema).then(function (data) {
      console.log(data);
      return data;
    //});
  });
  
};

module.exports = {
  getFakeSchema,
};
