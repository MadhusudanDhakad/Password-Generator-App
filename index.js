const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#upperCase");
const lowerCaseCheck = document.querySelector("#lowerCase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".btn-container");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc"); 

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
    indicator.style.backgroundColor = color; 
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}


function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8){
        setIndicator('#0f0');
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}

// const copyMsg = document.querySelector("[data-copyMsg]");

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}



function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });
    
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})


generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    let funcArr = [];

    if(upperCaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowerCaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numberCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});



document.addEventListener('DOMContentLoaded', (event) => {
    const body = document.body;
    const container = document.querySelector(".container");
    const toggleBtn = document.querySelector(".toggle-btn");
    const lightMode = document.getElementById("sun");
    const darkMode = document.getElementById("moon");
    // const displayScreen = document.querySelector(".display");
    const inputContainer = document.querySelector(".input-container");
    const displayContainer = document.querySelector(".display-container");

    darkMode.classList.add("active");
    body.classList.add("light-mode");
    container.classList.add("light-mode");
    passwordDisplay.classList.add("light-mode");
    inputContainer.classList.add("light-mode");
    displayContainer.classList.add("light-mode");
    generateBtn.classList.add("light-mode");

    darkMode.addEventListener("click", () => {
        if(!body.classList.contains("dark-mode")){
            darkMode.classList.remove("active");
            body.classList.remove("light-mode");
            container.classList.remove("light-mode");
            passwordDisplay.classList.remove("light-mode");
            inputContainer.classList.remove("light-mode");
            displayContainer.classList.remove("light-mode");
            generateBtn.classList.remove("light-mode");
            body.classList.add("dark-mode");
            container.classList.add("dark-mode");
            passwordDisplay.classList.add("dark-mode");
            inputContainer.classList.add("dark-mode");
            displayContainer.classList.add("dark-mode");
            generateBtn.classList.add("dark-mode");
            lightMode.classList.add("active");
        }
    });

    lightMode.addEventListener("click", () => {
        if(!body.classList.contains("light-mode")){
            lightMode.classList.remove("active");
            body.classList.remove("dark-mode");
            container.classList.remove("dark-mode");
            passwordDisplay.classList.remove("dark-mode");
            inputContainer.classList.remove("dark-mode");
            displayContainer.classList.remove("dark-mode");
            generateBtn.classList.remove("dark-mode");
            body.classList.add("light-mode");
            container.classList.add("light-mode");
            passwordDisplay.classList.add("light-mode");
            inputContainer.classList.add("light-mode");
            displayContainer.classList.add("light-mode");
            generateBtn.classList.add("light-mode");
            darkMode.classList.add("active");

        }
    });

});
