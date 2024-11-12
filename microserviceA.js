//require filesystem 
const fs = require('fs')

//receive path 
const receivePath = 'receive.txt';

//return path
const returnPath = 'return.txt';

fs.readFile(receivePath, 'utf-8', function(err,data){
    if(err){
        console.error("Could not open file: %s ")
        return;
    }
    fs.writeFile(returnPath, "Test shiz", function(err){
        if(err){
            console.err("Could not write file: %s")
        }
    })
})