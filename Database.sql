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
