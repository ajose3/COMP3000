/*Create course table*/
CREATE TABLE Course(
CourseID int IDENTITY(1,1) PRIMARY KEY,
CourseName VARCHAR(250) NOT NULL,
CourseDescription TEXT
);
