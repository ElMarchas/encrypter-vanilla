import lang from "./assets/lang.js";

var data = {
  isAuto: false,
  isEncrypt: true,
  isPro: false,
  language: "ES",
  maxChars: 120,
  maxLogs: 15,
};

var logs = [];

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
    live: document.getElementById("btnLive"),
    erase: document.getElementById("btnErase"),
    copy: document.getElementById("btnCopy"),
    copy2: document.getElementById("btnCopy2"),
    delLog: document.getElementById("btnDeleteLog"),
  },
  mdl: {
    main: document.getElementById("mainModal"),
    content: document.getElementById("modalSubContent"),
    btnClose: document.getElementById("modalClose"),
    btnYes: document.getElementById("modalAccept"),
    btnNo: document.getElementById("modalCancel"),
  },
  snackbar: document.getElementById("snackbar"),
  list: document.getElementById("list"),
};

const encrypt = (text) => {
  let encrypter = text.replace(
    /(a|e|i|o|u|A|E|I|O|U|á|é|í|ó|ú|Á|É|Í|Ó|Ú|à|è|ì|ò|ù|À|È|Ì|Ò|Ù)/g,
    (match) => {
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
        case "A":
          return "AI";
        case "E":
          return "ENTER";
        case "I":
          return "IMES";
        case "O":
          return "OBER";
        case "U":
          return "UFAT";
        case "á":
          return "aui";
        case "é":
          return "eunter";
        case "í":
          return "iumes";
        case "ó":
          return "ouber";
        case "ú":
          return "ufatu";
        case "Á":
          return "AUI";
        case "É":
          return "EUNTER";
        case "Í":
          return "IUMES";
        case "Ó":
          return "OUBER";
        case "Ú":
          return "UFATU";
        case "à":
          return "aoi";
        case "è":
          return "eonter";
        case "ì":
          return "iomes";
        case "ò":
          return "obero";
        case "ù":
          return "uofat";
        case "À":
          return "AOI";
        case "È":
          return "EONTER";
        case "Ì":
          return "IOMES";
        case "Ò":
          return "OBERO";
        case "Ù":
          return "UOFAT";
        default:
          return match;
      }
    }
  );
  EL.output.out.innerText = encrypter;
  if (encrypter.length > 0) toggleBGOutImage(true);
  return encrypter;
};

const decrypt = (text) => {
  let encrypter = text.replace(
    /(ai|enter|imes|ober|ufat|AI|ENTER|IMES|OBER|UFAT|aui|eunter|iumes|ouber|ufatu|AUI|EUNTER|IUMES|OUBER|UFATU|aoi|eonter|iomes|obero|uofat|AOI|EONTER|IOMES|OBERO|UOFAT)/g,
    (match) => {
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
        case "AI":
          return "A";
        case "ENTER":
          return "E";
        case "IMES":
          return "I";
        case "OBER":
          return "O";
        case "UFAT":
          return "U";
        case "aui":
          return "á";
        case "eunter":
          return "é";
        case "iumes":
          return "í";
        case "ouber":
          return "ó";
        case "ufatu":
          return "ú";
        case "AUI":
          return "Á";
        case "EUNTER":
          return "É";
        case "IUMES":
          return "Í";
        case "OUBER":
          return "Ó";
        case "UFATU":
          return "Ú";
        case "aoi":
          return "à";
        case "eonter":
          return "è";
        case "iomes":
          return "ì";
        case "obero":
          return "ò";
        case "uofat":
          return "ù";
        case "AOI":
          return "À";
        case "EONTER":
          return "È";
        case "IOMES":
          return "Ì";
        case "OBERO":
          return "Ò";
        case "UOFAT":
          return "Ù";
        default:
          return match;
      }
    }
  );
  EL.output.out.innerText = encrypter;
  if (encrypter.length > 0) toggleBGOutImage(true);
  return encrypter;
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

  if (text.length < 20) {
    EL.input.in.classList.add("font-l");
    EL.input.in.classList.remove("font-m");
    EL.output.out.classList.add("font-l");
    EL.output.out.classList.remove("font-m");
  } else if (text.length < 60) {
    EL.input.in.classList.remove("font-l");
    EL.input.in.classList.add("font-m");
    EL.output.out.classList.remove("font-l");
    EL.output.out.classList.add("font-m");
  } else {
    EL.input.in.classList.remove("font-l");
    EL.input.in.classList.remove("font-m");
    EL.output.out.classList.remove("font-l");
    EL.output.out.classList.remove("font-m");
  }

  if (!data.isPro) {
    isNotPro(text, caret);
    return;
  }

  if (!data.isAuto) return;
  if (data.isEncrypt) {
    encrypt(text);
  } else {
    decrypt(text);
  }
};

const handleInputClick = (e) => {
  e.stopPropagation();
  let caret = getCaretPosition(e);
  handleInputCharNumber(caret);
};

