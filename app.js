import lang from "./lang.js";

var maxNumber = 10;
var targetNumber = 0;

const tryNumber = () => {
  let inputTry = document.getElementById("inputTry");
  inputTry.setAttribute("max", 15);
  setStrings("title", inputTry.value);
};

const setStrings = (id, string) => {
  let element = document.getElementById(id);
  element.innerText = string;
};

const setTargetNumber = () => {
  targetNumber = Math.floor(Math.random() * maxNumber + 1);
};
const setMaxNumber = () => {
  maxNumber = 80;
};

const setup = () => {
  setStrings("title", "Adivina el número");
  setStrings("mainParag", "Ingresa un número del 1 al " + maxNumber);
  setTargetNumber();
  console.log(targetNumber);
};

//setup();

let test = document.getElementById("test");
test.innerText = lang.ES.title;
