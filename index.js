// include inquirer package and fs package
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
// include generateDatabase.js file in utils folder
const viewData = require("./utils/viewData");
// Create an array of questions for user input
// first question is a set of choices for the user to choose from
const questions = [
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
];

// TODO: Create a function to write to the Database

// TODO: Create a function to delete from the Database

// TODO: Create a function to initialize app

// TODO: Function call to initialize app