const handleEncyptBtn = () => {
  data.isEncrypt = true;
  handleAutoOutput(data.isAuto);
  let text = EL.input.in.innerText;
  if (text == undefined || text == "") return;

  if (!data.isPro) {
    let modalText = "";
    let [hasAlpha, hasUpper] = isNotPro(text);
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

  let crypt = encrypt(text);

  if (text != "" && crypt != "") {
    addLog(text, crypt);
  }
};

const handleDecyptBtn = () => {
  data.isEncrypt = false;
  handleAutoOutput(data.isAuto);
  let text = EL.input.in.innerText;
  if (text == undefined || text == "") return;

  if (!data.isPro) {
    let modalText = "";
    let [hasAlpha, hasUpper] = isNotPro(text);
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

  let crypt = decrypt(text);

  if (text != "" && crypt != "") {
    addLog(text, crypt);
  }
};

const handleInputErase = () => {
  EL.input.in.innerText = "";
  EL.output.out.innerText = "";
  toggleBGOutImage(false);
  handleInputCharNumber();
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
  if (data.isAuto) {
    if (data.isEncrypt) encrypt(EL.input.in.innerText);
    else decrypt(EL.input.in.innerText);
  }
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

const handleAutoOutput = (state) => {
  if (typeof state != "boolean") state = !data.isAuto;
  if (data.isPro == false) state = false;
  data.isAuto = state;
  const btnLive = EL.btn.live;
  const btnEncry = EL.btn.encry;
  const btnDecry = EL.btn.decry;

  btnLive.classList.remove("btn-pro");
  btnEncry.classList.remove("btn-selected");
  btnDecry.classList.remove("btn-selected");

  if (data.isAuto) {
    btnLive.classList.add("btn-pro");
    if (data.isEncrypt) btnEncry.classList.add("btn-selected");
    else btnDecry.classList.add("btn-selected");
  }
  setLocalData();
};

const setVersion = () => {
  const btnYes = EL.mdl.btnYes;
  const label = EL.isPro.label;
  const divLabel = EL.isPro.divLabel;
  const live = EL.isPro.live;
  const divLive = EL.isPro.divLive;
  const btnPro = EL.btn.pro;
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
    btnPro.classList.add("btn-pro");
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
    btnPro.classList.remove("btn-pro");
    data.isAuto = false;
  }
  EL.input.in.innerText = "";
  EL.input.in.focus();
  handleInputCharNumber(0);
  handleAutoOutput(data.isAuto);
  setLocalData();
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
      d.getElementById(key).setAttribute("data-placeholder", lang[_lang][key]);
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

const handleSnackbar = () => {
  if (EL.output.out.innerText.length < 1) return;
  if (EL.snackbar.classList.contains("show")) return;
  EL.snackbar.classList.add("show");
  setTimeout(() => {
    EL.snackbar.classList.remove("show");
  }, 3000);
};

const handleProBtn = () => {
  openModal();
};

const addLog = (textin, textout) => {
  logs.unshift([textin, textout]);
  if (logs.length >= data.maxLogs) {
    logs.pop();
  }
  renderLogs();
};

const deleteAllLogs = () => {
  logs = [];
  renderLogs();
};

const deleteLog = (index) => {
  logs.splice(index, 1);
  renderLogs();
};

const renderLogs = () => {
  const LIST = EL.list;
  LIST.innerHTML = "";

  logs.forEach((log, index) => {
    const divCon = document.createElement("div");
    const divIn = document.createElement("div");
    const divOut = document.createElement("div");
    const bubbleIn = document.createElement("div");
    const bubbleOut = document.createElement("div");
    const btn = document.createElement("div");

    divCon.classList.add("list-cont");
    divOut.classList.add("list-out");
    bubbleOut.classList.add("bubble-out");
    btn.classList.add("btn", "btn-icon");
    bubbleIn.classList.add("bubble-in");

    btn.addEventListener("click", () => {
      deleteLog(index);
    });

    bubbleOut.appendChild(document.createTextNode(log[1]));
    btn.appendChild(document.createTextNode("✖️"));
    divOut.appendChild(bubbleOut);
    divOut.appendChild(btn);

    bubbleIn.appendChild(document.createTextNode(log[0]));
    divCon.appendChild(divOut);
    divCon.appendChild(bubbleIn);
    LIST.appendChild(divCon);
  });
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

const setEvents = () => {
  /////////////////// INPUT ///////////////////
  EL.input.in.addEventListener("input", handleInputInput);
  EL.input.in.addEventListener("click", handleInputClick);
  EL.input.card.addEventListener("click", handleInputAreaClick);
  EL.btn.erase.addEventListener("click", handleInputErase);
  EL.btn.encry.addEventListener("click", handleEncyptBtn);
  EL.btn.decry.addEventListener("click", handleDecyptBtn);
  EL.btn.swap.addEventListener("click", handleSwap);
  EL.btn.live.addEventListener("click", handleAutoOutput);
  /////////////////// OUTPUT ///////////////////
  //EL.output.out.addEventListener("change", inputOutHandler);
  EL.btn.copy.addEventListener("click", () => {
    navigator.clipboard.writeText(EL.output.out.innerText);
    handleSnackbar();
  });
  EL.btn.copy2.addEventListener("click", () => {
    navigator.clipboard.writeText(EL.output.out.innerText);
    handleSnackbar();
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
  EL.btn.delLog.addEventListener("click", deleteAllLogs);
};

const setup = () => {
  getLocalData();
  setLanguage(data.language);
  handleInputCharNumber(0);
  setVersion();
  handleAutoOutput(data.isAuto);
  renderLogs();
  setEvents();
};

setup();
