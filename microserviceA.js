//require filesystem 
const fs = require('fs')

//receive path 
const receivePath = 'receive.txt';

//return path
const returnPath = 'return.txt';

//Watch for changes in the receive file
let watcher = fs.watchFile(receivePath, (curr, prev)=>{
    
    //Read the file
    fs.readFile(receivePath, 'utf-8', function(err,data){
        //Check for error
        if(err){
            console.error("Could not open file: %s ", receivePath)
            return;
        }

        //Clear the return file
        fs.writeFile(returnPath, "", function(err){
            if(err){
                console.error("error clearing file")
            }
            
            //Parse the data lines from the file
            const lines = data.split('\n').map(line=>line.trim())


            //Check if a command has been put in
            if(lines[0] === "run"){

                //Retrieve amount of accounts
                let numAccounts = parseInt(lines[1])


                //Retrieve who is paying
                let whoPayed = lines[2]

                //Retrieve who payed for the item
                let whoIsPaying = lines[3]

                //Retrieve cost of bill
                let totalCost = parseFloat(lines[4])

                //calculate amount owed
                let amountOwed = totalCost/numAccounts

                //get the remaining lines
                const remainingLines = lines.slice(5)
                

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

                    //Add New line and convert to string
                    accountCredit = accountCredit.toString() + '\n'


                    //append to the file
                    fs.appendFile(returnPath, accountCredit, function(err){
                        if(err){
                            console.error("Could not write file: %s", returnPath)
                        }
                    })

                    

                
                }

            }
        })

    })
})