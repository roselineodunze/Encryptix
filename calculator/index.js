//calculator display
const main = document.querySelector(".main")
const themeDiv = document.querySelector(".theme")
const themeBtn = themeDiv.querySelectorAll("button")
const brightBtn = document.querySelector(".bi-brightness-high")
const darkBtn = document.querySelector(".bi-moon-stars-fill")
const calculatorBg = document.querySelector(".calculator")
const answerText = document.querySelector(".text h1")
const calcBtn = document.querySelectorAll(".calc-btn")

let isDarkTheme = false

function toggleDarkTheme(isDark) {
    main.classList.toggle("dark-bg", isDark);
    themeDiv.classList.toggle("grey-bg", isDark);
    themeDiv.classList.toggle("box-shadow", !isDark);
    brightBtn.classList.toggle("bright-svg", isDark);
    calculatorBg.style.setProperty('background-color', isDark ? '#343434' : '#eee');
    answerText.classList.toggle("white-text", isDark);
    calcBtn.forEach(button => {
        button.classList.toggle("white-text", isDark);
        button.style.setProperty('background-color', isDark ? '#262525' : '#ddd');
    });
}

function chechThemeButton(svg){
    isDarkTheme = svg.classList.contains("bi-moon-stars-fill")
    toggleDarkTheme(isDarkTheme)
}

themeBtn.forEach(button => {
    button.addEventListener('click', function() {

        const btnSvg = this.querySelector('svg')
        chechThemeButton(btnSvg)
    });
});

toggleDarkTheme(isDarkTheme)

//calculator functions
const calcButtons = document.querySelectorAll('.calc-btn');
let queryText = "";
let answer = 0;
let numOfOperators = 0;
let firstNum = "";
let secondNum = "";
let prevOperator = "";

const operate = (operator, first, second) => {
    switch (operator) {
        case '+': answer = parseFloat(first) + parseFloat(second); break;
        case '-': answer =  parseFloat(first) - parseFloat(second); break;
        case 'x': answer =  parseFloat(first) * parseFloat(second); break;
        case '÷': answer =  parseFloat(first) / parseFloat(second); break;
        case '%': answer =  (parseFloat(first) * parseFloat(second)) / 100; break;
        case 'x2': answer =  parseInt(first) ** 2; break;
        default: answer = 0; break;
    }
    queryText = answer
    firstNum = answer.toString()
};
function checkOperators(text){
    numOfOperators++;
    if (numOfOperators > 1) {
        let words = queryText.trim().split(/\s+/);
        secondNum = words[words.length - 1];
        operate(prevOperator, firstNum, secondNum)
        prevOperator = text
        queryText = answer + " " + text + " ";
    } else{
        firstNum = queryText
        queryText += " " + text + " ";
        prevOperator = text
    }
}

function calculate(text) {
    if (text === "x2"){
        firstNum = queryText
        operate(text, firstNum, secondNum)
    } else if (text === "="){
        const lastChar = queryText.trim().slice(-1);
        if (['+', '-', 'x', '÷', '%', '.'].includes(lastChar)) {
            return;
        } else {
            checkOperators(text);
            numOfOperators = 0
            queryText = answer
            firstNum = answer.toString()
        }
    }else {
        checkOperators(text);
    }
}

calcButtons.forEach(button => {
    button.addEventListener('click', function() {
        const isFunc = button.classList.contains("func")
        if (isFunc && queryText.length < 1){} else{
            const buttonText = this.querySelector('p').textContent.trim(); // Trim to remove whitespace
            const pTag = document.querySelector('.text p');
            switch (buttonText) {
                case '+':
                case '÷':
                case '-':
                case 'x':
                case '%':
                case 'x2':
                case '=':
                    calculate(buttonText);
                    break;
                case 'AC':
                    queryText = "";
                    answer = "0";
                    numOfOperators = 0;
                    firstNum = "";
                    secondNum = "";
                    prevOperator = "";
                    break;
                case 'R':
                    break;
                default:
                    queryText += buttonText;
                    break;
            }
            pTag.textContent = queryText;
            answerText.textContent = answer.toString()
    }});
});
