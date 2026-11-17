const { Nodo } = require('./Nodo')

class ListaEnlazada {
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }

    agregarAlFinal(dato){
        const nuevo = new Nodo(dato);
        if (!this.cabeza) this.cabeza = nuevo;
        else this.cola.siguiente = nuevo;
        this.cola = nuevo;
        this.tamanio++
    }

    agregarAlInicio(dato){
        const nuevo = new Nodo(dato);
        nuevo.siguiente = this.cabeza;
        this.cabeza = nuevo;
        if(!this.cola) this.cola = nuevo;
        this.tamanio++
    }

    recorrer(callback) {
        let actual = this.cabeza;
        while(actual){
            callback(actual.dato);
            actual = actual.siguiente;
        }
    }

    aArreglo() {
        let arreglo = [];
        let actual = this.cabeza;
        while(actual) {
            arreglo.push(actual.dato);
            actual = actual.siguiente; 
        }
        return arreglo;
    }

    estaVacia() {
        return this.cabeza === null
    }

    obtenerTamanio() {
        return this.tamanio;
    }
}

module.exports = { ListaEnlazada }