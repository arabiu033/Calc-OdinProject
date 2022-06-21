let holder = ["", ""];
let tracker = 0;
let action = ""
let endSignal = false;

const screen = document.querySelector('#screen');
const data = document.createElement('p');
data.textContent = 0;
screen.appendChild(data);

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        processor(btn.id);
})
})

window.addEventListener('keydown', e => {
    if(e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57)
        processor(e.key);
    else if (e.key.charCodeAt(0) === 66)
        processor('bs');
    else {}
})

function mapper(sm) {
    if (sm === '+' || sm === '-' || sm === '/' || sm === '*')
     return true;
}

function operate(ar, action) {
    let a = ar[0];
    let b = ar[1];    
    holder[1]="";
    tracker = 0;

    switch (action) {
        case "+": holder[0] = add(+a, +b); break;
        case "-": holder[0] = subtract(+a, +b); break;
        case "/": holder[0] = divide(+a, +b); break;
        case "*": holder[0] = multiply(+a, +b); break;
    }

   endSignal = false;
}

function add(a, b){
    if (endSignal)
     data.textContent = (a+b);
    return endSignal ? "" : (a+b);
}

function subtract(a,b){
    if (endSignal)
     data.textContent = (a-b);
    return endSignal ? "" : (a - b);
}

function divide(a, b){

    if (b === 0) {
        data.textContent = "error";
        return "";
    }
    if (endSignal)
     data.textContent = (a/b);
    return endSignal ? "" : (a / b);
}

function multiply(a, b) {
    if (endSignal)
     data.textContent = (a*b);
    return endSignal ? "" : (a * b);
}

function percentage(){
    if (holder[0].length !== 0 && holder[1].length === 0) {
        holder[0] = holder[0] / 100;
        data.textContent = holder[0];
    }
    else if (holder[0].length !== 0 && holder[1].length !== 0) {
        holder[1] = holder[1] / 100;
        data.textContent = holder[0] +" "+action +" "+ holder[1];
    }
    else {}
}

function signToggle(){
    if (holder[0].length !== 0 && holder[1].length === 0) {
        holder[0] = 0 - holder[0];
        data.textContent = holder[0];
    }
    else if (holder[0].length !== 0 && holder[1].length !== 0) {
        holder[1] = 0 - holder[1];
        data.textContent = holder[0] +" "+action +" "+ holder[1];
    }
    else {}
}

function dotChecker(){
    if (holder[0].length !== 0 && holder[1].length === 0) {
        holder[0] += (holder[0].split("")).some(sm => sm === '.') ? "" : '.';
        data.textContent = holder[0];
    }
    else if (holder[0].length !== 0 && holder[1].length !== 0) {
        holder[1] += (holder[1].split("")).some(sm => sm === '.') ? "" : '.';
        data.textContent = holder[0] +" "+action +" "+ holder[1];
    }
    else {}
}

function backspace(){

    if(action.length != 0 && holder[1].length === 0){
         action = "";
         tracker = 0;
         data.textContent = holder[0];
    }
    else if (holder[0].length !== 0 && holder[1].length === 0) {
        holder[0] = holder[0].substring(0, holder[0].length-1);
        data.textContent = holder[0] === "" ? 0 : holder[0];
    }
    else if (holder[0].length !== 0 && holder[1].length !== 0) {
        holder[1] = holder[1].substring(0, holder[1].length-1);
        data.textContent = holder[0] +" "+action +" "+ holder[1];
    }
    else {}
}

function processor(btn) {
    if (mapper(btn) && holder[tracker].length === 0){
        holder[tracker] += btn === '-' ? btn : "";
        data.textContent = holder[0] +" "+action +" "+ holder[1];
    }      
    else if (btn === '='){
        endSignal = true;
        operate(holder, action) 
        action = "";
    }
    else if (btn === "ac"){
        holder[0] = "";
        holder[1] = "";
        action = "";
        tracker = 0;
        data.textContent = 0;
    }
    else if (btn === '%')
        percentage();
    else if (btn === '~')
        signToggle();
    else if (btn === '.')
        dotChecker();
    else if (btn === 'bs')
        backspace();
    else {
        if (mapper(btn)) {
            if (tracker === 0){
                action = btn;
                data.textContent = holder[0] +" "+action +" "+ holder[1];
                ++tracker;
            }
            else {
                operate(holder, action);
                action = btn;
                data.textContent = holder[0] +" "+action +" "+ holder[1];
                ++tracker;
            }
        }
        else {
            holder[tracker] += btn;
            data.textContent = holder[0] +" "+action +" "+ holder[1];
        }
    }
}