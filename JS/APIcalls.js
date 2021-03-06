let display = document.querySelector("#response");

// REQUEST SERVER DATA
const REQ = new XMLHttpRequest();

function getJsonTodos() {
    REQ.onload = () => {
        if (REQ.status === 200 & REQ.readyState === 4) {
            console.log(REQ);
            console.log(REQ.response);
            console.log(REQ.response.title);
            // QUICK WAY TO INSERT INTO HTML
            // document.querySelector('#response').innerHTML = REQ.response.title;
            // FUCTION TO INSERT INTO HTML
            buildPString(display, 1);
        } else {
            console.log(`Oh no! You should handle the Error(s)!`);
        }
    }
    REQ.open('GET', 'http://jsonplaceholder.typicode.com/todos/1'); // type of request, url = first entry
 //   REQ.open('GET', 'http://jsonplaceholder.typicode.com/todos/'); // this url is for all 200 entries
    REQ.setRequestHeader('Content-Type', 'Application/json');
    REQ.setRequestHeader('Access-Control-Allow-Origin', '*');
    REQ.responseType = 'json';
    REQ.send();
}

let bRequest = document.querySelector('#bRequest');
bRequest.addEventListener('click', getJsonTodos);

    function buildPString(placeholder, number){
            let newPTag = document.createElement("p");
            let newTextNode;
            if (number === 1) {
                newTextNode = document.createTextNode(`You have retrieved some data! Id: ${REQ.response.id} Title: ${REQ.response.title}`); // could add a for loop to cycle through properties
                newPTag.appendChild(newTextNode);
                placeholder.appendChild(newPTag);
            } if (number === 2) {
                newTextNode = document.createTextNode(`Some data has been posted! Check the console log to see what.`);
                newPTag.appendChild(newTextNode);
                placeholder.appendChild(newPTag);
            } 
    }



// POST INFO TO SERVER (not the site itself...)
let data = '{"title": "foo","body": "bar","userId": 1}';
function postTodo() {
    REQ.onload = () => {
        if (REQ.status === 201) {
            console.log(REQ.response);
            console.log("The above data has been posted!");
            buildPString(display, 2);
        } else {
            console.log('Oh no! You should handle the Error(s)!');
        }
    }
    REQ.open('POST', 'http://jsonplaceholder.typicode.com/posts');
    REQ.setRequestHeader('Content-Type', 'Application/json');
    REQ.setRequestHeader('Access-Control-Allow-Origin', '*');
    REQ.send(data); // What we want to send across
}

let butt2 = document.querySelector('#bPost');
butt2.addEventListener('click', postTodo);

let bClear = document.querySelector('#bClear');
bClear.addEventListener('click', removeString);
// can't pass a method into the event listener or it will just execute!!

function removeString () {
    console.log("These are the current nodes...");
    let pTags = display.childNodes;
    console.log(pTags);
    pTags.forEach(element => {
        if (element.textContent != " "){
        element.textContent = " ";
        console.log("The for each loop is being executed...");
        console.log("A node has been cleared but still exist until the page is refreshed!");
       // display.removeChild(pTags[element]);
        }
    });
}
  