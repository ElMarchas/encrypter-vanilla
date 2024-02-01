import lang from "./assets/lang.js";

var data = {
  language: "ES",
  maxChars: 30,
  isPro: true,
  conLabel: document.getElementById("conLabel"),
  conLive: document.getElementById("conLive"),
  divConLabel: document.getElementById("divConLabel"),
  divConLive: document.getElementById("divConLive"),
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

const setVersion = () => {
  //arriba es pro abajo es normal
  if (data.isPro) {
    data.modal.btnYes.innerHTML = lang[data.language].modalAccept[1];
    data.conLabel.style.visibility = "hidden";
    data.conLive.style.visibility = "visible";
    data.maxChars = 4000;

    data.conLabel.innerHTML = "";
    data.divConLabel.classList.remove("hc-c2", "hc1");
    data.divConLabel.classList.add("hc6");
    data.divConLive.classList.remove("hc6");
    data.divConLive.classList.add("hc-c2", "hc1");
  } else {
    data.modal.btnYes.innerHTML = lang[data.language].modalAccept[0];
    data.conLabel.style.visibility = "visible";
    data.conLive.style.visibility = "hidden";
    data.maxChars = 30;

    data.conLabel.innerHTML = lang[data.language].conLabel;
    data.divConLive.classList.remove("hc-c2", "hc1");
    data.divConLive.classList.add("hc6");
    data.divConLabel.classList.remove("hc6");
    data.divConLabel.classList.add("hc-c2", "hc1");

    //si esta en automatico desactivalo
  }
  if (data.inputIn.value.length > data.maxChars)
    data.inputIn.value = data.inputIn.value.substring(0, data.maxChars);

  setInputChars(data.inputIn.value.length);
};

const setLanguage = (_lang) => {
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
    if (key == "modalAccept") {
      if (data.isPro) d.getElementById(key).innerText = lang[_lang][key][1];
      else d.getElementById(key).innerText = lang[_lang][key][0];
    }
    if (key == "conLabel" && data.isPro) {
      d.getElementById(key).innerText = "";
    }
  });
};

const changeLanguage = () => {
  if (data.language == "ES") data.language = "EN";
  else data.language = "ES";
  return setLanguage(data.language);
};

const openModal = () => {
  data.modal.main.style.display = "block";
};

const closeModal = (event) => {
  data.modal.main.style.display = "none";
  if (!event.currentTarget.ispro) return;
  data.isPro = !data.isPro;
  setVersion();
};

window.onclick = function (event) {
  if (event.target == data.modal.main) {
    data.modal.main.style.display = "none";
  }
  //este lo puedes meter abajo en data.moda.main tal vez con click
};

/*
esto para detectar ctl+v si es necesario
window.onkeydown = function (event) {
  console.log(event);
};
*/

const setup = () => {
  setLanguage(data.language);
  setInputChars(0);
  setVersion();

  data.inputIn.addEventListener("input", inputInHandler);
  data.inputOut.addEventListener("change", inputOutHandler);
  data.inputCard.addEventListener("click", inputInFocus);

  data.buttons.bntLang.addEventListener("click", changeLanguage);
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
