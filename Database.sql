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

/*Insert statement*/
INSERT INTO dbo.Course (CourseName, CourseDescription)
VALUES ('BSc Computer Science', 'This includes programming languages, software engineering, artificial intelligence, operating systems, cyber security, statistical and mathematical models of computation, machine learning and the theories of computation.');

