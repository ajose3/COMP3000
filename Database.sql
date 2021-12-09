/* CREATE TABLE STATEMENTS */

/*Create Course table*/
CREATE TABLE Course(
CourseID int IDENTITY(1,1) PRIMARY KEY,
CourseName VARCHAR(250) NOT NULL,
CourseDescription TEXT
);

/*Create Student table*/
CREATE TABLE Student(
StudentID int IDENTITY(1,1) PRIMARY KEY,
FirstName VARCHAR(50) NOT NULL,
LastName VARCHAR(50) NOT NULL,
FaceIMG VARBINARY(MAX) NOT NULL,
EmailAddress VARCHAR(320) NOT NULL,
Program VARCHAR(250) NOT NULL
);

/*Create Lecturer table*/
CREATE TABLE Lecturer(
LecturerID int IDENTITY(1,1) PRIMARY KEY,
FirstName VARCHAR(50) NOT NULL,
LastName VARCHAR(50) NOT NULL,
Department VARCHAR(250) NOT NULL,
Title VARCHAR(50) NOT NULL,
EmailAddress VARCHAR(320) NOT NULL,
);

/*Create Lecutre table*/
CREATE TABLE Lecture(
SessionID INT IDENTITY(1,1) PRIMARY KEY,
Token VARCHAR(50) NOT NULL,
ExpiryTime DATETIME NOT NULL,    
LectureID INT NOT NULL,
Module VARCHAR(250) NOT NULL,
Topic VARCHAR(50) NOT NULL,
DateOfLecurte DATE NOT NULL,
TimeOfLecture TIME NOT NULL,
TotalStudentsAttended INT,
StudentID INT,
FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
ON DELETE CASCADE
);


/* STORED PROCEDURES */


/* Create AddCourse SP */
CREATE PROCEDURE AddCourse
@CourseName VARCHAR(250), 
@CourseDescription TEXT,
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Course WHERE CourseName = @CourseName)
			BEGIN
			--an account with this email already exists
				SELECT @ResponseMessage = 208;
			END
		ELSE
			BEGIN
				INSERT INTO Course
				(CourseName, CourseDescription)
				VALUES
				(@CourseName, @CourseDescription);
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

/* Running AddCourse SP */
DECLARE @Out as INT
exec AddCourse @CourseName = 'Physics', @CourseDescription = 'Study astronomy', @ResponseMessage = @Out OUTPUT;
SELECT @Out AS 'Outputmessage';


/* Create EditCourse SP */
CREATE PROCEDURE EditCourse
@CourseID INT,
@CourseName VARCHAR(250),
@CourseDescription TEXT,
@ResponseMessage INT OUTPUT
AS
BEGIN
    UPDATE Course 
    SET CourseName = @CourseName, CourseDescription = @CourseDescription WHERE CourseID = @CourseID;
    SELECT @ResponseMessage = 200;    
ENDND
END
GO

/* Running EditCourse SP */
DECLARE @Out as INT
exec EditCourse @CourseID = 3, @CourseName = 'Chemistry', @CourseDescription = 'Study astronomy', @ResponseMessage = @Out OUTPUT;
SELECT @Out AS 'Outputmessage';


/* Create DeleteCourse SP */
CREATE PROCEDURE DeleteCourse
@CourseID INT,
@ResponseMessage INT OUTPUT
AS
BEGIN
    DELETE FROM Course WHERE CourseID = @CourseID;
    SELECT @ResponseMessage = 200;
END
GO

/* Running DeleteCourse SP */
DECLARE @Out as INT
exec DeleteCourse @CourseID = 3, @ResponseMessage = @Out OUTPUT;
SELECT @Out AS 'Outputmessage';


/* Create AddStudent SP */
CREATE PROCEDURE AddStudent
@FirstName VARCHAR(50), 
@LastName VARCHAR(50),
@FaceIMG VARBINARY(max),
@EmailAddress VARCHAR(320),
@Program VARCHAR(250),
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Student WHERE EmailAddress = @EmailAddress)
			BEGIN
			--an account with this email already exists
				SELECT @ResponseMessage = 208;
			END
		ELSE
			BEGIN
				INSERT INTO Student
				(FirstName, LastName, FaceIMG, EmailAddress, Program)
				VALUES
				(@FirstName, @LastName, @FaceIMG, @EmailAddress, @Program);
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

/* Create EditStudent SP */
CREATE PROCEDURE EditStudent
@StudentID INT,
@FirstName VARCHAR(50),
@LastName VARCHAR(50),
@FaceIMG VARBINARY(MAX),
@EmailAddress VARCHAR(320),
@Program VARCHAR(250),
@ResponseMessage INT OUTPUT
AS
BEGIN
    UPDATE Student 
    SET FirstName = @FirstName, LastName = @LastName, FaceIMG = @FaceIMG, EmailAddress = @EmailAddress, Program = @Program WHERE StudentID = @StudentID;
    SELECT @ResponseMessage = 200;    
END
GO

/* Create DeleteStudent SP */
CREATE PROCEDURE DeleteStudent
@StudentID INT,
@ResponseMessage INT OUTPUT
AS
BEGIN
    DELETE FROM Student WHERE StudentID = @StudentID;
    SELECT @ResponseMessage = 200;
END
GO

/* Create AddLecturer SP */
CREATE PROCEDURE AddLecturer
@FirstName VARCHAR(50), 
@LastName VARCHAR(50),
@Department VARCHAR(250),
@Title VARCHAR(50),
@EmailAddress VARCHAR(320),
@ResponseMessage INT OUTPUT
AS
BEGIN
	BEGIN TRANSACTION
		IF EXISTS (SELECT * FROM Lecturer WHERE EmailAddress = @EmailAddress)
			BEGIN
			--an account with this email already exists
				SELECT @ResponseMessage = 208;
			END
		ELSE
			BEGIN
				INSERT INTO Lecturer
				(FirstName, LastName, Department, Title, EmailAddress)
				VALUES
				(@FirstName, @LastName, @Department, @Title, @EmailAddress);
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
