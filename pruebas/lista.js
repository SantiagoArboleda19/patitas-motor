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

// Caso 7: eliminar en una lista vacía
const lista7 = new ListaEnlazada();
const r7 = lista7.eliminar((d) => d === "A");
console.log("Caso 7: eliminar en lista vacía");
console.log("devuelve:", r7);                 // null
console.log("cabeza:", lista7.cabeza);        // null
console.log("cola:", lista7.cola);            // null
console.log("tamanio:", lista7.tamanio);      // 0

// Caso 8: eliminar el único nodo
const lista8 = new ListaEnlazada();
lista8.agregarAlFinal("A");
const r8 = lista8.eliminar((d) => d === "A");
console.log("Caso 8: eliminar el único nodo");
console.log("devuelve:", r8);                 // A
console.log("cabeza:", lista8.cabeza);        // null
console.log("cola:", lista8.cola);            // null  (si sale un nodo, falta poner cola = null)
console.log("tamanio:", lista8.tamanio);      // 0
console.log("contenido:", lista8.aArreglo()); // []

// Caso 9: eliminar la cabeza (varios nodos)
const lista9 = new ListaEnlazada();
lista9.agregarAlFinal("A");
lista9.agregarAlFinal("B");
lista9.agregarAlFinal("C");
const r9 = lista9.eliminar((d) => d === "A");
console.log("Caso 9: eliminar la cabeza");
console.log("devuelve:", r9);                 // A
console.log("cabeza:", lista9.cabeza.dato);   // B
console.log("cola:", lista9.cola.dato);       // C (no cambió)
console.log("tamanio:", lista9.tamanio);      // 2
console.log("contenido:", lista9.aArreglo()); // [ 'B', 'C' ]

// Caso 10: eliminar la cola
const lista10 = new ListaEnlazada();
lista10.agregarAlFinal("A");
lista10.agregarAlFinal("B");
lista10.agregarAlFinal("C");
const r10 = lista10.eliminar((d) => d === "C");
console.log("Caso 10: eliminar la cola");
console.log("devuelve:", r10);                // C
console.log("cabeza:", lista10.cabeza.dato);  // A (no cambió)
console.log("cola:", lista10.cola.dato);      // B (cola se movió)
console.log("tamanio:", lista10.tamanio);     // 2
console.log("contenido:", lista10.aArreglo());// [ 'A', 'B' ]

// Caso 11: eliminar algo que no existe
const lista11 = new ListaEnlazada();
lista11.agregarAlFinal("A");
lista11.agregarAlFinal("B");
lista11.agregarAlFinal("C");
const r11 = lista11.eliminar((d) => d === "Z");
console.log("Caso 11: eliminar algo que no existe");
console.log("devuelve:", r11);                // null
console.log("cabeza:", lista11.cabeza.dato);  // A (no cambió)
console.log("cola:", lista11.cola.dato);      // C (no cambió)
console.log("tamanio:", lista11.tamanio);     // 3 (no cambió)
console.log("contenido:", lista11.aArreglo());// [ 'A', 'B', 'C' ]

// Caso 12: insertar después de la cola
const lista12 = new ListaEnlazada();
lista12.agregarAlFinal("A");
lista12.agregarAlFinal("B");
lista12.agregarAlFinal("C");
lista12.insertarDespuesDe((d) => d === "C", "X");  // C es la cola
console.log("Caso 12: insertar después de la cola");
console.log("cabeza:", lista12.cabeza.dato);  // A (no cambió)
console.log("cola:", lista12.cola.dato);      // X (cola se movió al nuevo)
console.log("cola.siguiente:", lista12.cola.siguiente); // null
console.log("tamanio:", lista12.tamanio);     // 4
console.log("contenido:", lista12.aArreglo());// [ 'A', 'B', 'C', 'X' ]