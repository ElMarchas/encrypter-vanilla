import lang from "./assets/lang.js";

var data = {
  language: "ES",
  maxChars: 120,
  isPro: false,
};

const EL = {
  test: document.getElementById("test"),
  test2: document.getElementById("test2"),
  isPro: {
    label: document.getElementById("conLabel"),
    live: document.getElementById("conLive"),
    divLabel: document.getElementById("divConLabel"),
    divLive: document.getElementById("divConLive"),
  },
  input: {
    in: document.getElementById("inputIn"),
    card: document.getElementById("inputCard"),
    cardFoot: document.getElementById("inputCardFoot"),
  },
  output: {
    out: document.getElementById("inputOut"),
    card: document.getElementById("outputCard"),
  },
  btn: {
    lang: document.getElementById("btnLang"),
    pro: document.getElementById("btnPro"),
    encry: document.getElementById("btnEncrypt"),
    decry: document.getElementById("btnDecrypt"),
    swap: document.getElementById("btnSwap"),
    erase: document.getElementById("btnErase"),
    copy: document.getElementById("btnCopy"),
    copy2: document.getElementById("btnCopy2"),
  },
  mdl: {
    main: document.getElementById("mainModal"),
    content: document.getElementById("modalSubContent"),
    btnClose: document.getElementById("modalClose"),
    btnYes: document.getElementById("modalAccept"),
    btnNo: document.getElementById("modalCancel"),
  },
};

const encrypt = (text) => {
  let encrypter = text.replace(/(a|e|i|o|u)/g, (match) => {
    switch (match) {
      case "a":
        return "ai";
      case "e":
        return "enter";
      case "i":
        return "imes";
      case "o":
        return "ober";
      case "u":
        return "ufat";
      default:
        return match;
    }
  });
  EL.output.out.innerText = encrypter;
  if (encrypter.length > 0) toggleBGOutImage(true);
};

const decrypt = (text) => {
  let encrypter = text.replace(/(ai|enter|imes|ober|ufat)/g, (match) => {
    switch (match) {
      case "ai":
        return "a";
      case "enter":
        return "e";
      case "imes":
        return "i";
      case "ober":
        return "o";
      case "ufat":
        return "u";
      default:
        return match;
    }
  });
  EL.output.out.innerText = encrypter;
  if (encrypter.length > 0) toggleBGOutImage(true);
};

const setCarretPosition = (position) => {
  const el = EL.input.in;
  const sel = document.getSelection();
  if (position == undefined) position = 0;
  if (!sel || !el) return;
  // Set the caret to the beggining
  sel.collapse(el, 0);
  // Move the caret to the position
  for (let index = 0; index < position; index++) {
    sel.modify("move", "forward", "character");
  }
};

const getCaretPosition = () => {
  const sel = document.getSelection();
  sel.modify("extend", "backward", "paragraphboundary");
  const pos = sel.toString().length;
  if (sel.anchorNode != undefined) sel.collapseToEnd();

  return pos;
};

const highlightCases = (text, caret) => {
  if (caret == undefined) caret = EL.input.in.innerText.length;
  EL.input.in.innerHTML = text;
  setCarretPosition(caret);
};

const validateUpperCase = (text) => {
  const regUpperCase = /[A-Z]/g;
  let hasCase = false;

  let hasUpperCase = text.match(regUpperCase);
  if (hasUpperCase != null) {
    hasCase = true;
    hasUpperCase = [...new Set(hasUpperCase)]; //tal vez puedas quitar esto w
    hasUpperCase.forEach((char) => {
      text = text.replaceAll(char, `<e>${char}</e>`);
    });
  }
  return [text, hasCase];
};

const validateSpecialCase = (text) => {
  const regNotAlpha = /(?!(?:\s|\.|,))\W/g;
  let hasCase = false;

  let hasSpecialCase = text.match(regNotAlpha);
  if (hasSpecialCase != null) {
    hasCase = true;
    hasSpecialCase = [...new Set(hasSpecialCase)];
    hasSpecialCase.forEach((char) => {
      text = text.replaceAll(char, `<e>${char}</e>`);
    });
  }
  return [text, hasCase];
};

const validator = (text, regex) => {
  let hasChar = false;
  let hasCharArray = text.match(regex);
  if (hasCharArray != null) {
    hasChar = true;
    hasCharArray = [...new Set(hasCharArray)];
    hasCharArray.forEach((char) => {
      text = text.replaceAll(char, `<e>${char}</e>`);
    });
  }
  return [text, hasChar];
};

