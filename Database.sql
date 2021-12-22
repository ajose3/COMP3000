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
EndDate DATE NOT NULL CHECK (EndDate >= StartDate),
FOREIGN KEY (RegPlate) REFERENCES Cars(RegPlate),
FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
ON DELETE CASCADE
);


/* CREATE STORED PROCEDURES STATEMENTS */

--------------------------------------------------------CARS------------------------------------------------------

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
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC AddCar @Token = 'FD-48BA-8080-EE76E5F9FAEC', @RegPlate = '12345', @CarBrand = 'Volvo', @CarModel = 'XC60', @ImageUrl = 'url goes here', @Category='SUV', @Price='10.11', @LocationOfCar = "Plymouth", @Transmission = 'Automatic', @NumOfPassengers = 5,  @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage'; 

---------

--- Delete Car ---

CREATE PROCEDURE DeleteCar
@Token VARCHAR(25),
@RegPlate VARCHAR(7),
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
			BEGIN
				DECLARE @ID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
				
				IF EXISTS (SELECT * FROM Customer WHERE CustomerID = @ID AND Admin = 1)
					BEGIN
						IF EXISTS(SELECT * FROM Cars WHERE RegPlate = @RegPlate)
							BEGIN					
								DELETE FROM Cars WHERE RegPlate = @RegPlate
								
								SELECT @ResponseMessage = 200;
							END
						ELSE
							BEGIN
							--car does not exist
								SELECT @ResponseMessage = 401;
							END
					END
				ELSE
					BEGIN
					--user not admin
						SELECT @ResponseMessage = 401;
					END
			END
		ELSE
			BEGIN
			--user not logged in
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
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC DeleteCar @Token = 'FD-48BA-8080-EE76E5F9FAEC', @RegPlate = '12345', @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage'; 

---------

--- Edit Car ---

CREATE PROCEDURE EditCar
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
		IF EXISTS (SELECT * FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
			BEGIN
				DECLARE @ID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
				
				IF EXISTS (SELECT * FROM Customer WHERE CustomerID = @ID AND Admin = 1)
					BEGIN
						IF EXISTS(SELECT * FROM Cars WHERE RegPlate = @RegPlate)
							BEGIN													
								UPDATE Cars
								SET CarBrand = @CarBrand, CarModel = @CarModel, ImageUrl = @ImageUrl, Category = @Category, Price = @Price, LocationOfCar = @LocationOfCar, NumOfPassengers = @NumOfPassengers
								WHERE RegPlate = @RegPlate;
								
								SELECT @ResponseMessage = 200;
							END
						ELSE
							BEGIN
							--car does not exist
								SELECT @ResponseMessage = 401;
							END
					END
				ELSE
					BEGIN
					--user not admin
						SELECT @ResponseMessage = 401;
					END
			END
		ELSE
			BEGIN
			--user not logged in
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
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC EditCar @Token = 'FD-48BA-8080-EE76E5F9FAEC', @RegPlate = '12345', @CarBrand = 'Volvo', @CarModel = 'XC60', @ImageUrl = 'url goes here', @Category='SUV', @Price='10.11', @LocationOfCar = "Plymouth", @Transmission = 'Automatic', @NumOfPassengers = 5,  @ResponseMessage = @Out OUTPUT;
SELECT @Out AS 'OutputMessage';

---------

--- Validate Customer ---

CREATE PROCEDURE ValidateCustomer
@Email VARCHAR(320),
@Password VARCHAR(50),
@Token VARCHAR(25) OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Customer WHERE EmailAddress = @Email AND Password = @Password)
			BEGIN
				DECLARE @CustomerID AS INT = (SELECT CustomerID FROM Customer WHERE EmailAddress = @Email AND Password = @Password);
				
				DECLARE @TheToken AS VARCHAR(50) = CONVERT(VARCHAR(30), RIGHT(NEWID(), 25));
				
				DECLARE @ExpiryTime AS DATETIME = (SELECT DATEADD(hour, 1, CURRENT_TIMESTAMP) AS DateAdd);

				Insert INTO Sessions (CustomerID, Token, ExpiryTime) VALUES (@CustomerID, @TheToken, @ExpiryTime);
				
				SELECT @Token = @TheToken;
			
			END
		ELSE
			BEGIN
				SELECT @Token = 208;
			END
		
		IF @@ERROR != 0
			BEGIN
				SELECT @Token = 500;
				ROLLBACK TRANSACTION
			END
		ELSE
			COMMIT TRANSACTION
