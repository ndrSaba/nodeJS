const fs = require('fs');

let data = "Testo per esercizio";

fs.writeFile("testo.txt", data, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync("testo.txt", "utf8"));
    }
  });