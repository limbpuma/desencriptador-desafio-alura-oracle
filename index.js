const palabras = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const input = document.getElementById("mi-input");
const resultado = document.getElementById("resultado");
const botonEncriptar = document.getElementById("boton-encriptar");
const botonDesencriptar = document.getElementById("boton-desencriptar");
const botonCopiar = document.getElementById("boton-copiar");
const imageSection2 = document.getElementById("imageSection-2");
const h2Section2 = document.getElementById("h2Section-2");
const botonRemove = document.getElementById("boton-remove");

const encriptar = (valor) => valor.replace(/[aeiou]/g, (letra) => palabras[letra]);
const desencriptar = (valor) => valor.replace(
  /(ai|enter|imes|ober|ufat)/g,
  (palabra) => Object.keys(palabras).find((key) => palabras[key] === palabra)
);

const toggleVisibility = (isVisible) => {
  botonCopiar.style.visibility = isVisible ? "visible" : "hidden";
  imageSection2.style.visibility = isVisible ? "hidden" : "visible";
  h2Section2.style.visibility = isVisible ? "hidden" : "visible";
};

botonEncriptar.addEventListener("click", () => {
  resultado.innerHTML = encriptar(input.value);
  resultadoFinal();
});

botonDesencriptar.addEventListener("click", () => {
  resultado.innerHTML = desencriptar(input.value);
  resultadoFinal();
});

function resultadoFinal() {
  toggleVisibility(resultado.innerHTML !== "");
}

botonCopiar.addEventListener("click", () => {
  if (resultado.innerHTML === "") {
    alert("Nada para copiar");
  } else {
    botonRemove.style.visibility = "visible";
    navigator.clipboard.writeText(resultado.innerHTML);
    botonCopiar.innerHTML = "Copiado";
    setTimeout(() => {
      botonCopiar.innerHTML = "Copiar";
    }, 3000);
  }
});

input.addEventListener("input", () => {
  input.value = removeAccents(input.value.toLowerCase());
  resultado.innerHTML = "";
  resultadoFinal();
  botonRemove.style.visibility = "hidden";
});

botonRemove.addEventListener("click", () => {
  input.value = "";
  resultado.innerHTML = "";
  botonRemove.style.visibility = "hidden";
  resultadoFinal();
});

function removeAccents(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
