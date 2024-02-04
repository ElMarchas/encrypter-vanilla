import lang from "./assets/lang.js";

var data = {
  language: "ES",
  maxChars: 30,
  isPro: true,
  test: document.getElementById("test"),
  test2: document.getElementById("test2"),
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

const handleSelectionChange = () => {
  console.log("antes");
  if (document.activeElement !== data.inputIn) {
    return;
  }
  console.log("desp");
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const clonedRange = range.cloneRange();
  clonedRange.selectNodeContents(data.inputIn);
  clonedRange.setEnd(range.endContainer, range.endOffset);
  data.test.innerHTML = clonedRange.toString().length;
};

function placeCaretAtEnd(el) {
  //https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div
  //el.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    var sel = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false);

    sel.removeAllRanges();
    sel.addRange(range);

    const selection = window.getSelection();
    const range2 = selection.getRangeAt(0);
    const clonedRange = range2.cloneRange();
    clonedRange.selectNodeContents(el);
    clonedRange.setEnd(range2.endContainer, range2.endOffset);
    data.test.innerHTML = clonedRange.toString().length;
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

const setCarretPositionEnd = () => {
  let handler = data.inputIn.innerHTML.length;
  setCarretPosition(handler);
};

const setCarretPosition = (position) => {
  if (position == undefined) position = 0;

  const el = data.inputIn;
  const selection = document.getSelection();

  if (!selection || !el) return;

  // Set the caret to the beggining
  selection.collapse(el, 0);

  // Move the caret to the position
  for (let index = 0; index < position; index++) {
    selection.modify("move", "forward", "character");
  }
};

const getCaretPosition2 = (editableDiv) => {
  //Gracias a este men https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
  var caretPos = 0,
    sel,
    range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      console.log(range);
      caretPos = range.endOffset;
    }
  } else if (document.selection && document.selection.createRange) {
    console.log("den3");
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
};

// node_walk: walk the element tree, stop when func(node) returns false
function node_walk(node, func) {
  var result = func(node);
  for (
    node = node.firstChild;
    result !== false && node;
    node = node.nextSibling
  )
    result = node_walk(node, func);
  return result;
}

// getCaretPosition: return [start, end] as offsets to elem.textContent that
//   correspond to the selected portion of text
//   (if start == end, caret is at given position and no text is selected)

function getCaretPosition3(elem) {
  console.log(elem);
  var sel = window.getSelection();
  var cum_length = [0, 0];

  if (sel.anchorNode == elem) cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    var nodes_to_find = [sel.anchorNode, sel.extentNode];
    var found = [0, 0];
    var i;
    node_walk(elem, function (node) {
      for (i = 0; i < 2; i++) {
        if (node == nodes_to_find[i]) {
          found[i] = true;
          if (found[i == 0 ? 1 : 0]) return false; // all done
        }
      }

      if (node.textContent && !node.firstChild) {
        for (i = 0; i < 2; i++) {
          if (!found[i]) cum_length[i] += node.textContent.length;
        }
      }
    });
    cum_length[0] += sel.anchorOffset;
    cum_length[1] += sel.extentOffset;
  }
  if (cum_length[0] <= cum_length[1]) return cum_length;
  return [cum_length[1], cum_length[0]];
}

//tal vez esta si jale
function getCaretPosition() {
  var sel = document.getSelection();
  sel.modify("extend", "backward", "paragraphboundary");
  var pos = sel.toString().length;
  if (sel.anchorNode != undefined) sel.collapseToEnd();

  return pos;
}

const PintarRojo = (e, text, caret) => {
  console.log("pintar rojo", caret);
  console.log("pintar rojo", text);
  e.target.innerHTML = text;
  setCarretPosition(caret);
};

const handlerInputClick = (e) => {
  e.stopPropagation();

  let handler = e.target.innerText;
  let caret = getCaretPosition(e);
  console.log("caer", caret);

  setInputCharNumber(handler.length, caret);
};

const hadnlerInputInput = (e) => {
  e.stopPropagation();
  let handler = e.target.innerText;
  const regUpperCase = /[A-Z]/g;

  if (e.target.innerText.length > data.maxChars) {
    handler = handler.substring(0, data.maxChars);

    data.inputIn.innerText = handler;
  }

  let caret = getCaretPosition(e);

  setInputCharNumber(handler.length, caret);

  let hasUpperCase = handler.match(regUpperCase);
  if (hasUpperCase != null) {
    hasUpperCase = [...new Set(hasUpperCase)];

    hasUpperCase.forEach((char) => {
      handler = handler.replaceAll(char, `<e>${char}</e>`);
    });
  }
  /*

  while ((match = regUpperCase.exec(handler)) != null) {
    console.log("match found at " + match.index);
  }
  */
  PintarRojo(e, handler, caret);
  //e.target.innerHTML = handler;
  data.inputOut.value = handler;

  //placeCaretAtEnd(data.inputIn);
};

const inputInFocus = (e) => {
  setCarretPositionEnd();
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

const setInputCharNumber = (chars, caret) => {
  if (caret == undefined) caret = 0;
  data.inputCardFoot.innerHTML = `${caret}  :  ${chars}/${data.maxChars}`;
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

  if (data.inputIn.innerText.length > data.maxChars)
    data.inputIn.innerText = data.inputIn.innerText.substring(0, data.maxChars);

  setInputCharNumber(data.inputIn.innerText.length);
};

const setLanguage = (_lang) => {
  if (_lang != "ES" && _lang != "EN") _lang = "ES";
  let d = document;

  Object.keys(lang[_lang]).forEach((key) => {
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
  setInputCharNumber(0);
  setVersion();

  data.inputIn.addEventListener("input", hadnlerInputInput);
  data.inputIn.addEventListener("click", handlerInputClick);
  data.inputOut.addEventListener("change", inputOutHandler);
  data.inputCard.addEventListener("click", inputInFocus);

  data.buttons.bntLang.addEventListener("click", changeLanguage);
  data.buttons.bntPro.addEventListener("click", openModal);

  data.buttons.btnErase.addEventListener("click", () => {
    data.inputIn.innerText = "";
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
