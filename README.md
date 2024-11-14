1) To request data from the microservice, the calling program will have to write a "run" command to a receive.txt file. The format of the command will be the command, which is "run", then the arugments on the next lines. There will be 4+x lines of arguments, where x is the total number of acounts in a group. The first argument line will be the toal amount of acounts in the group in decimal form. The second will be a binary number of size x where the leftmost bit is the 1st acount and the rightmost bit is the xth account. Whichever bit is 1 here, will be the user/acount who the other acounts owe for the bill. The thrid will follow the same format, but the bits with value 1 will be those who owe the person who payed for the intial bill. The fourth will be the cost of the bill in decimal form. Finally, the remaining arugments are the current outstanding balance of each of the x account(s).

Below is an example call from recieve.txt:\

run\
4\
1000\
1111\
20\
0\
0\
0\
0\

2) To receive data in your program from this microservice, your program will have to write "return" command into the return.txt file. this call will notify the microservice to write the outstanding balance of each acount each on their own line in the same file.

here is an example recieve call in return.txt:\
return

then the microservice will replace that with the output(using the same example request from above):\

-15\
5\
5\
5\


3) UML sequence diagram: ![image](https://github.com/user-attachments/assets/b8f19356-9cb7-4070-a1ca-85f311fe4910)

