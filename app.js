const Manager = require("./library/Manager");
const Intern = require("./library/Intern");
const Employee = require("./library/Employee");
const Engineer = require("./library/Engineer");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const templateDir = "./templates/"

const outputPath = path.resolve(__dirname, "output", "team.html");

//const render = require("./library/htmlrenderer");

const employeeArray = []

const id = []

function menu() {
    function manager() {
            inquirer.prompt([ 

            {type: "input",
             name: "managerName",
             message: "What is your managers name?",
             validate: answer => {
                 if(answer !== ""){
                     return true;
                 }
                 return "Please enter a character";
              }
           },
           {type: "input",
             name: "managerID",
             message: "What is your Manager ID number?",
             validate: answer => {
                const managerIdNumber = answer.match(/^[0-9]\d*$/);
                 if(managerIdNumber){
                     return true;
                 }
                 return "Please enter a number";
              }
           },
           {type: "input",
             name: "managerEmail",
             message: "What is your Manager's E-mail?",
             validate: answer => {
               const emailAddress = answer.match(/\S+@\S+\.\S+/);
                 if(emailAddress){
                     return true;
                 }
                 return "Please enter a E-mail";
              }
           },
           { type: "input",
             name: "officeID",
             message: "What is your Office ID number?",
             validate: answer => { 
                const officeIdNumber = answer.match(/^[0-9]\d*$/);
                 if(officeIdNumber){
                     return true;
                 }
                 return "Please enter a Office ID number";
              }
           }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            employeeArray.push(manager);
            id.push(answers.managerId);
            team();
          });
    }
    function team() {
        
        inquirer.prompt([
            {type: "list",
             name: "employeeType",
             message: "What type of team member would you like to add?",
             choices: ["Engineer", "Intern", "Nothing at this time",]
               
              }
           ]).then(employ => {
               switch(employ.employeeType){
                case "Engineer": addEngineer()
                break;
                case "Intern": addIntern()
                break;
                default: buildTeam();
             }
           });

    }
    function addEngineer() {
        inquirer.prompt([
          {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
            validate: answer => {
              if (answer !== "") {
                return true;
              }
              return "Please enter at least one character.";
            }
          },
          {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?",
            validate: answer => {
              const pass = answer.match(
                /^[1-9]\d*$/
              );
              if (pass) {
                if (id.includes(answer)) {
                  return "This ID is already taken. Please enter a different number.";
                } else {
                  return true;
                }
                            
              }
              return "Please enter a positive number greater than zero.";
            }
          },
          {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?",
            validate: answer => {
              const pass = answer.match(
                /\S+@\S+\.\S+/
              );
              if (pass) {
                return true;
              }
              return "Please enter a valid email address.";
            }
          },
          {
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub username?",
            validate: answer => {
              if (answer !== "") {
                return true;
              }
              return "Please enter at least one character.";
            }
          }
        ]).then(answers => {
          const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
          employeeArray.push(engineer);
          id.push(answers.engineerId);
          team();
        });
      }
      function addIntern() {
        inquirer.prompt([
          {
            type: "input",
            name: "internName",
            message: "What is your intern's name?",
            validate: answer => {
              if (answer !== "") {
                return true;
              }
              return "Please enter at least one character.";
            }
          },
          {
            type: "input",
            name: "internId",
            message: "What is your intern's id?",
            validate: answer => {
              const pass = answer.match(
                /^[1-9]\d*$/
              );
              if (pass) {
                if (id.includes(answer)) {
                  return "This ID is already taken. Please enter a different number.";
                } else {
                  return true;
                }
                            
              }
              return "Please enter a positive number greater than zero.";
            }
          },
          {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?",
            validate: answer => {
              const pass = answer.match(
                /\S+@\S+\.\S+/
              );
              if (pass) {
                return true;
              }
              return "Please enter a valid email address.";
            }
          },
          {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?",
            validate: answer => {
              if (answer !== "") {
                return true;
              }
              return "Please enter at least one character.";
            }
          }
        ]).then(answers => {
          const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
          employeeArray.push(intern);
          id.push(answers.internId);
          team();
        });
      }
      function buildTeam() {
        fs.writeFileSync(outputPath, render(employeeArray), "utf-8");
      }
      manager();
}
menu();




    





