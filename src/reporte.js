const { RegistroClinico } = require('./RegistroClinico');

const atenciones = [
  { mascota: "Lola", fecha: "02/02", motivo: "Vacunación anual",      veterinario: "Dra. Ríos", costo: 85000 },
  { mascota: "Lola", fecha: "15/03", motivo: "Control de peso",       veterinario: "Dr. Gómez", costo: 40000 },
  { mascota: "Lola", fecha: "20/05", motivo: "Limpieza dental",       veterinario: "Dra. Ríos", costo: 150000 },
  { mascota: "Toby", fecha: "10/01", motivo: "Consulta por cojera",   veterinario: "Dr. Gómez", costo: 60000 },
  { mascota: "Toby", fecha: "12/01", motivo: "Radiografía de pata",   veterinario: "Dr. Gómez", costo: 120000 },
  { mascota: "Toby", fecha: "05/04", motivo: "Vacunación anual",      veterinario: "Dra. Ríos", costo: 85000 },
  { mascota: "Mía",  fecha: "18/02", motivo: "Esterilización",        veterinario: "Dra. Ríos", costo: 280000 },
  { mascota: "Mía",  fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0 },
];

const registro = new RegistroClinico()
for (const a of atenciones) {
    registro.registrarAtencion(a.mascota, a);
}

for (const [animal, historial] of registro.historiales) {
    console.log("===== "+ animal +" =====")

    let total = 0;
    historial.recorre(a => {
        console.log(a.fecha + " - " + a.motivo + " (" + a.veterinario + ") $" + a.costo);
        total += historial.costo
    })

    console.log("Atenciones:", historial.tamanio);
    console.log("Costo total:", total);

    
}
