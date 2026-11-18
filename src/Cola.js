const { Nodo } = require('./Nodo');

class Cola {
  constructor() {
    this.frente = null;
    this.final = null;
    this.cantidad = 0;
  }

  encolar(dato){
    const nuevo = new Nodo(dato);
    if(!this.frente) this.frente = nuevo;
    else this.frente.siguiente = nuevo;
    this.final = nuevo;
    this.cantidad++ 
  }

  desencolar(){
    if (!this.frente) return null;
    const dato = this.frente;
    this.frente = this.frente.siguiente;
    if(!this.frente) this.final = null
    this.cantidad--
    return dato.dato
  }

  verFrente(){
    return this.frente ? this.frente.dato : null;
  }

  estaVacia() {
    return this.frente === null;
  }

  tamanio(){
    return this.cantidad;
  }
}

module.exports = { Cola }