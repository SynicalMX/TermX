// Create a new paragraph element
var paraTemp = document.createElement("p");
let textinit = [
    " ____ ____ ____ _  _ _  _ ",
    "(_  _(  __(  _ ( \\/ ( \\/ )",
    "  )(  ) _) )   / \\/ \\)  ( ",
    " (__)(____(__\\_\\_)(_(_/\\_)"
]

const version = "0.0.1";

// Create a enum for the commands
const commands = {
    "help": {
        "description": "Show the list of commands",
        "action": function () {
            for (let i = 0; i < Object.keys(commands).length; i++) {
                console.log(Object.keys(commands)[i]);
                let textPara = document.createElement("p");
                textPara.innerHTML = Object.keys(commands)[i] + ": " + commands[Object.keys(commands)[i]].description;
                document.body.appendChild(textPara);
            }
        }
    },
    "clear": {
        "description": "Clear the terminal",
        "action": function () {
            document.body.innerHTML = ""
        }
    },
    "exit": {
        "description": "Exit the terminal",
        "action": function () {
            window.close()
        }
    },
    "info": {
        "description": "Show info about the terminal",
        "action": function () {
            let text = document.createElement("p");
            text.innerHTML = "Author: " + "Synical";
            document.body.appendChild(text);

            text = document.createElement("p");
            text.innerHTML = "Version: " + version;
            document.body.appendChild(text);
        }
    }
}



var cursor = document.createElement("span");

for (let i = 0; i < textinit.length; i++) {
    let textPara = document.createElement("p");
    textPara.innerHTML = textinit[i];
    document.body.appendChild(textPara);
}

var para = paraTemp.cloneNode(true);
let node = document.createTextNode('terminal:~$ ');
para.appendChild(node);
document.body.appendChild(para);

document.addEventListener('keydown', function (event) {
    cursor.style.visibility = "visible";
    if (event.key === "Enter") {
        para.removeChild(cursor)
        commandHandler(para.innerHTML.substring(para.innerHTML.indexOf(" ") + 1));
        // Create a breakline element
        para = paraTemp.cloneNode(true);
        document.body.appendChild(para);
        // Append the breakline element to the paragraph
        let node = document.createTextNode('terminal:~$ ');

        para.appendChild(node);
        para.appendChild(cursor)
        return
    }

    if (event.key === "Backspace") {
        para.removeChild(cursor)
        if (para.lastChild.nodeValue === 'terminal:~$ ') {
            para.appendChild(cursor)
            return
        }
        para.removeChild(para.lastChild);
        para.appendChild(cursor)

        return
    }

    let node = document.createTextNode(event.key);
    para.appendChild(node);

    para.removeChild(cursor)
    para.appendChild(cursor)
});

cursor.className = "cursor";
var text = document.createTextNode("█");
cursor.appendChild(text);
para.appendChild(cursor);
setInterval(function () {
    if (cursor.style.visibility === "visible") {
        cursor.style.visibility = "hidden";
    } else {
        cursor.style.visibility = "visible";
    }

}
    , 500);


function commandHandler(command) {
    if (command in commands) {
        commands[command].action();
    } else {
        let textPara = document.createElement("p");
        textPara.innerHTML = "Command not found";
        document.body.appendChild(textPara);
    }
}