const isNotPro = (text, caret) => {
  const regUpperCase = /[A-Z]/g;
  const regNotAlpha = /(?!(?:\s|\.|,))\W/g;
  const regProblems = /[<>/&_]+/g; //si el char es ><&_ [return  mensaje] o mejor metemos un remplasazo EZ PZ
  let hasCase = [false, false];

  text = text.replaceAll(regProblems, "");
  [text, hasCase[0]] = validator(text, regNotAlpha);
  [text, hasCase[1]] = validator(text, regUpperCase);
  highlightCases(text, caret);

  return [hasCase[0], hasCase[1]];
};

const handleInputInput = (e) => {
  e.stopPropagation();
  const caret = getCaretPosition(e);
  handleInputCharNumber(caret);
  let text = e.target.innerText;

  if (!data.isPro) {
    isNotPro(text, caret);
    return;
  }

  //e.target.innerHTML = text;
  EL.output.out.value = text;

  //placeCaretAtEnd(data.inputIn);
};

const handleInputClick = (e) => {
  e.stopPropagation();
  let caret = getCaretPosition(e);
  handleInputCharNumber(caret);
};

const handleEncyptBtn = () => {
  let text = EL.input.in.innerText;
  if (text == undefined || text == "") return;

  if (!data.isPro) {
    let modalText = "";
    let [hasAlpha, hasUpper] = isNotPro(text);
    console.log(hasAlpha, hasUpper);
    if (hasAlpha || hasUpper) {
      if (hasUpper) modalText = lang[data.language].modalContUpper;
      if (hasAlpha) modalText += lang[data.language].modalContSpecial;
      modalText += lang[data.language].modalContFoot;
      EL.mdl.content.innerHTML = modalText;
      EL.mdl.btnYes.innerText = lang[data.language].modalAccept[2];
      openModal();
      return;
    }
  }

  encrypt(text);
};

const handleDecyptBtn = () => {
  let text = EL.input.in.innerText;
  if (text == undefined || text == "") return;
  let hasCase = [false, false];

  if (!data.isPro) {
    let modalText = "";
    [text, hasCase[0]] = validateSpecialCase(text);
    [text, hasCase[1]] = validateUpperCase(text);

    if (hasCase[0] || hasCase[1]) {
      if (hasCase[1]) modalText = lang[data.language].modalContUpper;
      if (hasCase[0]) modalText += lang[data.language].modalContSpecial;
      modalText += lang[data.language].modalContFoot;
      EL.mdl.content.innerHTML = modalText;
      EL.mdl.btnYes.innerText = lang[data.language].modalAccept[2];
      openModal();
      return;
    }
  }
  decrypt(text);
};

const handleInputErase = () => {
  EL.input.in.innerText = "";
  EL.output.out.innerText = "";
  toggleBGOutImage(false);
};

const handleInputAreaClick = () => {
  const handler = EL.input.in.innerHTML.length;
  setCarretPosition(handler);
};

