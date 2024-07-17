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
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc"); 

// const inputSlider = document.querySelector("[data-lengthSlider]");
// const lengthDisplay = document.querySelector("[data-lengthNumber]");

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

// const indicator = document.querySelector("[data-indicator]");

function setIndicator(color){
    indicator.style.backgroundColor = color; 
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
// const upperCaseCheck = document.querySelector("#upperCase");
// const lowerCaseCheck = document.querySelector("#lowerCase");
// const numberCheck = document.querySelector("#numbers");
// const symbolCheck = document.querySelector("#symbols");

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



// generateBtn.addEventListener('click', () => {
//     if(checkCount == 0) return;

//     if(passwordLength < checkCount){
//         passwordLength = checkCount;
//         handleSlider();
//     }

//     // generate new password 
//     // remove old password 
//     password = "";

//     let funArray = [];

//     if(upperCaseCheck.checked)
//         funArray.push(generateUpperCase);

//     if(lowerCaseCheck.checked)
//         funArray.push(generateLowerCase);

//     if(numberCheck.checked)
//         funArray.push(generateRndNumber);

//     if(symbolCheck.checked)
//         funArray.push(generateSymbols);

//     // compulsary addition 
//     for(let i=0; i<funArray.length; i++){
//         password += funArray[i]();
//     }

//     // remaining addition 
//     for(let i=0; i<passwordLength-funArray.length; i++){
//         let randomIndex = getRndInteger(0, funArray.length);
//         password += funArray[randomIndex]();
//     }

//     password = shufflePassword(Array.from(password));
//     passwordDisplay.value = password;

//     calcStrength();
// })

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

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

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