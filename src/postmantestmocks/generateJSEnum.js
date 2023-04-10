const fs = require('fs');

fs.readFile("./graph-data.json", "utf8", (err, allGraphData) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
            const graphdata = JSON.parse(allGraphData);

            let lazyStringGen = "[";

            Object.keys(graphdata).forEach(key => {
            
                lazyStringGen = lazyStringGen.concat("\n'");
                lazyStringGen = lazyStringGen.concat(encodeURIComponent(key))
                lazyStringGen = lazyStringGen.concat("', ");

            });

            
            lazyStringGen = lazyStringGen.concat("]");
            lazyStringGen = lazyStringGen.replace(", ]", "]");

            console.log(lazyStringGen);

        } catch (err) 
        {
            console.log("Error parsing JSON string:", err);
        }
    });