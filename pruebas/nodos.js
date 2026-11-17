const { Nodo } = require('../src/Nodo')
const { ListaEnlazada } = require('../src/ListaEnlazada')

const lola = [
  { fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 },
  { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 },
  { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 },
];

const nodo1 = new Nodo(lola[0]);
const nodo2 = new Nodo(lola[1]);
const nodo3 = new Nodo(lola[2]);
nodo1.siguiente = nodo2;
nodo2.siguiente = nodo3;

const cabeza = nodo1; 
//console.log(nodo1);
//console.log(nodo2);
//console.log(nodo3);

let actual = cabeza;
while(actual){
    //console.log(actual)
    actual = actual.siguiente;
}

let costo = 0;
actual = cabeza; 
while(actual){
    costo += actual.dato.costo;
    actual = actual.siguiente;
}
//console.log(costo);


const lista = new ListaEnlazada();
//const lista2 = new ListaEnlazada();
//lista2.agregarAlFinal(nodo1.dato);

lista.agregarAlFinal(nodo1.dato);
lista.agregarAlFinal(nodo2.dato);
lista.agregarAlFinal(nodo3.dato);
//console.log(lista.mostrarNodo(nodo1.dato));
//console.log(lista.mostrarNodo(nodo2.dato));
//console.log(lista.mostrarNodo(nodo3.dato));
//console.log(lista.aArreglo());
//console.log(lista2.estaVacia());
//console.log(lista.buscar(dato => dato.costo == 40000))


console.log("============");
lista.recorrer((dato) => console.log(dato));
console.log("============");
//lista.insertarDespuesDe(dato => dato.costo == 40000, nodo2.dato);
//lista.recorrer((dato) => console.log(dato));
console.log("============");
lista.insertarDespuesDe((dato) => dato.costo == 150000, nodo2.dato);
lista.recorrer((dato) => console.log(dato));
console.log("============");
//console.log(lista.cola);
lista.eliminar((dato) => dato.costo == 85000);
lista.recorrer((dato) => console.log(dato));


