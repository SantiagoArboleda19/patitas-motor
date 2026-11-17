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

MINIRETO2 SEMANA2--------------------------------------------------
## Referencias que cambian al agregar

En todos los casos `tamanio` aumenta en 1.

### 1. Lista vacía: agregarAlFinal(A) y agregarAlInicio(A)

Es igual en ambos métodos: el nodo nuevo es a la vez el primero y el último.

```
Antes:   cabeza → null     cola → null
Después: cabeza → [A | null]
         cola   → [A | null]     (misma caja)
```

Cambian: `cabeza` y `cola`.

### 2. Lista con un nodo [A]: agregarAlInicio(B)

```
Antes:   cabeza → [A | null]
         cola   → [A | null]

Después: cabeza → [B | ──→ [A | null]
                              ↑ cola (no cambió)
```

1. `nuevo.siguiente = cabeza` (B apunta a A)
2. `cabeza = nuevo`

Cambian: `nuevo.siguiente` y `cabeza`. No cambia: `cola`.

### 3. Lista con un nodo [A]: agregarAlFinal(B)

```
Antes:   cabeza → [A | null]
         cola   → [A | null]

Después: cabeza → [A | ──→ [B | null]
                              ↑ cola
```

1. `cola.siguiente = nuevo` (A apunta a B)
2. `cola = nuevo`

Cambian: `A.siguiente` y `cola`. No cambia: `cabeza`.

### 4. Lista con varios nodos [A, B, C]: agregarAlInicio(X)

```
Antes:   cabeza → [A] → [B] → [C | null]
                                ↑ cola

Después: cabeza → [X] → [A] → [B] → [C | null]
                                      ↑ cola (no cambió)
```

Cambian: `X.siguiente` y `cabeza`. Los nodos A, B y C no se tocan.

### 5. Lista con varios nodos [A, B, C]: agregarAlFinal(X)

```
Antes:   cabeza → [A] → [B] → [C | null]
                                ↑ cola

Después: cabeza → [A] → [B] → [C] → [X | null]
                                      ↑ cola
```

Cambian: `C.siguiente` y `cola`. No cambia: `cabeza`.

### Por qué son O(1)

Ninguna recorre la lista. Gracias a `cabeza` y `cola` se llega directo
al primero y al último, y siempre se modifican las mismas 2 referencias,
sin importar cuántos nodos haya.

### Resumen

| Caso                  | Cambia cabeza | Cambia cola | tamanio |
|-----------------------|---------------|-------------|---------|
| Vacía, al inicio/final| sí            | sí          | 0 → 1   |
| 1 nodo, al inicio     | sí            | no          | 1 → 2   |
| 1 nodo, al final      | no            | sí          | 1 → 2   |
| Varios, al inicio     | sí            | no          | n → n+1 |
| Varios, al final      | no            | sí          | n → n+1 |

