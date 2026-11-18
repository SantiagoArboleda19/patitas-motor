const { Cola } = require('../src/Cola')

const turnos = [
  { mascota: "Lola", tutor: "Ana Torres",    horaLlegada: "08:00", motivo: "Vacunación anual" },
  { mascota: "Toby", tutor: "Carlos Ruiz",   horaLlegada: "08:10", motivo: "Consulta por cojera" },
  { mascota: "Mía",  tutor: "Laura Pérez",   horaLlegada: "08:25", motivo: "Control posquirúrgico" },
  { mascota: "Max",  tutor: "Juan Gómez",    horaLlegada: "08:40", motivo: "Limpieza dental" },
  { mascota: "Luna", tutor: "Sofía Ramírez", horaLlegada: "08:55", motivo: "Control de peso" },
];

const cola = new Cola();

// Paso 1: cola vacía
console.log("Paso 1: cola vacía");
console.log("estaVacia:", cola.estaVacia());     // true
console.log("verFrente:", cola.verFrente());     // null
console.log("cantidad:", cola.cantidad);         // 0

// Paso 2: encolar los cinco turnos, mostrando cómo cambian frente y final
console.log("\nPaso 2: encolar cinco turnos");
for (const t of turnos) {
  cola.encolar(t);
  console.log("encolé a", t.mascota,
    "| frente:", cola.frente.dato.mascota,       // siempre Lola
    "| final:", cola.final.dato.mascota,         // va cambiando
    "| cantidad:", cola.cantidad);               // 1, 2, 3, 4, 5
}

// Paso 3: verFrente no saca a nadie
console.log("\nPaso 3: verFrente");
console.log("verFrente:", cola.verFrente().mascota);  // Lola
console.log("cantidad:", cola.cantidad);              // 5 (no cambió)

// Paso 4: desencolar una vez
console.log("\nPaso 4: desencolar una vez");
const atendido = cola.desencolar();
console.log("atendido:", atendido.mascota);            // Lola
console.log("frente:", cola.frente.dato.mascota);      // Toby
console.log("final:", cola.final.dato.mascota);        // Luna (no cambió)
console.log("cantidad:", cola.cantidad);               // 4

// Paso 5: desencolar el resto, debe salir en orden de llegada
console.log("\nPaso 5: desencolar hasta vaciar");
while (!cola.estaVacia()) {
  const t = cola.desencolar();
  console.log("atendido:", t.mascota, "-", t.tutor, "-", t.horaLlegada, "-", t.motivo);
}
// Toby, Mía, Max, Luna

// Paso 6: la cola quedó vacía
console.log("\nPaso 6: cola vacía otra vez");
console.log("estaVacia:", cola.estaVacia());     // true
console.log("frente:", cola.frente);              // null
console.log("final:", cola.final);                // null  (si sale un nodo, falta final = null en desencolar)
console.log("cantidad:", cola.cantidad);          // 0
console.log("desencolar en vacía:", cola.desencolar());  // null

const cola1 = new Cola()
const N = 100000;

console.time("encolar")
for (let i = 0; i < N; i++) cola1.encolar({turno: i});
console.timeEnd("encolar")

console.time("desencolar")
while(!cola1.estaVacia()) cola1.desencolar();
console.timeEnd("desencolar")

const array = [];
console.time("push")
for (let i = 0; i < N; i++) array.push({turno: i});
console.timeEnd("push")

console.time("shift")
while(array.length > 0) array.shift();
console.timeEnd("shift")