const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// connection to mySQL
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Babyblue1",
  database: "companydb",
});

connection.connect((err) => {
  if (err) throw err;
  // Begins prompts once connection is made
  startPrompts();
});

// Function to begin user prompts
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

// Prompts to display if add option is chosen
async function addPrompts() {
  let addPrompt = await inquirer.prompt({
    name: "adds",
    type: "list",
    message: "What do you wish to add...?",
    choices: ["Employee", "Department", "Role", "Back"],
  });
  if (addPrompt.adds === "Employee") {
    addEmployee();
  } else if (addPrompt.adds === "Department") {
    addDepartment();
  } else if (addPrompt.adds === "Role") {
    addRole();
  } else {
    startPrompts();
  }
}

// Prompts to be displayed if view option is chosen
async function viewPrompts() {
  let viewPrompt = await inquirer.prompt({
    name: "views",
    type: "list",
    message: "What do you wish to view...?",
    choices: ["Employee", "Department", "Role", "Back"],
  });
  if (viewPrompt.views === "Employee") {
    viewEmployee();
  } else if (viewPrompt.views === "Department") {
    viewDepartment();
  } else if (viewPrompt.views === "Role") {
    viewRole();
  } else {
    startPrompts();
  }
}

// Prompts to be displayed if update option is chosen
async function updatePrompts() {
  let updatePrompt = await inquirer.prompt({
    name: "updates",
    type: "list",
    message: "What do you wish to update...?",
    choices: ["Employee", "Department", "Role", "Back"],
  });
  if (updatePrompt.updates === "Employee") {
    updateEmployee();
  } else if (updatePrompt.updates === "Department") {
    updateDepartment();
  } else if (updatePrompt.updates === "Role") {
    updateRole();
  } else {
    startPrompts();
  }
}

// Prompts to be displayed if remove option is chosen
async function removePrompts() {
  let removePrompt = await inquirer.prompt({
    name: "removes",
    type: "list",
    message: "What do you wish to remove...?",
    choices: ["Employee", "Department", "Role", "Back"],
  });
  if (removePrompt.removes === "Employee") {
    removeEmployee();
  } else if (removePrompt.removes === "Department") {
    removeDepartment();
  } else if (removePrompt.removes === "Role") {
    removeRole();
  } else {
    startPrompts();
  }
}

// Adding values functions
function addRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "Name of new role...",
      },
      {
        name: "deptId",
        type: "input",
        message: "Input department ID...",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Salary for Role...",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO roles_tbl SET ?",
        {
          title: data.newRole,
          salary: data.roleSalary,
          department_id: data.deptId,
        },
        function (err) {
          if (err) throw err;
          console.log("New Role was Created!");
          startPrompts();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Name of new department...",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO departments_tbl SET ?",
        {
          department_name: data.newDepartment,
        },
        function (err) {
          if (err) throw err;
          console.log("New Department was Created!");
          startPrompts();
        }
      );
    });
}

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

function viewRole() {
  connection.query("SELECT * FROM roles_tbl", function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    startPrompts();
  });
}

function viewDepartment() {
  connection.query("SELECT * FROM departments_tbl", function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    startPrompts();
  });
}

function viewEmployee() {
  connection.query("SELECT * FROM employees_tbl", function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    startPrompts();
  });
}

function updateRole() {
  connection.query("SELECT * FROM roles_tbl", (err, res) => {
    if (err) throw err;
    console.log("");
    console.table(res);
    console.log("");
    inquirer
      .prompt([
        {
          name: "roleId",
          type: "input",
          message: "Enter Role id to update...",
        },
        {
          name: "newRole",
          type: "input",
          message: "Name of updated role...",
        },
        {
          name: "deptId",
          type: "input",
          message: "Updated department ID...",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "Updated salary for role...",
        },
      ])
      .then((data) => {
        connection.query(
          "UPDATE roles_tbl SET ? WHERE ?",
          [
            {
              title: data.newRole,
              department_id: data.deptId,
              salary: data.roleSalary,
            },
            { id: data.roleId },
          ],
          (err, res) => {
            if (err) throw err;
            console.log("Role successfully updated");
            startPrompts();
          }
        );
      });
  });
}

function updateDepartment() {}

function updateEmployee() {}

function removeRole() {
  connection.query("SELECT * FROM roles_tbl", (err, res) => {
    if (err) throw err;
    console.log("");
    console.table(res);
    console.log("");
    inquirer
      .prompt([
        {
          name: "removeRole",
          type: "input",
          message: "Enter Role id to remove...",
        },
      ])
      .then((data) => {
        connection.query(
          "DELETE FROM roles_tbl WHERE ?",
          { id: data.removeRole },
          (err, res) => {
            if (err) throw err;
            console.log("Role successfully deleted");
            startPrompts();
          }
        );
      });
  });
}

function removeDepartment() {}

function removeEmployee() {}
