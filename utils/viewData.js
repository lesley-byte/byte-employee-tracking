const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require('asciiart-logo');
// const artConfig = require('./package.json');
const PORT = process.env.PORT || 3001;


const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// TODO: Create a function that will console.table the data from all departments
function viewAllDepartments() {
  console.log("Viewing all departments: ");
  // query the database for all departments
  db.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.clear();
    console.log("-----------------");
    console.table(res);
    console.log("-----------------");
    // connection.end();
  });
}

// TODO: Create a function that will console.table the data from all roles
function viewAllRoles() {
  console.log("Viewing all roles");
  db.query("SELECT * FROM roles;", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.clear();
    console.log("-----------------");
    console.table(res);
    console.log("-----------------");
    // connection.end();))
  });
}

// TODO: Create a function that will console.table the data from all employees
function viewAllEmployees() {
  console.log("Viewing all employees");
  db.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.clear();
    console.log("-----------------");
    console.table(res);
    console.log("-----------------");
    // connection.end();
  });
}

// TODO: Create a function that will add a department to the database
function addDepartment() {
  const newDepartment = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the name of the department!");
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "INSERT INTO department SET ?",
          { dept_name: answers.name },
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " department inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            // updateProduct();
        
          }
        );
      })
      .then(() => {
        console.log("Department added!");
        menu();
        })
        .catch((err) => console.log(err))
  };
  newDepartment();
}

// TODO: Create a function that will add a role to the database
function addRole() {
  console.log("Adding a role");
  db.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    // assign the results to a variable that can be used in the inquirer prompt
    const departments = res;
   
    const questions3 = () => {
      return inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "department_id",
            message: `What is the name of the department?`,
            choices: departments.map((department) => ({
              name: department.dept_name,
              value: department.id,
            })),
          },
        ])
        .then((answers) => {
          console.log(answers);
          db.query(
            "INSERT INTO roles SET ?",
            {
              title: answers.title,
              salary: answers.salary,
              dept_id: answers.department_id,
            },
            function (err, res) {
              if (err) throw err;
              // console.clear();
              console.log(res.affectedRows + " role inserted!\n");
              // Call updateProduct AFTER the INSERT completes
              // updateProduct();
    
            }
          );
        })
        .then(() => {
          console.log("Role added!");
          menu();
          })
          .catch((err) => console.log(err))
    };
    questions3();
  });
}

// TODO: Create a function that will add an employee to the database
function addEmployee() {
  console.log("Adding an employee");
  db.query("SELECT * FROM roles;", function (err, res) {
    if (err) throw err;
    // assign the results to a variable that can be used in the inquirer prompt
    const roles = res;

    db.query("SELECT * FROM employee;", function (err, res) {
      if (err) throw err;
      // assign the results to a variable that can be used in the inquirer prompt
      const managers = res;

  const questions4 = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the first name of the employee?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the last name of the employee?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role of the employee?",
          choices: roles.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the manager of the employee?",
          choices: managers.map((manager) => ({
            name: (manager.first_name + " " + manager.last_name),
            value: manager.id,
          })),
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            manager_id: answers.manager_id,
          },
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " employee inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            // updateProduct();

          }
        );
      })
      .then(() => {
        console.log("Employee added!");
        menu();
        })
        .catch((err) => console.log(err))
  };
  
  questions4();
});
});
}

// TODO: Create a function that will update an employee's role
function updateEmployeeRole() {
  console.log("Updating an employee's role");
  db.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    // assign the results to a variable that can be used in the inquirer prompt
    const employees = res;
    db.query("SELECT * FROM roles;", function (err, res) {
      if (err) throw err;
      // assign the results to a variable that can be used in the inquirer prompt
      const roles = res;

  const questions5 = () => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "What is the name of the employee?",
          choices: employees.map((employee) => ({
            name: (employee.first_name + " " + employee.last_name),
            value: employee.id,
          })),
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the new role of the employee?",
          choices: roles.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ])
      .then((answers) => {
        console.log(answers);
        // update the role_id of the employee whose first and last name match
        db.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [answers.role_id, answers.employee_id],
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " employee updated!\n");

          }
        );
      })
      .then(() => {
        console.log("Employee role updated!");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions5();
});
});
}

// TODO: Create a function that will update an employee's manager
function updateEmployeeManager() {
  console.log("Updating an employee's manager");
  db.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    // assign the results to a variable that can be used in the inquirer prompt
    const employees = res;
    db.query("SELECT * FROM employee;", function (err, res) {
      if (err) throw err;
    const managers = res;

  const questions6 = () => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "What is the name of the employee?",
          choices: employees.map((employee) => ({
            name: (employee.first_name + " " + employee.last_name),
            value: employee.id,
          })),
        },
        {
          type: "list",
          name: "manager_id",
          message: "What is the manager name of the employee?",
          choices : managers.map((manager) => ({
            name: (manager.first_name + " " + manager.last_name),
            value: manager.id,
          })),
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [answers.manager_id, answers.employee_id],
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " employee updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            // deleteProduct();
 
          }
        );
      })
      .then(() => {
        console.log("Employee manager updated!");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions6();
});
});
}

