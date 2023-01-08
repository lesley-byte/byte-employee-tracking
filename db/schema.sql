DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL,
)

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (dept_id)
    REFERENCES department(dept_id)
    ON DELETE SET NULL
)

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(role_id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(emp_id)
    ON DELETE NO ACTION,
)