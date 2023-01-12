const express = require('express');
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );
app.use((req, res) => {
res.status(404).end();
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});


// TODO: Create a function that will console.table the data from all departments
function viewAllDepartments() {
  console.log("Viewing all departments");
  // query the database for all departments
    db.query("SELECT * FROM department;", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('-----------------')
        console.table(res);
        console.log('-----------------')
        // connection.end();
        });

};

// TODO: Create a function that will console.table the data from all roles
function viewAllRoles() {
    console.log("Viewing all roles");
    db.query("SELECT * FROM roles;", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('-----------------')
        console.table(res);
        console.log('-----------------')
        // connection.end();))
    });
    };

// TODO: Create a function that will console.table the data from all employees
function viewAllEmployees() {
    console.log("Viewing all employees");
    db.query("SELECT * FROM employee;", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('-----------------')
        console.table(res);
        console.log('-----------------')
        // connection.end();
        });
    };

// TODO: Create a function that will add a department to the database
function addDepartment() {
    const newDepartment  = () => {
        return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the name of the department!');
                return false;
            }
        }
        }
    ])
    .then((answers) => {
        console.log(answers);
        db.query("INSERT INTO department SET ?", { dept_name: answers.name }, function (err, res) {

            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            // updateProduct();
            viewAllDepartments();
            });
        });
    };
    newDepartment();
    };

// TODO: Create a function that will add a role to the database
function addRole() {
    console.log("Adding a role");
    const questions3 = () => {
        return inquirer.prompt([
        { type: "input", name: "title", message: "What is the title of the role?" },
        { type: "input", name: "salary", message: "What is the salary of the role?" },
        { type: "input", name: "department_id", message: "What is the department id of the role?" },
    ])
    .then((answers) => {
        console.log(answers);
        db.query("INSERT INTO roles SET ?", { title: answers.title, salary: answers.salary, dept_id: answers.department_id }, function (err, res) {   
            if (err) throw err;
            console.log(res.affectedRows + " role inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            // updateProduct();
            viewAllRoles();
            });
        });
    };
    questions3();
    };

// TODO: Create a function that will add an employee to the database
function addEmployee() {

    console.log("Adding an employee");
    const questions4 = () => {
        return inquirer.prompt([
        { type: "input", name: "first_name", message: "What is the first name of the employee?" },
        { type: "input", name: "last_name", message: "What is the last name of the employee?" },
        { type: "input", name: "role_id", message: "What is the role id of the employee?" },
        { type: "input", name: "manager_id", message: "What is the manager id of the employee?" },
    ])
    .then((answers) => {
        console.log(answers);
        db.query("INSERT INTO employee SET ?", { first_name: answers.first_name, last_name: answers.last_name, role_id: answers.role_id, manager_id: answers.manager_id }, function (err, res) {   
            if (err) throw err;
            console.log(res.affectedRows + " employee inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            // updateProduct();
            viewAllEmployees();
            });
        });
    };
    questions4();
    };

// TODO: Create a function that will update an employee's role
function updateEmployeeRole() {

    console.log("Updating an employee's role");
    const questions5 = () => {
        return inquirer.prompt([
        { type: "input", name: "first_name", message: "What is the first name of the employee?" },
        { type: "input", name: "last_name", message: "What is the last name of the employee?" },
        { type: "input", name: "role_id", message: "What is the new role id of the employee?" },
    ])
    .then((answers) => {
        console.log(answers);
        // update the role_id of the employee whose first and last name match
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", [answers.role_id, answers.first_name, answers.last_name], function (err, res) {
                    if (err) throw err;
            console.log(res.affectedRows + " employee updated!\n");
        viewAllEmployees();
        });
    });
    };
    questions5();
    };


// TODO: Create a function that will update an employee's manager
function updateEmployeeManager() {
  
    console.log("Updating an employee's manager");
    const questions6 = () => {
        return inquirer.prompt([
        { type: "input", name: "first_name", message: "What is the first name of the employee?" },
        { type: "input", name: "last_name", message: "What is the last name of the employee?" },
        { type: "input", name: "manager_id", message: "What is the manager id of the employee?" },
    ])
    .then((answers) => {
        console.log(answers);
        db.query("UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?", [answers.manager_id, answers.first_name, answers.last_name], function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            // deleteProduct();
            viewAllEmployees();
            });
        });
    };
    questions6();
    };

// TODO: Create a function that will view employees by manager
function viewEmployeesByManager() {
   
    console.log("Viewing employees by manager");
    const questions7 = () => {
        return inquirer.prompt([
        { type: "input", name: "manager_id", message: "What is the manager id of the employee?" },
    ])
    .then((answers) => {
        console.log(answers);
        db.query('SELECT * FROM employee WHERE ?', { manager_id: answers.manager_id }, function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            // connection.end();
            });
        });
    };
    questions7();
    };
 
