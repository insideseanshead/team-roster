const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { fips } = require("crypto");

const employeeArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//Array of Questions

generateEmployee();

function generateEmployee() {
  inquirer
    .prompt({
      type: "list",
      name: "role",
      message: "what is your role?",
      choices: ["Manager", "Engineer", "Intern", "Quit"],
    })
    .then(function ({ role }) {
      switch (role) {
        case "Manager":
          createManager();
          break;

        case "Engineer":
          createEngineer();
          break;

        case "Intern":
          createIntern();
          break;

        default:
          buildTeam();
      }
    });
}

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your company ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "input",
        name: "office",
        message: "What is your office number?",
      },
    ])
    .then((response) => {
      const newManager = new Manager(
        response.name,
        response.id,
        response.email,
        response.office
      );
      console.log(newManager);
      employeeArray.push(newManager);
    //   console.log(employeeArray);
      generateEmployee()
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your company ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "input",
        name: "school",
        message: "Where did you go to school?",
      },
    ])
    .then((response) => {
      const newIntern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      console.log(newIntern);
      employeeArray.push(newIntern);
    //   console.log(employeeArray);
      generateEmployee()
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your company ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is your github?",
      },
    ])
    .then((response) => {
      const newEngineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      console.log(newEngineer);
      employeeArray.push(newEngineer);
    //   console.log(employeeArray);
      generateEmployee()
    });
}

function buildTeam(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }

   fs.writeFileSync(outputPath, render(employeeArray), "utf-8")  
}

//
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
