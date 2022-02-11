const chalk = require("chalk")
const fs = require("fs")

let todos = []
const command = process.argv[2]
const value = process.argv[3]

if (fs.existsSync("./todos.json")) {
  todos = JSON.parse(fs.readFileSync("./todos.json"))
}

function saveInJsonFile(todos) {
  const data = JSON.stringify(todos)
  fs.writeFileSync("todos.json", data)
}

function chalkify(text, color) {
  console.log(chalk[color](text))
}

switch (command) {
  case "add":
    todos.push({ todo: value, id: todos.length + 1 })
    saveInJsonFile(todos)
    chalkify("Added todo: " + value, "green")
    break
  case "list":
    todos.forEach((todo) => {
      chalkify(chalk.red(todo.id) + ": " + todo.todo, "cyanBright")
    })

    break
  case "del":
    const target = todos.find((t) => t.id === value)
    if (target) {
      todos = todos.filter((t) => t.id !== value)
      saveInJsonFile(todos)
      console.log(chalk.green("Deleted todo: " + target.todo))
    } else {
      console.log(chalk.red("Todo not found"))
    }
    break
  case "update":
    const todo_target = todos.find(
      (todo) => todo.id === parseInt(value)
    )
    if (todo_target) {
      todo_target.todo = process.argv[4]
      saveInJsonFile(todos)
      console.log(chalk.green("Updated todo: " + todo_target.todo))
    } else {
      console.log(chalk.red("Todo not found"))
    }
    break
  case "nuke":
    todos = []
    saveInJsonFile(todos)
    chalkify("All todos have been deleted", "green")
    break
  default:
    chalkify("Command not found", "red")
}
