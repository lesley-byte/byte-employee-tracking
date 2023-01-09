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
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        // connection.end();
        });

};

// TODO: Create a function that will console.table the data from all roles
function viewAllRoles() {
    console.log("Viewing all roles");
    };

// TODO: Create a function that will console.table the data from all employees
function viewAllEmployees() {
    console.log("Viewing all employees");
    };

// TODO: Create a function that will add a department to the database
function addDepartment() {
    console.log("Adding a department");
    };

// TODO: Create a function that will add a role to the database
function addRole() {
    console.log("Adding a role");
    };

// TODO: Create a function that will add an employee to the database
function addEmployee() {
    console.log("Adding an employee");
    };

// TODO: Create a function that will update an employee's role
function updateEmployeeRole() {
    console.log("Updating an employee's role");
    };


// TODO: Create a function that will update an employee's manager
function updateEmployeeManager() {
    console.log("Updating an employee's manager");
    };

// TODO: Create a function that will view employees by manager
function viewEmployeesByManager() {
    console.log("Viewing employees by manager");
    };

// TODO: Create a function that will view employees by department
function viewEmployeesByDepartment() {
    console.log("Viewing employees by department");
    };

// TODO: Create a function that will delete a department
function deleteDepartment() {
    console.log("Deleting a department");
    };


// TODO: Create a function that will delete a role
function deleteRole() {
    console.log("Deleting a role");
    };

// TODO: Create a function that will delete an employee
function deleteEmployee() {
    console.log("Deleting an employee");
    };


// TODO: Create a function that will view the total utilized budget of a department
function viewTotalUtilizedBudget() {
    console.log("Viewing the total utilized budget of a department");
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