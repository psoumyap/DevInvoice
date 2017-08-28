This is simple html based invoice.

A simple rest based Node JS is created using Express framework

Installation steps are mentioned below

## Installation
1. git clone git@github.com:psoumyap/DevInvoice.git
2. cd DevInvoice and run npm install.
3. Install mysql database.
4. In another terminal, change the mysql password by 
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysql';
   
   Configuration would look like below.
   
        host: 'localhost',
        user: 'root',
        password : 'mysql',
        port : 8080, //port mysql
        database:'invoice'
	
5. Create a database like below

   'create database invoice';
   
6. Use the database just created by 
     'USE invoice';
     
7. Copy the scripts from t_user.sql and run it in mysql.
   Now you have tables created.
   
 ## Execution
   
1. In the terminal run 'Node Server.js'.
2. Hit the browser with url localhost:8080/api/user.
3. Enter the data in the form and click on save.
4. Open the terminal with mysql command prompt and verify that data is inserted in below tables
    t_user and t_lineitems.



   
  
