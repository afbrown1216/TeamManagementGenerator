const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
console.log("Build your team")
firstQuestion = [{
    type:"list",
    message:"What team member would you like to add?",
    choices: ["Manager", "Engineer", "Intern", "None"],
    name: "teamMember"
}]

managerQuestions = [
    {
        type:"input",
        message:"What is your name?",
        name: "name"
    },
    {
        type:"input",
        message:"What is your ID number?",
        name: "id"
    },
    {
        type:"input",
        message:"What is your email?",
        name: "email"
    },
    {
        type:"input",
        message:"What is your office number?",
        name: "officeNumber"
    }
];

engineerQuestions = [
    {
        type:"input",
        message:"What is the engineer's name?",
        name: "name"
    },
    {
        type:"input",
        message:"What is engineers ID number?",
        name: "id"
    },
    {
        type:"input",
        message:"What is engineers email?",
        name: "email"
    },
    {
        type:"input",
        message:"What is the engineers GitHub username?",
        name: "github"
    }
];
managerQuestions = [
    {
        type:"input",
        message:"What is your name?",
        name: "name"
    },
    {
        type:"input",
        message:"What is your ID number?",
        name: "id"
    },
    {
        type:"input",
        message:"What is your email?",
        name: "email"
    },
    {
        type:"input",
        message:"What is your office number?",
        name: "officeNumber"
    }
];

internQuestions = [
    {
        type:"input",
        message:"What is intern's name?",
        name: "name"
    },
    {
        type:"input",
        message:"What is intern's ID number?",
        name: "id"
    },
    {
        type:"input",
        message:"What is intern's email?",
        name: "email"
    },
    {
        type:"input",
        message:"What school does intern attend?",
        name: "school"
    }
];

function startTeamProfile (){
    
    inquirer
.prompt(firstQuestion)
.then(function(res){
    // console.log("Manager")
    if(res.teamMember === "Manager" ){
       createManagerProfile();
    } else if (res.teamMember === "Engineer"){
        createEngineerProfile();
    } else if (res.teamMember === "Intern"){
        createInternProfile();
    } else {
        makeTeam();
    }
})
}


startTeamProfile();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function makeTeam (){
    fs.writeFileSync(outputPath, render(team), "utf-8");
}
var manCount = 0;
function createManagerProfile(){
    if(manCount === 0 ){
        console.log("Manager")
        inquirer.prompt(managerQuestions).then(function (res){
            let bob = new Manager(res.name, res.id, res.email, res.officeNumber)
            //  console.log(bob);
             team.push(bob);
             startTeamProfile();
    
              
         }).catch((err)=> {
             console.log(err)
         });
    } else {
        console.log("Manager has already been created pick an Engineer or Intern")
        startTeamProfile();
    }
   
     manCount++
    
}

function createEngineerProfile(){
    console.log("Engineer")
    inquirer.prompt(engineerQuestions).then(function (res){
        let john = new Engineer(res.name, res.id, res.email, res.github)
            // console.log(john);
            team.push(john);
            startTeamProfile();
        
    }).catch((err)=> {
        console.log(err)
    });

    
}

function createInternProfile(){
    console.log("Intern");
    inquirer.prompt(internQuestions).then(function (res){
        let jan = new Intern(res.name, res.id, res.email, res.school)
            // console.log(jan);
            team.push(jan);
            startTeamProfile();
    }).catch((err)=> {
        console.log(err)
    });

    
}


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