const handleSwap = () => {
  if (EL.output.out.innerText == "") return;
  EL.input.in.innerText = EL.output.out.innerText;
  EL.output.out.innerText = "";
  toggleBGOutImage();
  handleInputCharNumber();
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

const handleInputCharNumber = (caret) => {
  if (caret == undefined) caret = 0;

  if (EL.input.in.innerText.length > data.maxChars) {
    EL.input.in.innerText = EL.input.in.innerText.substring(0, data.maxChars);
    setCarretPosition(EL.input.in.innerText.length);
  }

  EL.input.cardFoot.innerHTML = `${caret}  :  ${EL.input.in.innerText.length}/${data.maxChars}`;
};

const toggleBGOutImage = (state) => {
  if (EL.output.out.innerHTML != "")
    EL.output.card.classList.remove("card-output");
  else EL.output.card.classList.add("card-output");
};

const setVersion = () => {
  const btnYes = EL.mdl.btnYes;
  const label = EL.isPro.label;
  const divLabel = EL.isPro.divLabel;
  const live = EL.isPro.live;
  const divLive = EL.isPro.divLive;
  if (data.isPro) {
    data.maxChars = 5000;
    btnYes.innerHTML = lang[data.language].modalAccept[1];
    label.innerHTML = "";
    label.style.visibility = "hidden";
    live.style.visibility = "visible";
    divLabel.classList.remove("hc-c2", "hc1");
    divLabel.classList.add("hc6");
    divLive.classList.remove("hc6");
    divLive.classList.add("hc-c2", "hc1");
  } else {
    data.maxChars = 120;
    btnYes.innerHTML = lang[data.language].modalAccept[0];
    label.innerHTML = lang[data.language].conLabel;
    label.style.visibility = "visible";
    live.style.visibility = "hidden";
    divLive.classList.remove("hc-c2", "hc1");
    divLive.classList.add("hc6");
    divLabel.classList.remove("hc6");
    divLabel.classList.add("hc-c2", "hc1");
    //si esta en automatico desactivalo
  }
  EL.input.in.innerText = "";
  EL.input.in.focus();
  setLocalData();
  handleInputCharNumber(0);
};

const setLanguage = (_lang) => {
  if (_lang != "ES" && _lang != "EN") _lang = "ES";
  let d = document;
  let handlerText = EL.input.in.innerText;

  Object.keys(lang[_lang]).forEach((key) => {
    if (
      key == "modalContUpper" ||
      key == "modalContSpecial" ||
      key == "modalContFoot"
    )
      return;
    d.getElementById(key).innerText = lang[_lang][key];
    if (key == "inputOut" || key == "inputIn") {
      d.getElementById(key).innerText = "";
      d.getElementById(key).setAttribute(
        "data-placeholder",
        lang[_lang][key][0]
      );
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
  setLocalData();
  EL.input.in.innerText = handlerText;
};

const handleLanguage = () => {
  data.language =
    data.language == "ES" ? (data.language = "EN") : (data.language = "ES");
  setLanguage(data.language);
  if (!data.isPro) isNotPro(EL.input.in.innerText);
};

const openModal = () => {
  EL.mdl.main.style.display = "block";
};

const closeModal = (e) => {
  EL.mdl.main.style.display = "none";
  if (!e.currentTarget.ispro) return;
  if (e.currentTarget.innerText == "OK") {
    EL.mdl.content.innerHTML = lang[data.language].modalSubContent;
    data.isPro
      ? (EL.mdl.btnYes.innerText = lang[data.language].modalAccept[1])
      : (EL.mdl.btnYes.innerText = lang[data.language].modalAccept[0]);
    return;
  }
  data.isPro = !data.isPro;
  setVersion();
};

const handleProBtn = () => {
  openModal();
};

const setEvents = () => {
  /////////////////// INPUT ///////////////////
  EL.input.in.addEventListener("input", handleInputInput);
  EL.input.in.addEventListener("click", handleInputClick);
  EL.input.card.addEventListener("click", handleInputAreaClick);
  EL.btn.erase.addEventListener("click", handleInputErase);
  EL.btn.encry.addEventListener("click", handleEncyptBtn);
  EL.btn.decry.addEventListener("click", handleDecyptBtn);
  EL.btn.swap.addEventListener("click", handleSwap);
  /////////////////// OUTPUT ///////////////////
  EL.output.out.addEventListener("change", inputOutHandler);
  EL.btn.copy.addEventListener("click", () => {
    navigator.clipboard.writeText(EL.output.out.innerText);
  });
  EL.btn.copy2.addEventListener("click", () => {
    navigator.clipboard.writeText(EL.output.out.innerText);
  });
  /////////////////// MODAL ///////////////////
  EL.btn.pro.addEventListener("click", handleProBtn);
  EL.mdl.btnClose.addEventListener("click", closeModal);
  EL.mdl.btnNo.addEventListener("click", closeModal);
  EL.mdl.btnYes.addEventListener("click", closeModal);
  EL.mdl.main.addEventListener("click", closeModal);
  EL.mdl.btnYes.ispro = true;

  /////////////////// MISC ///////////////////
  EL.btn.lang.addEventListener("click", handleLanguage);
};

const setLocalData = () => {
  localStorage.setItem("data", JSON.stringify(data));
  return data;
};

const getLocalData = () => {
  let local = JSON.parse(localStorage.getItem("data"));
  if (local == null) {
    local = setLocalData();
  }
  data = local;
};

const setup = () => {
  getLocalData();
  setLanguage(data.language);
  handleInputCharNumber(0);
  setVersion();
  setEvents();
};

setup();