END
Go

--- how to run ----

DECLARE @Out as VARCHAR(25)
exec ValidateCustomer @Email = 'email', @Password = 'password', @Token = @Out OUTPUT;
SELECT @OUT AS 'Outmessage';

---------

--- Register Customer ---

CREATE PROCEDURE RegisterCustomer
@FirstName VARCHAR(50), 
@LastName VARCHAR(50),
@Age INT,
@DrivingLicenseNumber VARCHAR(50),
@Address TEXT,
@PhoneNumber VARCHAR(11),
@EmailAddress VARCHAR(320),
@Password VARCHAR(50),
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Customer WHERE EmailAddress = @EmailAddress)
			BEGIN
			--an account with this email already exists
				SELECT @ResponseMessage = 208;
			END
		ELSE
			BEGIN
				INSERT INTO Customer
				(FirstName, LastName, Age, DrivingLicenseNumber, Address, PhoneNumber, EmailAddress, Password)
				VALUES
				(@FirstName, @LastName, @Age, @DrivingLicenseNumber, @Address, @PhoneNumber, @EmailAddress, @Password);
				SELECT @ResponseMessage = 200;
			END
		IF @@ERROR != 0
			BEGIN
				SELECT @ResponseMessage = 500;
				ROLLBACK TRANSACTION
			END
		ELSE
			COMMIT TRANSACTION

END
GO

--- how to run ----

DECLARE @Out as INT
exec RegisterCustomer @FirstName = 'bob', @LastName = 'bobby', @Age = 18, @DrivingLicenseNumber = 'ABCD1234', @Address = 'address goes here', @PhoneNumber = '07932153300', @EmailAddress = 'email6', @Password = 'password', @ResponseMessage = @Out OUTPUT;
SELECT @OUT AS 'Outputmessage';

---------

--- Edit Customer ---

