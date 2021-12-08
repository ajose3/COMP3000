/*Create course table*/
CREATE TABLE Course(
CourseID int IDENTITY(1,1) PRIMARY KEY,
CourseName VARCHAR(250) NOT NULL,
CourseDescription TEXT
);

/*Insert statement*/
INSERT INTO dbo.Course (CourseName, CourseDescription)
VALUES ('BSc Computer Science', 'This includes programming languages, software engineering, artificial intelligence, operating systems, cyber security, statistical and mathematical models of computation, machine learning and the theories of computation.');
