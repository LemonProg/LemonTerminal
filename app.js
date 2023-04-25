const command = document.querySelector('#command');
const logDiv = document.querySelector('.console-logs');
const front_guest_text = document.querySelector('#front-guest-text');

let front_text = "guest@console: ~$";
let stage = 0;
let isPasswordChecking = false;
let isAdmin = false;
let username = "guest";
let userCommandsArray = []
let cmdArray = [{
    'ls': "Displays all the folder in the current directory",
    'help': "You just discover what this command do",
    'whoami': "Displays the active user",
    "clear": "Clean terminal",
    'lemon': "Introduces the Lemon guy",
    "projects": "Shows my coding projects",
    "secret": "Search for the password !",
    "sudo": "Activates admin permissions (ONLY USE IF YOU'RE ADMIN !!!)",
    "pwd": "Displays the current directory full path",
    "cd": "Allows you to navigate throught folders (ex: 'cd ..' : goes folder back)",
    "cat": "Shows the content of a file",
    "history": "Gives you all commands you typed",
    "contact": "Displays my discord account to contact me"
}]

function consoleResponse(log, input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    let response = document.createElement('p');
    response.className = "text-style-response log";
    response.textContent = log;
    logDiv.appendChild(response)
}
function consoleResponse_history(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    userCommandsArray.forEach(cmds => {    
        let response = document.createElement('p');
        response.className = "text-style-responseRight log";
        response.textContent = cmds;
        logDiv.appendChild(response)
    });

}
function consoleResponse_help(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    // Creating divs
    let divMain = document.createElement('div');
    divMain.className = "div-help-main log";
    
    let divCmd = document.createElement('div');
    divCmd.className = "div-help-cmd log";

    let divTxt = document.createElement('div');
    divTxt.className = "div-help-txt log";

    logDiv.appendChild(divMain)
    divMain.appendChild(divCmd)
    divMain.appendChild(divTxt)

    // Loop to get every element of CMD ARRAY
    Object.entries(cmdArray[0]).forEach(([title, desc]) => {
        // Creating CMD's elements
        let cmd = document.createElement('p')
        cmd.className = "text-style-response log"
        cmd.textContent = title
        divCmd.appendChild(cmd)
        // Creating TXT's elements
        let txt = document.createElement('p')
        txt.className = "text-style-responseRight log"
        txt.textContent = desc
        divTxt.appendChild(txt)
    });
}

function consoleResponse_ls(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    let lsDiv = document.createElement('div');
    lsDiv.className = "div-ls-command log";
    logDiv.appendChild(lsDiv)

    let response = document.createElement('p');
    response.className = "text-style-response log";
    response.textContent = "./";
    lsDiv.appendChild(response)

    if (stage === 0) {
        return;
    }
    else if (stage === -1) {
        nameFolder1 = "terminal"
        nameFolder2 = "secret"

        let folder1 = document.createElement('p');
        folder1.className = "text-style-responseRight log";
        folder1.textContent = nameFolder1;
        lsDiv.appendChild(folder1)
    
        let folder2 = document.createElement('p');
        folder2.className = "text-style-responseRight log";
        folder2.textContent = nameFolder2;
        lsDiv.appendChild(folder2)
    }
    else if (stage === 1) {
        let file = document.createElement('p');
        file.className = "text-style-file log";
        file.textContent = "password.txt";
        lsDiv.appendChild(file)
    }
}

