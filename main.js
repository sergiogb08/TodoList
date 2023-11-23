const button = document.querySelector("form button");
const ul = document.querySelector("div ul");
button.className = "btn-add";
const p = document.querySelector("p");
const buttonDel = document.createElement("button");
buttonDel.textContent = "X";
buttonDel.className = "btn-delete";
const count = document.querySelector(".task-count");

let datos = [];
count.textContent= datos.length;
let i = localStorage.length;
escribirLista();

button.addEventListener("click", (e) => {
  e.preventDefault();
  i++;
  let input = document.querySelector("input");
  let valor = input.value;
  datos.push({ key: i, value: valor });
  let li = document.createElement("li");
  li.textContent = valor;
  ul.append(li);

  guardarElementos();
  let buttonClone = buttonDel.cloneNode(true);
  buttonClone.textContent = "X";
  li.append(buttonClone);
  count.textContent= datos.length;
  p.style.display= "none";
});

ul.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "BUTTON") {
    let tareaDelate = e.target.closest("li"); 

    if (tareaDelate) {
      let index = Array.from(ul.children).indexOf(tareaDelate); 
      datos.splice(index, 1); 
      guardarElementos(); 
      ul.removeChild(tareaDelate);
    }
    count.textContent= datos.length;
    const datosLocalStorage = localStorage.getItem("datos");
    datos = JSON.parse(datosLocalStorage);

    if(datos.length != 0){
      p.style.display="none";
    }else{
      p.style.display="contents";
    }

  }
})

function guardarElementos() {
  localStorage.setItem("datos", JSON.stringify(datos));
}

function escribirLista() {
  const datosLocalStorage = localStorage.getItem("datos");
  if (datosLocalStorage) {
    datos = JSON.parse(datosLocalStorage);
    if(datos.length != 0){
      p.style.display= "none";
      datos.forEach((dato) => {
        let li = document.createElement("li");
        li.textContent = dato.value;
        ul.append(li);
  
        let buttonClone = buttonDel.cloneNode(true);
        buttonClone.textContent = "X";
        li.append(buttonClone);
      });
      count.textContent= datos.length;
    }else{
      p.style.display = "contents";
    }
  } 
}
