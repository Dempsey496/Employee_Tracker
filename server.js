const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Babyblue1",
  database: "companydb",
});

connection.connect((err) => {
  if (err) throw err;
  startPrompts();
});

async function startPrompts() {
  let firstPrompt = await inquirer.prompt({
    name: "start",
    type: "list",
    message: "Please make a selection...",
    choices: ["Add", "View", "Update", "Remove", "End"],
  });
  if (firstPrompt.start === "Add") {
    addPrompts();
  } else if (firstPrompt.start === "View") {
    viewPrompts();
  } else if (firstPrompt.start === "Update") {
    updatePrompts();
  } else if (firstPrompt.start === "Remove") {
    removePrompts();
  } else {
    connection.end();
  }
}

async function addPrompts() {
  let addPrompt = await inquirer.prompt({
    name: "adds",
    type: "list",
    message: "What do you wish to add...?",
    choices: ["Employee", "Department", "Role"],
  });
  if (addPrompt.adds === "Employee") {
    addEmployee();
  } else if (addPrompt.adds === "Department") {
    addDepartment();
  } else {
    addRole();
  }
}

async function viewPrompts() {
  let viewPrompt = await inquirer.prompt({
    name: "views",
    type: "list",
    message: "What do you wish to view...?",
    choices: ["Employee", "Department", "Role"],
  });
  if (viewPrompt.views === "Employee") {
    viewEmployee();
  } else if (viewPrompt.views === "Department") {
    viewDepartment();
  } else {
    viewRole();
  }
  startPrompts();
}

async function updatePrompts() {
  let updatePrompt = await inquirer.prompt({
    name: "updates",
    type: "list",
    message: "What do you wish to update...?",
    choices: ["Employee", "Department", "Role"],
  });
  if (updatePrompt.updates === "Employee") {
    updateEmployee();
  } else if (updatePrompt.updates === "Department") {
    updateDepartment();
  } else {
    updateRole();
  }
  startPrompts();
}

async function removePrompts() {
  let removePrompt = await inquirer.prompt({
    name: "removes",
    type: "list",
    message: "What do you wish to remove...?",
    choices: ["Employee", "Department", "Role"],
  });
  if (removePrompt.removes === "Employee") {
    removeEmployee();
  } else if (removePrompt.removes === "Department") {
    removeDepartment();
  } else {
    removeRole();
  }
  startPrompts();
}

function addRole() {}

function viewRole() {}

function updateRole() {}

function removeRole() {}

function addDepartment() {}

function viewDepartment() {}

function updateDepartment() {}

function removeDepartment() {}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "New employee's first name...",
      },
      {
        name: "lastName",
        type: "input",
        message: "New employee's last name...",
      },
      {
        name: "roleId",
        type: "input",
        message: "New employee's role ID...",
      },
      {
        name: "managerId",
        type: "input",
        message: "New employee's manager ID...",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO employees_tbl SET ?",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: data.roleId,
          manager_id: data.managerId,
        },
        function (err) {
          if (err) throw err;
          console.log("New Employee was Created!");
          startPrompts();
        }
      );
    });
}

// function viewEmployee() {

// }

// function updateEmployee() {

// }

// function removeEmployee() {

// }
