-- join employee.emp_id to employee.manager_id
-- join employee.role_id to role.role_id
-- join role.dept_id to department.dept_id
SELECT 
    employee.emp_id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.dept_name,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role
    ON employee.role_id = role.role_id
LEFT JOIN department
    ON role.dept_id = department.dept_id
LEFT JOIN employee manager
    ON employee.manager_id = manager.emp_id;