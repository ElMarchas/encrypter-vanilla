import lang from "./assets/lang.js";

var data = {
  languaje: "EN",
  maxChars: 30,
  inputIn: document.getElementById("inputIn"),
  inputCard: document.getElementById("inputCard"),
  inputCardFoot: document.getElementById("inputCardFoot"),
  inputOut: document.getElementById("inputOut"),
  outputCard: document.getElementById("outputCard"),
  buttons: {
    bntLang: document.getElementById("btnLang"),
    bntPro: document.getElementById("btnPro"),
    btnEncry: document.getElementById("btnEncrypt"),
    btnDecry: document.getElementById("btnDecrypt"),
    btnSwap: document.getElementById("btnSwap"),
    btnErase: document.getElementById("btnErase"),
    btnCopy: document.getElementById("btnCopy"),
    btnCopy2: document.getElementById("btnCopy2"),
  },
  modal: {
    main: document.getElementById("mainModal"),
    btnClose: document.getElementById("modalClose"),
    btnYes: document.getElementById("modalAccept"),
    btnNo: document.getElementById("modalCancel"),
  },
};

const inputInHandler = (e) => {
  let handler = e.target.value;
  //console.log(e.target.value);
  data.inputOut.value = e.target.value;

  if (e.target.value.length > data.maxChars) {
    handler = handler.substring(0, data.maxChars);

    data.inputIn.value = handler;
  }

  setInputChars(handler.length);
};

const inputInFocus = () => {
  data.inputIn.focus();
};

const inputOutHandler = (e) => {
  /*

   <div id="box">
      <!-- this is a comment -->
    </div>

  if (box.textContent.trim() === '') {
  console.log('✅ Element is empty');
} else {
  console.log('⛔️ Element is NOT empty');
}
  */
  console.log("estoy dentro");
  console.log(e.target.value);
};

const setInputChars = (chars) => {
  data.inputCardFoot.innerHTML = `${chars}/${data.maxChars}`;
};

const setLanguaje = (_lang) => {
  if (_lang != "ES" && _lang != "EN") _lang = "ES";
  let d = document;

  Object.keys(lang[_lang]).forEach((key) => {
    d.getElementById(key).innerText = lang[_lang][key];
    if (key == "inputOut" || key == "inputIn") {
      d.getElementById(key).innerText = "";
      d.getElementById(key).setAttribute("placeholder", lang[_lang][key][0]);
    }
    if (key == "modalSubContent") {
      d.getElementById(key).innerHTML = lang[_lang][key];
    }
  });
};

const changeLanguaje = () => {
  if (data.languaje == "ES") data.languaje = "EN";
  else data.languaje = "ES";
  return setLanguaje(data.languaje);
};

const openModal = () => {
  data.modal.main.style.display = "block";
};

const closeModal = (event) => {
  data.modal.main.style.display = "none";
  if (!event.currentTarget.ispro) return;

  console.log("aactivar version pro");
  //activar version pro
};

window.onclick = function (event) {
  if (event.target == data.modal.main) {
    data.modal.main.style.display = "none";
  }
  //este lo puedes meter abajo en data.moda.main tal vez con click
};

/*

window.onkeydown = function (event) {
  console.log(event);
};
*/

const setup = () => {
  setLanguaje(data.languaje);
  setInputChars(0);

  data.inputIn.addEventListener("input", inputInHandler);
  data.inputOut.addEventListener("change", inputOutHandler);
  data.inputCard.addEventListener("click", inputInFocus);

  data.buttons.bntLang.addEventListener("click", changeLanguaje);
  data.buttons.bntPro.addEventListener("click", openModal);

  data.buttons.btnErase.addEventListener("click", () => {
    data.inputIn.value = "";
  });
  data.buttons.btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(data.inputOut.value);
  });
  data.buttons.btnCopy2.addEventListener("click", () => {
    navigator.clipboard.writeText(data.inputOut.value);
  });

  data.modal.btnClose.addEventListener("click", closeModal);
  data.modal.btnNo.addEventListener("click", closeModal);
  data.modal.btnYes.addEventListener("click", closeModal);
  data.modal.btnYes.ispro = true;
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
