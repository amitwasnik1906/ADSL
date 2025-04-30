CREATE DATABASE assignment03;
USE assignment03;

SHOW TABLES;
SELECT * FROM user;

CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'instructor', 'student') NOT NULL
    student_id VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);

CREATE TABLE classroom (
    building VARCHAR(15),
    room_number VARCHAR(7),
    capacity NUMERIC(4, 0),
    PRIMARY KEY (building, room_number)
);

CREATE TABLE department (
    dept_name VARCHAR(20),
    building VARCHAR(15),
    budget NUMERIC(12, 2) CHECK (budget > 0),
    PRIMARY KEY (dept_name)
);

CREATE TABLE course (
    course_id VARCHAR(10),
    title VARCHAR(50),
    dept_name VARCHAR(20),
    credits NUMERIC(2, 0),
    PRIMARY KEY (course_id),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);

CREATE TABLE instructor (
    ID VARCHAR(5),
    name VARCHAR(50),
    dept_name VARCHAR(20),
    salary NUMERIC(8, 2),
    PRIMARY KEY (ID),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);

CREATE TABLE section (
    course_id VARCHAR(10),
    sec_id VARCHAR(5),
    semester VARCHAR(6),
    year NUMERIC(4, 0),
    building VARCHAR(15),
    room_number VARCHAR(7),
    time_slot_id VARCHAR(5),
    PRIMARY KEY (course_id, sec_id, semester, year),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (building, room_number) REFERENCES classroom(building, room_number)
);

CREATE TABLE teaches (
    ID VARCHAR(5),
    course_id VARCHAR(10),
    sec_id VARCHAR(5),
    semester VARCHAR(6),
    year NUMERIC(4, 0),
    PRIMARY KEY (ID, course_id, sec_id, semester, year),
    FOREIGN KEY (ID) REFERENCES instructor(ID),
    FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES section(course_id, sec_id, semester, year)
);

CREATE TABLE student (
    ID VARCHAR(5),
    name VARCHAR(50),
    dept_name VARCHAR(20),
    tot_cred NUMERIC(3, 0),
    PRIMARY KEY (ID),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);

CREATE TABLE takes (
    ID VARCHAR(5),
    course_id VARCHAR(10),
    sec_id VARCHAR(5),
    semester VARCHAR(6),
    year NUMERIC(4, 0),
    grade VARCHAR(2),
    PRIMARY KEY (ID, course_id, sec_id, semester, year),
    FOREIGN KEY (ID) REFERENCES student(ID),
    FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES section(course_id, sec_id, semester, year)
);

CREATE TABLE advisor (
    s_ID VARCHAR(5),
    i_ID VARCHAR(5),
    PRIMARY KEY (s_ID),
    FOREIGN KEY (s_ID) REFERENCES student(ID),
    FOREIGN KEY (i_ID) REFERENCES instructor(ID)
);

CREATE TABLE time_slot (
    time_slot_id VARCHAR(5),
    day VARCHAR(1),
    start_time TIME,
    end_time TIME,
    PRIMARY KEY (time_slot_id, day, start_time)
);

CREATE TABLE prereq (
    course_id VARCHAR(10),
    prereq_id VARCHAR(10),
    PRIMARY KEY (course_id, prereq_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (prereq_id) REFERENCES course(course_id)
);