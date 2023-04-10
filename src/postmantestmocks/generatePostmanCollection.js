const fs = require('fs');
var BreakException = {};
const postmanExampleTemplate = JSON.stringify(require('./postmanResponseTemplate.json'), null, 4);

fs.readFile("./graph-data.json", "utf8", (err, allGraphData) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
            const graphdata = JSON.parse(allGraphData);
            let postmanCollectionFile = require('./postman_collection.template.json');
            let postman_requests = require('./postman_collection.template.json');

            Object.keys(graphdata).forEach(key => {
                
                let value = graphdata[key];

                let postmanExample = postmanExampleTemplate.slice();

                let updatedPostmanExampleString = postmanExample.replace(/SEARCHTERM/g, key);
                
                updatedPostmanExampleString = updatedPostmanExampleString.replace(/URIENCODEDSRCHTERM/g, encodeURIComponent(key));

                let stringifiedGraphDataValue = JSON.stringify(value);
                
                let escapedStringifiedGraphDataValue = stringifiedGraphDataValue.replace(/"/g, '\\"')

                updatedPostmanExampleString = updatedPostmanExampleString.replace(/REPLACEBODY/g, escapedStringifiedGraphDataValue);
            
                let postmanResponse = JSON.parse(updatedPostmanExampleString);

                postmanCollectionFile.item[0].response.push(postmanResponse);
            });

            let finalCollection = JSON.stringify(postmanCollectionFile, null, 4);

            fs.writeFile('AgoloGraphDataMock.postman_collection.json', finalCollection, (err) => {
                if (err) {
                    throw err;
                }
            });
        } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });