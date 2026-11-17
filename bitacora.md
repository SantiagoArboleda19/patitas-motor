# Bitácora
MINIRETO1 SEMANA1--------------------------------------------------
## Diagrama de nodos y flechas

Los tres nodos de Lola, enlazados en orden cronológico:

```
cabeza
  │
  ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ dato: Vacunación │    │ dato: Control    │    │ dato: Limpieza   │
│       (02/02)    │    │       de peso    │    │       dental     │
│                  │    │       (15/03)    │    │       (20/05)    │
│ siguiente ───────┼───►│ siguiente ───────┼───►│ siguiente: null  │
└──────────────────┘    └──────────────────┘    └──────────────────┘
       nodo1                   nodo2                   nodo3
```

Recorrido: se empieza en `cabeza` y se avanza de `siguiente` en `siguiente`
hasta llegar a `null`. Se visitan los 3 nodos.

## Perdiendo un enlace a propósito

Se asigna `null` al `siguiente` del primer nodo:

```js
cabeza.siguiente = null;
```

```
cabeza
  │
  ▼
┌──────────────────┐
│ dato: Vacunación │
│ siguiente: null  │
└──────────────────┘

┌──────────────────┐    ┌──────────────────┐
│ dato: Control    │    │ dato: Limpieza   │
│ siguiente ───────┼───►│ siguiente: null  │
└──────────────────┘    └──────────────────┘
   nodo2 (suelto)          nodo3 (suelto)
```

### ¿Qué ocurre con el recorrido?

El recorrido empieza en `cabeza`, visita la vacunación, ve que `siguiente`
es `null` y se detiene. Solo se visita **1 nodo** en vez de 3.

### ¿Por qué?

La única forma de llegar al nodo 2 era la flecha `nodo1.siguiente`. Al
reemplazarla por `null`, nadie en la cadena apunta al nodo 2, y como el nodo 3
solo era accesible a través del nodo 2, también se pierde. Los nodos 2 y 3
siguen conectados entre sí, pero ya son **inalcanzables** desde `cabeza`.
Como ninguna variable los referencia, JavaScript los libera de la memoria
automáticamente (recolector de basura).

Conclusión: en una lista enlazada, cada flecha es el único camino hacia lo que
viene después. Perder un enlace significa perder todo lo que estaba detrás.