// TODO: Create a function that will view employees by manager
function viewEmployeesByManager() {
  console.log("Viewing employees by manager");
  const questions7 = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the first name of the manager?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the last name of the manager?",
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          `SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        roles.title,
        department.dept_name,
        roles.salary,
        employee.manager_id,
        CONCAT(m.first_name, m.last_name) as manager
    
    FROM employee
    LEFT JOIN roles
        ON employee.role_id = roles.id
    LEFT JOIN department
        ON roles.dept_id = department.id
    LEFT JOIN employee as e
        ON employee.id = e.manager_id
    LEFT JOIN employee as m
        ON employee.manager_id = m.id
    WHERE m.first_name = ? AND m.last_name = ?`,
          [answers.first_name, answers.last_name],
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.table(res);
          }
        );
      })
      .then(() => {
        console.log("--------------------");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions7();
}

// TODO: Create a function that will view employees by department
function viewEmployeesByDepartment() {
  console.log("Viewing employees by department");
  const questions8 = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "department_name",
          message: "What is the name of the department?",
        },
      ])
      .then((answers) => {
        console.log(answers);
        // first db.query gets the department id from the department name
        db.query(
          `SELECT employee.id,
        employee.first_name,
        employee.last_name,
        roles.title,
        department.dept_name,
        roles.salary,
        employee.manager_id,
        CONCAT(m.first_name, m.last_name) as manager
    
        FROM employee
        LEFT JOIN roles
            ON employee.role_id = roles.id
        LEFT JOIN department
            ON roles.dept_id = department.id
        LEFT JOIN employee as e
            ON employee.id = e.manager_id
        LEFT JOIN employee as m
            ON employee.manager_id = m.id
        WHERE dept_name = ?`,
          [answers.department_name],
          function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.clear();
            console.table(res);
            // connection.end();
          }
        );
      })
      .then(() => {
        console.log("--------------------");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions8();
}

// TODO: Create a function that will delete a department
function deleteDepartment() {
  console.log("Deleting a department");
  const questions9 = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department?",
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "DELETE FROM department WHERE ?",
          { dept_name: answers.name },
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " department deleted!\n");
            // Call readProducts AFTER the DELETE completes
            // readProducts();

          }
        );
      })
      .then(() => {
        console.log("Department Deleted!");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions9();
}

// TODO: Create a function that will delete a role
function deleteRole() {
  console.log("Deleting a role");
  const questions10 = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "DELETE FROM roles WHERE ?",
          { title: answers.title },
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " role deleted!\n");
            // Call readProducts AFTER the DELETE completes
            // readProducts();

          }
        );
      })
      .then(() => {
        console.log("Role Deleted!");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions10();
}
// TODO: Create a function that will delete an employee
function deleteEmployee() {
  console.log("Deleting an employee");
  const questions11 = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the first name of the employee?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the last name of the employee?",
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "DELETE FROM employee WHERE first_name = ? AND last_name = ?",
          [answers.first_name, answers.last_name],
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " employee deleted!\n");
            // Call readProducts AFTER the DELETE completes
            // readProducts();

          }
        );
      })
      .then(() => {
        console.log("Employee Deleted!");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions11();
}

// TODO: Create a function that will view the total utilized budget of a department
function viewTotalUtilizedBudget() {
  console.log("Viewing the total utilized budget of a department");
  // ask the user which department they would like to view the total utilized budget of
  const questions12 = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "department_name",
          message:
            "Which department would you like to view the total utilized budget of?",
        },
      ])
      .then((answers) => {
        console.log(answers);

        // first db.query gets views all employees in the department and then adds up the salaries
        db.query(
          `SELECT SUM(salary) as total_budget FROM employee 
        LEFT JOIN roles
        ON employee.role_id = roles.id
        LEFT JOIN department
            ON roles.dept_id = department.id
        LEFT JOIN employee as e
            ON employee.id = e.manager_id
        LEFT JOIN employee as m
            ON employee.manager_id = m.id
        WHERE dept_name = ?`,
          [answers.department_name],
          function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.clear();
            console.table(res);
            // connection.end();
          }
        );
      })
      .then(() => {
        console.log("--------------------");
        menu();
        })
        .catch((err) => console.log(err))
  };
  questions12();
}

// TODO: Create a function that will use a switch statement to call the appropriate function
function menu() {
    // console.clear();

console.log(
    logo({
        name: 'Employee Tracker',
        font: 'Bloody',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'bold-white',
        logoColor: 'bold-magenta',
        textColor: 'green',
    })
    .render()
);
  const questions = () => {
    return inquirer
      .prompt([
        {
          type: "list",
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
            "Exit",
          ],
        },
      ])
      .then((data) => {
        console.log(data.menu);
        switch (data.menu) {
          case "View all departments?":
            viewAllDepartments();
            menu();
            break;
          case "View all roles?":
            viewAllRoles();
            menu();
            break;
          case "View all employees?":
            viewAllEmployees();
            menu();
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
            case "Exit":
                db.end();
                break;
          default:
            console.log("-------------------------");
            break;
          }
      });
    };
    questions();
    // make a promise to wait for the user to select an option from the menu
    // then call questions() again until the user selects the exit option
    // if the user selects the exit option, then call connection.end()
    
}

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
  menu,
};
