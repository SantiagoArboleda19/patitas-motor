# Patitas Motor

Motor de historiales clínicos para la veterinaria **Patitas**, desarrollado por **Nodo Digital**.

## ¿Qué es el proyecto?

La veterinaria llevaba las atenciones de sus mascotas en hojas de papel, como una lista. El problema: cuando una hoja se perdía, se perdía la referencia a las siguientes y el historial quedaba incompleto.

Patitas Motor resuelve esto con un sistema que guarda el historial de cada mascota como una **lista enlazada**: cada atención es un nodo que apunta a la siguiente, en orden cronológico. Cada atención registra `fecha`, `motivo`, `veterinario` y `costo`.

El sistema permite:

- Registrar atenciones por mascota.
- Ver el historial completo de cada mascota.
- Calcular el número de atenciones y el costo total.
- Consultar la última vacunación de cada mascota (o "sin registro").

## Cómo ejecutarlo

Requisitos: tener [Node.js](https://nodejs.org) instalado. No hay dependencias que instalar.

```bash
# Clonar el repositorio y entrar a la carpeta
cd patitas-motor

# Generar el reporte de todas las mascotas
node src/reporte.js

# Ejecutar las pruebas
node pruebas/lista.js
node pruebas/nodos.js
```

## Estructura del proyecto

```
patitas-motor/
├── src/
│   ├── Nodo.js              # Clase Nodo
│   ├── ListaEnlazada.js     # Clase ListaEnlazada
│   ├── RegistroClinico.js   # Historiales por mascota
│   └── reporte.js           # Carga los datos y muestra el reporte
├── pruebas/                 # Pruebas de cada estructura
├── bitacora.md              # Diagramas, complejidad y decisiones
└── README.md
```

## Estructuras de datos

### `Nodo`
Guarda un `dato` (la atención) y una referencia `siguiente` al nodo que le sigue (`null` si es el último).

### `ListaEnlazada`
Lista simplemente enlazada con las referencias `cabeza` (primer nodo) y `cola` (último nodo) y el contador `tamanio`.

| Método                              | Qué hace                                             |
|-------------------------------------|------------------------------------------------------|
| `agregarAlFinal(dato)`              | Agrega al final (O(1))                               |
| `agregarAlInicio(dato)`             | Agrega al inicio (O(1))                              |
| `insertarDespuesDe(condicion, dato)`| Inserta después del primer nodo que cumpla           |
| `buscar(condicion)`                 | Devuelve el primer dato que cumple, o `null`         |
| `eliminar(condicion)`               | Elimina el primer nodo que cumple y devuelve su dato |
| `recorrer(callback)`                | Ejecuta una función por cada dato                    |
| `aArreglo()`                        | Devuelve los datos en un arreglo                     |
| `estaVacia()`                       | `true` si no tiene nodos                             |
| `obtenerTamanio()`                  | Cantidad de nodos                                    |

### `RegistroClinico`
Guarda un historial (`ListaEnlazada`) por mascota usando un `Map`, donde la clave es el nombre de la mascota.

| Método                                | Qué hace                                                       |
|---------------------------------------|----------------------------------------------------------------|
| `registrarAtencion(mascota, atencion)`| Crea el historial si no existe y agrega la atención al final   |

## Más documentación

En [`bitacora.md`](./bitacora.md) están los diagramas de nodos y flechas, el análisis de complejidad y la comparación entre lista enlazada y arreglo.