// TODO: Create a function that will view employees by department
function viewEmployeesByDepartment() {
  
    console.log("Viewing employees by department");
    const questions8 = () => {
        return inquirer.prompt([
        { type: "input", name: "department_name", message: "What is the name of the department?" },
    ])
    .then((answers) => {
        console.log(answers);
// first db.query gets the department id from the department name
        db.query('SELECT id FROM department WHERE ?', { dept_name: answers.department_name }, function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log("")
            console.log(res);
            var tempDeptId = res.id;
            // connection.end();
            db.query('SELECT id FROM roles WHERE ?', { dept_id: tempDeptId }, function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res);
                // connection.end();
                db.query('SELECT * FROM employee WHERE ?', { role_id: res.role_id }, function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    console.log(res);
                    // connection.end();
                    });
                });
            });
// second db.query gets the roles from the department id and stores them in an array and then gets all the employees from the array of roles

        });
    };
    questions8();
    };


// TODO: Create a function that will delete a department
function deleteDepartment() {
 
    console.log("Deleting a department");
    const questions9 = () => {
        return inquirer.prompt([
        { type: "input", name: "name", message: "What is the name of the department?" },
    ])
    .then((answers) => {
        console.log(answers);
        db.query("DELETE FROM department WHERE ?", { dept_name: answers.name }, function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department deleted!\n");
            // Call readProducts AFTER the DELETE completes
            // readProducts();
            viewAllDepartments();
            });
        });
    };
    questions9();
    };


// TODO: Create a function that will delete a role
function deleteRole() {
    
    console.log("Deleting a role");
    const questions10 = () => {
        return inquirer.prompt([
        { type: "input", name: "title", message: "What is the title of the role?" },
    ])
    .then((answers) => {
        console.log(answers);
        db.query("DELETE FROM roles WHERE ?", { title: answers.title }, function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role deleted!\n");
            // Call readProducts AFTER the DELETE completes
            // readProducts();
            viewAllRoles();
            });
        });
    };
    questions10();
    };
// TODO: Create a function that will delete an employee
function deleteEmployee() {
 
    console.log("Deleting an employee");
    const questions11 = () => {
        return inquirer.prompt([
        { type: "input", name: "first_name", message: "What is the first name of the employee?" },
        { type: "input", name: "last_name", message: "What is the last name of the employee?" },
    ])
    .then((answers) => {
        console.log(answers);
        db.query('DELETE FROM employee WHERE first_name = ? AND last_name = ?', [answers.first_name, answers.last_name], function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee deleted!\n");
            // Call readProducts AFTER the DELETE completes
            // readProducts();
            viewAllEmployees();
            });
        });
    };
    questions11();
    };


// TODO: Create a function that will view the total utilized budget of a department
function viewTotalUtilizedBudget() {
    
    console.log("Viewing the total utilized budget of a department");
  // ask the user which department they would like to view the total utilized budget of
    const questions12 = () => {
        return inquirer.prompt([
        { type: "input", name: "department_id", message: "Which department id would you like to view the total utilized budget of?" },
    ])
    .then((answers) => {
        console.log(answers);
        
        db.query('SELECT SUM(salary) FROM employee WHERE ?', { dept_id: answers.department_id }, function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            // connection.end();
            });
        });
    };
    questions12();
    };

// TODO: Create a function that will use a switch statement to call the appropriate function
function menu() {
    const questions = () => {
        return inquirer.prompt([
      {
        type: "checkbox",
        name: "menu",
        message: "Select an option from the menu below:",
        choices: [
          "View all departments?",
          "View all roles?",
          "View all employees?",
          "Add a department?",
          "Add a role?",
          "Add an employee?",
          "Update an employee role?",
          "Update employee managers?",
          "View employees by manager?",
          "View employees by department?",
          "Delete departments?",
          "Delete roles?",
          "Delete employees?",
          "View the total utilized budget of a department?",
        ],
      },
    ]
        )
        .then((data) => {
            console.log(data.menu[0])
            switch (data.menu[0]) {
        case "View all departments?":
            viewAllDepartments();
            break;
        case "View all roles?":
            viewAllRoles();
            break;
        case "View all employees?":
            viewAllEmployees();
            break;
        case "Add a department?":
            addDepartment();
            break;
        case "Add a role?":
            addRole();
            break;
        case "Add an employee?":
            addEmployee();

            break;
        case "Update an employee role?":
            updateEmployeeRole();
            break;
        case "Update employee managers?":
            updateEmployeeManager();
            break;
        case "View employees by manager?":
            viewEmployeesByManager();
            break;
        case "View employees by department?":
            viewEmployeesByDepartment();
            break;
        case "Delete departments?":
            deleteDepartment();
            break;
        case "Delete roles?":
            deleteRole();
            break;
        case "Delete employees?":
            deleteEmployee();
            break;
        case "View the total utilized budget of a department?":
            viewTotalUtilizedBudget();
            break;
        default:
            console.log("Please select an option from the menu");
            break;
    }
        })
    }
    questions();
};


module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewTotalUtilizedBudget,
    menu
};