CREATE DATABASE ShopnGo;
use ShopnGo;
CREATE TABLE users (
    User_ID int,
    User_Name varchar(255),
    User_Pass varchar(255),
    User_Token int,
    User_Email text,
    User_Address text 
);



use ShopnGo;
CREATE TABLE products (
    Prod_ID int,
    Prod_Name varchar(255),
	Prod_Price int,
    Prod_Qty int,
    Prod_Image text
);

ALTER TABLE products
ADD CONSTRAINT PRIMARY KEY(Prod_ID);

ALTER TABLE products
ADD CONSTRAINT NOT NULL(Prod_ID);

ALTER TABLE products
ADD CONSTRAINT UNIQUE(Prod_ID);