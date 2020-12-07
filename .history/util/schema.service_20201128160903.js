const jsonata = require("jsonata");
const mongoose = require("mongoose");
const jsf = require('json-schema-faker');
const getFakeSchema = async (entityDoc) => {
    console.log(JSON.stringify(entityDoc)+" :: entityDoc");
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
    //  let enititySchemaExpression = jsonata("$.versions[version=1].schema.{ 'type': 'object','properties':  {`field`:{'type' :typebindings[language='default'].dataType,'faker' :typebindings[language='FAKER'].dataType} }}");
    let enititySchemaExpression = jsonata("*.schema").evaluate(entityDoc);
    console.log(enititySchemaExpression);
     let entitySchema = enititySchemaExpression;
     console.log(entitySchema);
     //return jsf.resolve(entitySchema);
};


module.exports = {
  getFakeSchema
};
