import lang from "./assets/lang.js";

var data = {
  languaje: "EN",
  bntLang: document.getElementById("btnLang"),
  bntPro: document.getElementById("btnPro"),
  bntPro: document.getElementById("btnPro"),
  btnEncry: document.getElementById("btnEncrypt"),
  btnDecry: document.getElementById("btnDecrypt"),
  btnSwap: document.getElementById("btnSwap"),
  btnCopy: document.getElementById("btnCopy"),
};

const setLanguaje = (_lang) => {
  if (_lang != "ES" && _lang != "EN") _lang = "ES";
  let d = document;

  Object.keys(lang[_lang]).forEach((key) => {
    d.getElementById(key).innerText = lang[_lang][key];
    if (key == "inputOut") {
      d.getElementById(key).innerText = lang[_lang][key][0];
    }
  });
};

const changeLanguaje = () => {
  if (data.languaje == "ES") data.languaje = "EN";
  else data.languaje = "ES";
  return setLanguaje(data.languaje);
};

const setup = () => {
  setLanguaje(data.languaje);

  data.bntLang.addEventListener("click", changeLanguaje);
};

setup();

/*

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


*/
