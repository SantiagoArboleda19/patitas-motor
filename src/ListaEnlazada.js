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

    /*Agrega al reporte la última vacunación de cada mascota (o “sin registro”) usando buscar.*/

    buscar(condicion) {
        let actual = this.cabeza;
        while(actual) {
            if(condicion(actual.dato)) return actual.dato
            else actual = actual.siguiente
        }
        return null
    }

    insertarDespuesDe(condicion, dato){
        if(this.estaVacia) return null;
        const nuevo = new Nodo(dato);
        let actual = this.cabeza;
        while(actual){
            if(condicion(actual.dato)){
            nuevo.siguiente = actual.siguiente;
            actual.siguiente = nuevo;
            if(this.cola == actual) this.cola = nuevo;
            this.tamanio++
            return true
            } else actual = actual.siguiente;
        }
        return false;
    }

    eliminar(condicion){
        let actual = this.cabeza;
        if(!actual) return null

        if(condicion(actual.dato)){
            const dato = actual.dato;
            actual = actual.siguiente;
            if(!actual) this.cola = null
            this.tamanio--
            return dato
        }

        while(actual.siguiente){
            if(condicion(actual.siguiente.dato)){
            const dato = actual.siguiente.dato;
            actual.siguiente = actual.siguiente.siguiente;
            if(!actual.siguiente) this.cola = actual
            this.tamanio--
            return dato;
            }
            actual = actual.siguiente;
        }
        return null;
    }
    
}

module.exports = { ListaEnlazada }