function consoleResponse_pwd(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    if (stage === 0) {
        pos = "/home/guest/terminal";
    }
    else if (stage === -1) {
        pos = "/home/guest";
    } 
    else if (stage === 1) {
        pos = "/home/guest/secret";
    }

    let response = document.createElement('p');
    response.className = "text-style-response log";
    response.textContent = pos;
    logDiv.appendChild(response)
}
function consoleResponse_cd(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    if (input === "cd ..") {
        stage = -1
    }
    else if(input === "cd") {
        let response = document.createElement('p');
        response.className = "text-style-response log";
        response.textContent = `'${input}': you have to specify a folder`;
        logDiv.appendChild(response)
    }
    else if(input === "cd secret" && stage == -1) {
        stage = 1
    }
    else if(input === "cd terminal" && stage == -1) {
        stage = 0
    }
    else {
        let response = document.createElement('p');
        response.className = "text-style-response log";
        response.textContent = `'${input}': no such file or directory`;
        logDiv.appendChild(response)
    }
}
function consoleResponse_cat(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    if(input === "cat") {
        let response = document.createElement('p');
        response.className = "text-style-response log";
        response.textContent = `'${input}': you have to specify a file`;
        logDiv.appendChild(response)
    }
    else if(input === "cat password" || input === "cat password.txt") {
        let response = document.createElement('p');
        response.className = "text-style-file log";
        response.textContent = `'TGVtb25TcXVpemk='`;
        logDiv.appendChild(response)

        let divHover = document.createElement("div");
        divHover.className = 'div-hover-hint log';
        logDiv.appendChild(divHover);

        let textHint = document.createElement('p');
        textHint.className = "text-style-responseRight log";
        textHint.textContent = `HINT :`;
        divHover.appendChild(textHint)

        let hover = document.createElement('p');
        hover.className = "text-hover-hint log text-style-responseRight";
        hover.textContent = `base64`;
        divHover.appendChild(hover)

    }
    else {
        let response = document.createElement('p');
        response.className = "text-style-response log";
        response.textContent = `'${input}': command not recognized`;
        logDiv.appendChild(response)
    }
}
function consoleResponse_secret(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    front_guest_text.textContent = "Password: ";
    command.setAttribute('type', 'password');
    
    isPasswordChecking = true
}

function consoleResponse_sudo(input) {
    let receivedCommand = document.createElement('p');
    receivedCommand.className = "text-style-main log";
    receivedCommand.textContent = front_text + " " + input;
    logDiv.appendChild(receivedCommand)

    let sudoCommand = document.createElement('p');
    sudoCommand.className = "text-style-file log";
    sudoCommand.textContent = "Good Job, You just win ............. MY RESPECT !";
    logDiv.appendChild(sudoCommand)

    username = "admin";
    front_text = "admin@console: ~$";
    front_guest_text.textContent = front_text;
}

function consoleResponseOnly(log) {
    let text = document.createElement('p');
    text.className = "text-style-responseRight shorter-text log";
    text.textContent = log;
    logDiv.appendChild(text)
}

function consoleResponseEmpty() {
    let emptyCommand = document.createElement('p');
    emptyCommand.className = "text-style-main log";
    emptyCommand.textContent = front_text;
    logDiv.appendChild(emptyCommand)
}
function consoleClear() {
    const logs = document.querySelectorAll('.log'); // get all elements above the input

    logs.forEach(log => {
        log.remove(); // remove them from the page
    });
}

