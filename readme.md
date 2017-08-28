This is simple html based invoice.

A simple rest based Node JS is created using Express framework

Installation steps are mentioned below

## Installation
1. git clone git@github.com:psoumyap/DevInvoice.git
2. cd DevInvoice
3. Install mysql database
4. Change the mysql password by 
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
4. Create a database like below
   create database invoice;
5. USE invoice
   
  
  cd to the above directory

    cd DevInvoice



    npm install

## Configuration (database)
server.js

        host: 'localhost',
        user: 'root',
        password : 'mysql',
        port : 8080, //port mysql
        database:'invoice'	

	
You have to create a database named 'invoice'

## Open your Browser
And type: localhost:8080/api/user
