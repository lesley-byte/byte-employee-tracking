// include inquirer package and fs package
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
// include generateDatabase.js file in utils folder
const viewData = require("./utils/viewData");
const { clog } = require("./middleware/clog");

// TODO: Create a function to write to the Database

// TODO: Create a function to delete from the Database

// TODO: Create a function to initialize app
function init() {
    viewData.menu();
}
// TODO: Function call to initialize app
init();