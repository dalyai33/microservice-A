//require filesystem 
const fs = require('fs')


//Start the commandString
let commandString = "run\n"

//Initalize how many accounts there are 
let numAccounts = "4\n"

//add it to command string
commandString+=numAccounts

//Initalize who payed in binary 
let whoPayed = "1000\n"

//add it to command string
commandString+=whoPayed

//initiailize who is paying
let whoIsPaying = "1111\n"

//add it to the command string
commandString+=whoIsPaying

//initialize total cost
let totalCost = "20\n"

//add it to command string
commandString+=totalCost

//initialize the balances
let balance1 = "0\n"
let balance2 = "0\n"
let balance3 = "0\n"
let balance4 = "0"

//add them all to the command string
commandString+=balance1
commandString+=balance2
commandString+=balance3
commandString+=balance4


 //Write the command to the file
 fs.writeFile("microserviceA.txt", commandString, function(err){
    if(err){
        console.error("error clearing file")
    }

    
    
    
})



//Watch for changes in the receive file
 fs.watchFile("microserviceA.txt", (curr, prev)=>{
    
    //Read the file
    fs.readFile("microserviceA.txt", 'utf-8', function(err,data){
        //Check for error
        if(err){
            console.error("Could not open file: %s ", "microserviceA.txt")
            return;
        }

        if(data.trim()=== commandString){
            //Request the service to return the data to teh file
            fs.writeFile("microserviceA.txt", "return", function(err){
                if(err){
                    console.error("Could not process recieve command");
                }
            })
        }

        //only proceed if the data is non empty or doesnt contain return
        if(data.trim() !== "" && data.trim() !== "return" && data.trim()!==commandString){
            //Parse the data lines from the file
            const lines = data.split('\n').map(line=>line.trim())

            //print the new balances
            console.log("Account 1 balance: "+lines[0])
            console.log("Account 2 balance: "+lines[1])
            console.log("Account 3 balance: "+lines[2])
            console.log("Account 4 balance: "+lines[3])

            // //Stop watching after the data is processed
            // fs.unwatreceivePathchFile()

        }

        

       
       
    })
})