const { ListaEnlazada } = require('../src/ListaEnlazada');

// Caso 1: lista vacía + agregarAlFinal
const lista1 = new ListaEnlazada();
lista1.agregarAlFinal("A");
console.log("Caso 1: vacía + final");
console.log("cabeza:", lista1.cabeza.dato);   // A
console.log("cola:", lista1.cola.dato);        // A
console.log("tamanio:", lista1.tamanio);       // 1

// Caso 2: lista vacía + agregarAlInicio
const lista2 = new ListaEnlazada();
lista2.agregarAlInicio("A");
console.log("Caso 2: vacía + inicio");
console.log("cabeza:", lista2.cabeza.dato);   // A
console.log("cola:", lista2.cola.dato);        // A
console.log("tamanio:", lista2.tamanio);       // 1

// Caso 3: un nodo + agregarAlInicio
const lista3 = new ListaEnlazada();
lista3.agregarAlFinal("A");
lista3.agregarAlInicio("B");
console.log("Caso 3: 1 nodo + inicio");
console.log("cabeza:", lista3.cabeza.dato);   // B
console.log("cola:", lista3.cola.dato);        // A (no cambió)
console.log("tamanio:", lista3.tamanio);       // 2

// Caso 4: un nodo + agregarAlFinal
const lista4 = new ListaEnlazada();
lista4.agregarAlFinal("A");
lista4.agregarAlFinal("B");
console.log("Caso 4: 1 nodo + final");
console.log("cabeza:", lista4.cabeza.dato);   // A (no cambió)
console.log("cola:", lista4.cola.dato);        // B
console.log("tamanio:", lista4.tamanio);       // 2

// Caso 5: varios nodos + agregarAlInicio
const lista5 = new ListaEnlazada();
lista5.agregarAlFinal("A");
lista5.agregarAlFinal("B");
lista5.agregarAlFinal("C");
lista5.agregarAlInicio("X");
console.log("Caso 5: varios + inicio");
console.log("cabeza:", lista5.cabeza.dato);   // X
console.log("cola:", lista5.cola.dato);        // C (no cambió)
console.log("tamanio:", lista5.tamanio);       // 4
console.log("contenido:", lista5.aArreglo());  // [ 'X', 'A', 'B', 'C' ]

// Caso 6: varios nodos + agregarAlFinal
const lista6 = new ListaEnlazada();
lista6.agregarAlFinal("A");
lista6.agregarAlFinal("B");
lista6.agregarAlFinal("C");
lista6.agregarAlFinal("X");
console.log("Caso 6: varios + final");
console.log("cabeza:", lista6.cabeza.dato);   // A (no cambió)
console.log("cola:", lista6.cola.dato);        // X
console.log("tamanio:", lista6.tamanio);       // 4
console.log("contenido:", lista6.aArreglo());  // [ 'A', 'B', 'C', 'X' ]