CREATE PROCEDURE EditCustomer
@Token VARCHAR(25),
@FirstName VARCHAR(50), 
@LastName VARCHAR(50),
@Age INT,
@DrivingLicenseNumber VARCHAR(50),
@Address TEXT,
@PhoneNumber VARCHAR(11),
@EmailAddress VARCHAR(320),
@ResponseMessage INT OUTPUT
AS
BEGIN
	IF EXISTS (SELECT CustomerID FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
		BEGIN
			Declare @CustomerID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
			IF EXISTS(SELECT * FROM Customer WHERE (CustomerID != @CustomerID AND EmailAddress = @EmailAddress))
				BEGIN
				--an account with this email already exists
					SELECT @ResponseMessage = 208;
				END
			ELSE
				BEGIN
					UPDATE Customer SET FirstName = @FirstName, LastName = @LastName, Age = @Age, DrivingLicenseNumber = @DrivingLicenseNumber, Address = @Address, PhoneNumber = @PhoneNumber, EmailAddress = @EmailAddress WHERE CustomerID = @CustomerID AND Admin = 0;
					SELECT @ResponseMessage = 200;
				END
		END
	ELSE
		BEGIN
		--customer not logged in
			SELECT @ResponseMessage = 400;
		END
END
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC EditCustomer @Token = '8E-433D-BCB4-A596E369001C', @FirstName = 'This has', @LastName = 'been changed', @Age = 19, @DrivingLicenseNumber = 'FEDAE1234', @Address = 'address goes here', @PhoneNumber = '01454234',  @EmailAddress = 'email501', @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage'; 

---------

--- Customer Change Password ---

CREATE PROCEDURE ChangePassword
@Token VARCHAR(25),
@NewPassword VARCHAR(50),
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS(SELECT CustomerID FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
			BEGIN
				Declare @CustomerID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
				IF EXISTS(SELECT * FROM Customer WHERE CustomerID = @CustomerID AND Admin = 0)
					BEGIN
						UPDATE Customer SET Password = @NewPassword WHERE CustomerID = @CustomerID AND Admin = 0;

						SELECT @ResponseMessage = 200;
					END
				ELSE
					BEGIN
						--customer does not exist
						SELECT @ResponseMessage = 401;
					END
			END
		ELSE
			BEGIN
			--user not logged in
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
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC ChangePassword @Token = 'FD-48BA-8080-EE76E5F9FAEC', @NewPassword = 'password', @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage';

---------

--- Delete Customer ---

CREATE PROCEDURE DeleteCustomer
@Token VARCHAR(25),
@ResponseMessage INT OUTPUT
AS
BEGIN
	IF EXISTS (SELECT CustomerID FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
		BEGIN
			Declare @CustomerID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
			IF EXISTS(SELECT * FROM Customer WHERE CustomerID = @CustomerID AND Admin = 0)
				BEGIN
					Delete customer WHERE CustomerID = @CustomerID AND Admin = 0;
					SELECT @ResponseMessage = 200;
				END
			ELSE
				BEGIN
					--customer does not exist or is an admin
					SELECT @ResponseMessage = 401;
				END
		END
	ELSE
		BEGIN
			--not logged in
			SELECT @ResponseMessage = 402 ;
		END
END
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC DeleteCustomer @Token = 'FD-48BA-8080-EE76E5F9FAEC', @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage';

---------

--- Get Renting ---

CREATE PROCEDURE GetRenting
@Token VARCHAR(25),
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
			BEGIN
				DECLARE @CustomerID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
				
				SELECT * FROM Renting INNER JOIN Cars ON Renting.RegPlate = Cars.RegPlate WHERE CustomerID = @CustomerID
				
				SELECT @ResponseMessage = 200;
			END
		ELSE
			BEGIN
				SELECT @ResponseMessage = 401;
			END
			
	IF @@ERROR != 0
		BEGIN
			SELECT @ResponseMessage = 500;
			ROLLBACK TRANSACTION
		END
	ELSE
		COMMIT TRANSACTION
END
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC GetRenting @Token = 'FD-48BA-8080-EE76E5F9FAEC', @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage';

---------

--- Add Renting ---

CREATE PROCEDURE AddRenting
@Token VARCHAR(25),
@RegPlate VARCHAR(7),
@StartDate DATE,
@EndDate DATE,
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
			BEGIN
				DECLARE @CustomerID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token);
				
				INSERT INTO Renting
				(RegPlate, CustomerID, StartDate, EndDate)
				VALUES
				(@RegPlate, @CustomerID, @StartDate, @EndDate);
				
				SELECT @ResponseMessage = 200;
			END
		ELSE
			BEGIN
				SELECT @ResponseMessage = 401;
			END
			
	IF @@ERROR != 0
		BEGIN
			SELECT @ResponseMessage = 500;
			ROLLBACK TRANSACTION
		END
	ELSE
		COMMIT TRANSACTION
END
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC AddRenting @Token = 'FD-48BA-8080-EE76E5F9FAEC', @RegPlate = '12345', @StartDate = 2021-03-21, @EndDate = 2021-04-21, @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage';

---------

--- Cancel Renting ---

CREATE PROCEDURE CancelRenting
@Token VARCHAR(25),
@RentingID INT,
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS(SELECT * FROM Sessions WHERE Token = @Token AND CURRENT_TIMESTAMP <= ExpiryTime)
			BEGIN
				DECLARE @CustomerID AS INT = (SELECT CustomerID FROM Sessions WHERE Token = @Token)
				
				IF EXISTS(SELECT * FROM Renting WHERE RentingID = @RentingID AND CustomerID = @CustomerID)
					BEGIN
                            BEGIN
                                DELETE FROM Renting WHERE RentingID = @RentingID AND CustomerID = @CustomerID
                            END
						
						SELECT @ResponseMessage = 200;
					END
				ELSE
					BEGIN
					--order does not exist
						SELECT @ResponseMessage = 401;
					END
			END
		ELSE
			BEGIN
			--user not logged in
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
GO

--- how to run ----

DECLARE @Out as INT; 
EXEC CancelOrder @Token = 'D1-46D3-953F-D28AD246A235', @RentingID = 1, @ResponseMessage = @Out OUTPUT; 
SELECT @Out AS 'OutputMessage'; 

---------
