const { ListaEnlazada } = require('./ListaEnlazada')

class RegistroClinico {
    constructor(){
        this.historiales = new Map();
    }

    registrarAtencion(mascota, atencion){
        if(!this.historiales.has(mascota)){
            this.historiales.set(mascota, new ListaEnlazada());
        }
        this.historiales.get(mascota).agregarAlFinal(atencion)
    }
}

module.exports = { RegistroClinico } 