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
CustomerID int AUTO_INCREMENT PRIMARY KEY,
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
Session_ID int AUTO_INCREMENT PRIMARY KEY,
CustomerID int NOT NULL,
Token VARCHAR(50) NOT NULL,
ExpiryTime DATETIME NOT NULL,
FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
ON DELETE CASCADE
);


CREATE TABLE Renting(
RentingID INT AUTO_INCREMENT PRIMARY KEY,
RegPlate VARCHAR(7) NOT NULL,
CustomerID INT NOT NULL,
StartDate DATE NOT NULL,
EndDate DATE NOT NULL CHECK (EndDate >= StartDate),
FOREIGN KEY (RegPlate) REFERENCES Cars(RegPlate),
FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
ON DELETE CASCADE
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------

/* CREATE STORED PROCEDURES STATEMENTS */

--- Add Car ----

CREATE PROCEDURE AddCar
@Token VARCHAR(25),
@RegPlate VARCHAR(7),
@CarBrand VARCHAR(250),
@CarModel VARCHAR(250),
@ImageUrl TEXT,
@Category VARCHAR(50),
@Price MONEY,
@LocationOfCar VARCHAR(50),
@Transmission VARCHAR(50),
@NumOfPassengers INT,
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS(SELECT * FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
			BEGIN
				DECLARE @CustomerID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
				
				IF EXISTS(SELECT * FROM Customer WHERE CustomerID = @CustomerID AND Admin = 1)
					BEGIN
						IF EXISTS(SELECT * FROM Cars WHERE RegPlate = @RegPlate)
							BEGIN
								--car already exists
								SELECT @ResponseMessage = 409;
							END
						ELSE
							BEGIN
								INSERT INTO Cars
								(RegPlate, CarBrand, CarModel, ImageUrl, Category, Price, LocationOfCar, Transmission, NumOfPassengers)
								VALUES
								(@RegPlate, @CarBrand, @CarModel, @ImageUrl, @Category, @Price, @LocationOfCar, @Transmission, @NumOfPassengers)
								
								SELECT @ResponseMessage = 200;
							END
					END
				ELSE
					BEGIN
						--USER NOT ADMIN
						SELECT @ResponseMessage = 401;
					END
				
			END
		ELSE
			BEGIN
				--Not Logged in
				SELECT @ResponseMessage = 400;
			END
	IF @@ERROR != 0
		BEGIN
			SELECT @ResponseMessage = 500;
			ROLLBACK TRANSACTION
		END
	ELSE
		COMMIT TRANSACTION
END
;
