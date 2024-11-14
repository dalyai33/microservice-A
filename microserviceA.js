//require filesystem 
const fs = require('fs')


//Retrieve amount of accounts
let numAccounts 


//Retrieve who is paying
let whoPayed 

//Retrieve who payed for the item
let whoIsPaying 

//Retrieve cost of bill
let totalCost 

//calculate amount owed
let amountOwed

//get the remaining lines
let remainingLines 

//Watch for changes in the receive file
fs.watchFile("microserviceA.txt", (curr, prev)=>{

    
    
    //Read the file
    fs.readFile("microserviceA.txt", 'utf-8', function(err,data){
        //Check for error
        if(err){
            console.error("Could not open file: %s ", "microserviceA.txt")
            return;
        }


         //Parse the data lines from the file
         const lines = data.split('\n').map(line=>line.trim())


         //Check if a command has been put in
         if(lines[0] === "run"){

             //Retrieve amount of accounts
              numAccounts = parseInt(lines[1])


             //Retrieve who is paying
              whoPayed = lines[2]

             //Retrieve who payed for the item
              whoIsPaying = lines[3]

             //Retrieve cost of bill
              totalCost = parseFloat(lines[4])

             //calculate amount owed
              amountOwed = totalCost/numAccounts

           

            //get the remaining lines
            remainingLines = lines.slice(5)
         }
        if(lines[0] === "return"){
             //Read the return path to check for a return
             fs.readFile("microserviceA.txt", 'utf-8', function(err,data){

                console.log(amountOwed)
                //If a return request is put in
                if(data.trim() === "return"){
                     //Clear the return file
                    fs.writeFile("microserviceA.txt", "", function(err){
                        if(err){
                            console.error("error clearing file")
                        }

                        //initialize outputcontent
                        let outputContent = "";
                        
                        //Iterate through each account line
                        for(let i = 0; i < numAccounts; i++){
                            //credit statement for an account initialize to current balance
                            let accountCredit = parseInt(remainingLines[i]);
    
    
                            //The current account is to pay the bill
                            if(whoIsPaying[i] === '1'){
    
                                //add the amount owed to the credit
                                accountCredit += amountOwed
                            }
    
                            //The current account payed the bill
                            if(whoPayed[i] === '1'){
                                //subtract the total from the credit
                                accountCredit -= totalCost
                            }
    
                            //Add line to the output
                            outputContent += accountCredit.toString() + '\n'
    
                            
    
                        
                        }

                        //write the output to the file
                         fs.writeFile("microserviceA.txt", outputContent, function(err){
                            if(err){
                                console.error("Could not write file: %s", "microserviceA.txt")
                            }
                        })
                    
                    })
                }
    
               
            })
        }

        

        
        

    })
})