function checkCommand(input) {
    let ls = Object.keys(cmdArray[0])[0];           // LS COMMAND
    let help = Object.keys(cmdArray[0])[1];         // HELP COMMAND
    let whoami = Object.keys(cmdArray[0])[2];       // WHOAMI COMMAND
    let clear = Object.keys(cmdArray[0])[3];        // CLEAR COMMAND
    let lemon = Object.keys(cmdArray[0])[4];        // LEMON COMMAND
    let projects = Object.keys(cmdArray[0])[5];     // PROJECTS COMMAND
    let secret = Object.keys(cmdArray[0])[6];       // SECRET COMMAND
    let sudo = Object.keys(cmdArray[0])[7];         // SUDO COMMAND
    let pwd = Object.keys(cmdArray[0])[8];          // PWD COMMAND
    let cd = Object.keys(cmdArray[0])[9];           // CD COMMAND
    let cat = Object.keys(cmdArray[0])[10];         // CAT COMMAND
    let history = Object.keys(cmdArray[0])[11];     // HISTORY COMMAND
    let contact = Object.keys(cmdArray[0])[12];     // CONTACT COMMAND

    if (input === ls) { 
        consoleResponse_ls(input);
    }
    else if (input === help) {
        consoleResponse_help(input);
    } 
    else if (input === whoami) { 
        consoleResponse(username, input);
    } 
    else if (input === clear) { 
        consoleClear();
    } 
    else if (input === pwd) {
        consoleResponse_pwd(input);
    }
    else if (input.startsWith(cd)) {
        consoleResponse_cd(input);
    }
    else if (input.startsWith(cat)) {
        consoleResponse_cat(input);
    }
    else if (input === secret) {
        consoleResponse_secret(input);
    }
    else if (input === history) {
        consoleResponse_history(input);
    }
    else if (input === contact) {
        consoleResponse("Discord : LEMON シ#7313", input);
    }
    else if (input === projects) {
        consoleResponse("My Githubs projects", input);

        consoleResponseOnly(`LemonFlix : A reproduction of the most popular streaming website "Netflix", but for watching animes for free ! This website was my biggest project but I decided to stop developing it anymore for servals resons like my horrible coding method (it was litteraly spagetti coding) and some legals resons too... I coded this website using PHP and MYSQL for user database and video storage.`);

        consoleResponseOnly(`DTM : Discord-Torrent-Manager is a powerfull bot to download and manage torrents through a discord server. You can search the torrent using the Torrent-search API, download it on your home server or a cloud service using the qBittorent API, then you can get the download speed, the progression, the left time, you can pause/resume the torrent. With DTM you can now easly download torrent using your phone or any hardware who running discord ! All of this is coded with nodejs.`);

        consoleResponseOnly(`Pronote-Webhooks : I used Discord webhooks to get my day's timetable, my homeworks and the day's meal, using a pronote API coded in Python. I put that on a linux server with a crontab, so i can access all of this daily on my Discord server.`);
    
        consoleResponseOnly(`Pronote-Webhooks : I used Discord webhooks to get my day's timetable, my homeworks and the day's meal, using a pronote API coded in Python. I put that on a linux server with a crontab, so i can access all of this daily on my Discord server.`);

        consoleResponseOnly(`Valorant-Instalocker : A Python GUI application to lock your favorite agent before everyone ! This one is not working for the moment because riot games release 2 new agents, so I have move all the cursors positions (I don't really have the motivation for xD).`);

        consoleResponseOnly(`BurgerKing : I made a brand new website for the Steakhouse BurgerKing product, because I was bored and I wanted to train scroll effects and my website designs in Figma. Link : "https://lemonprog.github.io/BurgerKing/"`);
    }
    else if (input === lemon) {
        consoleResponse("Hi, I'm Lemon !👋", input);
        consoleResponseOnly("I'm a French, 14 years old student who loves coding, for the moment I'm able to code in HTML/CSS, Javascript (and nodejs but it's almost the same thing), PHP and Python. I would like to learn ReactJS or any framework too. I also do some editing videos (AMV), I love animes/mangas univers (One piece supremacy). I do Valorant montage as well because this game is amazing. Whatever, I would like to because a fullstack web developper, but i don't like school xD. If you want to contact me, I don't have a discord server because i'm not famous lmao but here my discord account : LEMON シ#7313")
    }
    else if (input === sudo) {
        if(!isAdmin) {
            consoleResponse("You don't have the permission to do this, here your punishment", input)
            setTimeout(function() {
                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
            }, 1500)
        } else {
            consoleResponse_sudo(input);
        }
    }
    else if (input.trim() === '') {
        consoleResponseEmpty();
    }
    else {
        consoleResponse(`'${input}': command not recognized`, input);
    }
}

function checkPassword(input) {
    if(input === "LemonSquizi") {
        content = "Admin permissions Unlocked !"
        isAdmin = true;
    } else {
        content = "Wrong password"
    }
    let wrong = document.createElement('p');
    wrong.className = "text-style-responseRight log";
    wrong.textContent = content;
    logDiv.appendChild(wrong)

    // Enable back front text and set type to text
    front_guest_text.textContent = front_text;
    command.setAttribute('type', 'text');
    isPasswordChecking = false;
}

let userKeyPosition = 0;
function keyUpCommand() {
    if (userCommandsArray.length != 0 && (userKeyPosition + 1) <= userCommandsArray.length) {
        userKeyPosition++;
        command.value = userCommandsArray[userKeyPosition - 1];
    }
}

function keyDownCommand() {
    if (userCommandsArray.length != 0 && (userKeyPosition - 2) >= 0) {
        userKeyPosition--;
        command.value = userCommandsArray[userKeyPosition - 1];
    }
}

document.addEventListener('keydown', (event) => { // DETECT WHEN THE USER SEND THE COMMAND (when pressing enter)
    if (event.keyCode === 13 || event.which === 13) {        
        let input = command.value;
        
        if(!isPasswordChecking) {
            checkCommand(input);
            userCommandsArray.unshift(input); // SAVE THE COMMAND IN THE ARRAY
        } else {
            checkPassword(input);
        }
        command.value = "";
        userKeyPosition = 0;
    }
    if(!isPasswordChecking) {
        if (event.keyCode === 38 || event.which === 38) {
            keyUpCommand();
        }
        if (event.keyCode === 40 || event.which === 40) {    
            keyDownCommand();
        }
    }
})

// Focus on input when clicking somewhere else
document.addEventListener('click', () => {
    command.focus();
})

