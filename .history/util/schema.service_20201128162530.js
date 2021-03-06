const jsonata = require("jsonata");
const mongoose = require("mongoose");
const jsf = require('json-schema-faker');
const getFakeSchema = async (entityDoc) => {
    
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
    // let enititySchemaExpression = jsonata("$data").evaluate('{"data":null,"_id":"5fc22659fd555c4c827c0f9b","versions":[{"version":1,"schema":[{"field":"firstName","description":"","label":"Name","typebindings":[{"dataType":"string","language":"default"},{"dataType":"name.findName","language":"FAKER"}]},{"field":"lastName","description":"","label":"Name","typebindings":[{"dataType":"string","language":"default"},{"dataType":"name.findName","language":"FAKER"}]}]}],"name":"user","description":"User schema","__v":0}');
    jsonata("*.versions.schema.[field]").evaluate(entityDoc, {}, (error, result) => {
        if(error) {
          console.error(error);
          return;
        }
        console.log("Finished with", result);
      });
    //console.log(JSON.parse(entityDoc)+" :: entityDoc");
     //onsole.log(enititySchemaExpression);
     //return jsf.resolve(entitySchema);
};


module.exports = {
  getFakeSchema
};
