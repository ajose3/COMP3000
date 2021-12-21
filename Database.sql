/* CREATE TABLE STATEMENTS */

CREATE TABLE Cars(
RegPlate VARCHAR(7) PRIMARY KEY NOT NULL,
CarBrand VARCHAR(250) NOT NULL,
CarModel VARCHAR(250) NOT NULL,
ImageUrl TEXT,
Category VARCHAR(50) NOT NULL,
Price MONEY NOT NULL,
LocationOfCar VARCHAR(50) NOT NULL,
Transmission VARCHAR(50) NOT NULL,
NumOfPassengers INT NOT NULL
);


CREATE TABLE Customer(
CustomerID int IDENTITY(1,1) PRIMARY KEY,
FirstName VARCHAR(50) NOT NULL,
LastName VARCHAR(50) NOT NULL,
Age INT NOT NULL CHECK (Age>=18),
DrivingLicenseNumber VARCHAR(50) NOT NULL,
Address TEXT,
PhoneNumber VARCHAR(11),
EmailAddress VARCHAR(320) NOT NULL,
Password VARCHAR(50) NOT NULL CHECK (DATALENGTH(Password) > 5),
Admin BIT DEFAULT 0 NOT NULL
);


CREATE TABLE Sessions(
Session_ID int IDENTITY(1,1) PRIMARY KEY,
CustomerID int NOT NULL,
Token VARCHAR(50) NOT NULL,
ExpiryTime DATETIME NOT NULL,
FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
ON DELETE CASCADE
);


CREATE TABLE Renting(
RentingID INT IDENTITY(1,1) PRIMARY KEY,
RegPlate VARCHAR(7) NOT NULL,
CustomerID INT NOT NULL,
StartDate DATE NOT NULL,
EndDate DATE NOT NULL,
FOREIGN KEY (RegPlate) REFERENCES Cars(RegPlate),
FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
ON DELETE CASCADE
);
