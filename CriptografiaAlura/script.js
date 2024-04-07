const copiarBtn = document.querySelector("#copiar");
const limparBtn = document.querySelector("#limpar");
const msgCriptografadaTxt = document.querySelector("#msgCriptografada");
const descriptografarBtn = document.querySelector("#descriptografar");
const semMensagemTxt = document.querySelector("#semMensagem");
const msgTxtInput = document.querySelector("#msgTxt");

copiarBtn.style.display = 'none';
limparBtn.style.display = 'none';
msgCriptografadaTxt.style.display = 'none';
descriptografarBtn.disabled = true;
semMensagemTxt.style.display = '';

msgTxtInput.focus();
msgTxtInput.addEventListener('input', atualizarBotoes);

function atualizarBotoes() {
  const msg = msgTxtInput.value.toLowerCase();
  descriptografarBtn.disabled = msg === '';

  return msg;
}

function mostrarMensagem() {
  const criptoTxt = msgCriptografadaTxt.value;
  const semMensagem = criptoTxt === '';
  semMensagemTxt.style.display = semMensagem ? '' : 'none';
  copiarBtn.style.display = semMensagem ? 'none' : '';
  limparBtn.style.display = semMensagem ? 'none' : '';
  msgCriptografadaTxt.style.display = semMensagem ? 'none' : '';
}

function copiarTexto() {
  const textoCopia = msgCriptografadaTxt;
  textoCopia.select();
  textoCopia.setSelectionRange(0, 99999);
  document.execCommand("copy");
  msgTxtInput.focus();
}

function limparTexto() {
  const msg = atualizarBotoes();
  if (msg !== '') {
    copiarBtn.style.display = 'none';
    msgCriptografadaTxt.value = '';
    limparBtn.style.display = 'none';
    semMensagemTxt.style.display = '';
    msgTxtInput.focus();
  }
}

function criptografar() {
  const msgTxt = atualizarBotoes();
  const alfabetoEncriptar = {
    'a': 'ai',
    'á': 'ái',
    'à': 'ài',
    'ã': 'ãi',
    'â': 'âi',
    'e': 'enter',
    'é': 'énter',
    'è': 'ènter',
    'ê': 'ênter',
    'i': 'imes',
    'í': 'ímes',
    'ï': 'ïmes',
    'o': 'ober',
    'ó': 'óber',
    'ô': 'ôber',
    'õ': 'õber',
    'ö': 'öber',
    'u': 'ufat',
    'ú': 'úfat'
  };

  let msgCriptografada = '';
  for (const char of msgTxt) {
    msgCriptografada += alfabetoEncriptar[char] || char;
  }

  msgCriptografadaTxt.value = msgCriptografada;
  mostrarMensagem();
}

function descriptografar() {
  const msgTxt = atualizarBotoes();
  const alfabetoDecriptar = {
    'ai': 'a',
    'ái': 'á',
    'ài': 'à',
    'ãi': 'ã',
    'âi': 'â',
    'enter': 'e',
    'énter': 'é',
    'ènter': 'è',
    'ênter': 'ê',
    'imes': 'i',
    'ímes': 'í',
    'ïmes': 'ï',
    'ober': 'o',
    'óber': 'ó',
    'ôber': 'ô',
    'õber': 'õ',
    'öber': 'ö',
    'ufat': 'u',
    'úfat': 'ú'
  };

  let msgDescriptografada = '';
  let i = 0;
  while (i < msgTxt.length) {
    let found = false;
    for (const chave in alfabetoDecriptar) {
      if (msgTxt.substr(i, chave.length) === chave) {
        msgDescriptografada += alfabetoDecriptar[chave];
        i += chave.length;
        found = true;
        break;
      }
    }
    if (!found) {
      msgDescriptografada += msgTxt[i];
      i++;
    }
  }

  msgCriptografadaTxt.value = msgDescriptografada;
  mostrarMensagem();
}