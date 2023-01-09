const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
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

// Query database
db.query(`SELECT 
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
ORDER BY employee.id;`, function (err, results) {
  console.table(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
