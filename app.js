const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQuestions = [
    {
        type: "input",
        message: "What is the team manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What the manager's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What the manager's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What the manager's office number?",
        name: "officeNumber"
    }
];

const engineerQuestions = [
    {
        type: "input",
        message: "What is the engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What the engineer's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What the engineer's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What the engineer's GitHub username?",
        name: "github"
    }
];

const internQuestions = [
    {
        type: "input",
        message: "What is the intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What the intern's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What the intern's email?",
        name: "email"
    },
    {
        type: "input",
        message: "Where is the intern going to school?",
        name: "school"
    }
];

let employeeList = [];

function newManager() {
    inquirer.prompt(managerQuestions).then(response => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employeeList.push(manager);
        newEmployee();
    });
};

function newEngineer() {
    inquirer.prompt(engineerQuestions).then(response => {
        let engineer = new Engineer(response.name, response.id, response.email, response.github);
        employeeList.push(engineer);
        newEmployee();
    });
};

function newIntern(){
    inquirer.prompt(internQuestions).then(response => {
        let intern = new Intern(response.name, response.id, response.email, response.school);
        employeeList.push(intern);
        newEmployee();
    });
};

function newEmployee() {
    inquirer.prompt({
        type: "list",
        message: "What kind of employee do you wish to add?",
        name: "role",
        choices: ["Engineer", "Intern", "Finish team"]
    }).then(userResponse => {
        if(userResponse.role === "Engineer") {
            newEngineer();
        } else if(userResponse.role === "Intern") {
            newIntern();
        } else {
            //initiallize HTML output
            buildTeamPage();
            console.log(employeeList)
        }
    });
};

function buildTeamPage() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employeeList), "utf-8");
};


newManager();



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
// for the provided `render` function to work! ```
