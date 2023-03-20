use sql12607094;
CREATE TABLE users (
    User_ID int,
    User_Name varchar(255),
    User_Pass varchar(255),
    User_Token int,
    User_Email text,
    User_Address text 
);



use sql12607094;
CREATE TABLE products (
    Prod_ID int PRIMARY KEY,
    Prod_Name varchar(255),
	Prod_Price int,
    Prod_Qty int,
    Prod_Image text
);