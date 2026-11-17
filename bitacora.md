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

MINIRETO3 SEMANA2 -------------------------------------------------------------
## Eliminar: los tres casos

Lista de partida en los tres casos:

```
cabeza → [A] → [B] → [C | null]
                        ↑ cola
```

En todos los casos, si se elimina un nodo, `tamanio` baja en 1 y el método
devuelve el dato del nodo eliminado. Si ninguno cumple la condición, no
cambia nada y devuelve `null`.

### 1. Eliminar la cabeza (A)

La cabeza no tiene nodo anterior, así que se mueve el post-it `cabeza`
al siguiente nodo.

```
Antes:   cabeza → [A] → [B] → [C | null]
                                ↑ cola

Paso:    cabeza = cabeza.siguiente

Después:          [A]   (suelto, nadie le apunta)
         cabeza → [B] → [C | null]
                          ↑ cola (no cambió)
```

Cambia: `cabeza`. No cambia: `cola`.

Caso especial: si la lista tenía **un solo nodo**, `cabeza` queda en `null`
y entonces también hay que poner `cola = null`.

```
Antes:   cabeza → [A | null]    cola → [A | null]
Después: cabeza → null          cola → null
```

### 2. Eliminar un nodo intermedio (B)

Se necesita el nodo **anterior** (A), porque es A quien debe saltarse a B.

```
Antes:   cabeza → [A] → [B] → [C | null]
                  ↑ anterior   ↑ cola

Paso:    anterior.siguiente = anterior.siguiente.siguiente
         (A, en vez de apuntar a B, apunta a C)

Después:                [B]   (suelto, nadie le apunta)
         cabeza → [A] ────────→ [C | null]
                                  ↑ cola (no cambió)
```

Cambia: `A.siguiente`. No cambian: `cabeza` ni `cola`.

### 3. Eliminar la cola (C)

También se necesita el nodo anterior (B). Como B pasa a ser el último,
hay que mover `cola`.

```
Antes:   cabeza → [A] → [B] → [C | null]
                         ↑ anterior ↑ cola

Paso 1:  anterior.siguiente = anterior.siguiente.siguiente
         (B apunta a null, que era el siguiente de C)
Paso 2:  cola = anterior

Después: cabeza → [A] → [B | null]       [C] (suelto)
                          ↑ cola
```

Cambian: `B.siguiente` y `cola`. No cambia: `cabeza`.

### Resumen

| Caso               | Cambia cabeza | Cambia cola | Otro enlace cambiado |
|--------------------|---------------|-------------|----------------------|
| Cabeza (varios)    | sí            | no          | ninguno              |
| Cabeza (1 nodo)    | sí (→ null)   | sí (→ null) | ninguno              |
| Intermedio         | no            | no          | anterior.siguiente   |
| Cola               | no            | sí          | anterior.siguiente   |

### Por qué hay que recorrer

Eliminar la cabeza es O(1), pero eliminar un intermedio o la cola requiere
**recorrer** la lista para encontrar al nodo anterior. La lista solo tiene
flechas hacia adelante, así que desde un nodo no se puede "retroceder".

## Complejidad de las operaciones

n = cantidad de nodos de la lista.

| Operación                      | Complejidad | Por qué                                                                 |
|--------------------------------|-------------|-------------------------------------------------------------------------|
| Eliminar en una lista vacía    | O(1)        | `cabeza` es `null`: no hay nada que buscar, retorna `null` de inmediato. |
| Eliminar el único nodo         | O(1)        | La `cabeza` cumple la condición; solo se ajustan `cabeza` y `cola`.      |
| Eliminar la cabeza             | O(1)        | Se llega directo con `cabeza`; solo se mueve `cabeza = cabeza.siguiente`.|
| Eliminar la cola               | O(n)        | Hay que recorrer la lista para encontrar el nodo anterior (ver abajo).   |
| Eliminar algo que no existe    | O(n)        | Se recorre toda la lista y al final no se encuentra nada.                |
| Insertar después de la cola    | O(n) o O(1) | Con `insertarDespuesDe(condicion, dato)` es O(n), porque recorre la lista buscando el nodo que cumple. Si ya se sabe que es la cola, se usa `agregarAlFinal`, que es O(1) gracias a `cola`. |

## ¿Por qué eliminar la cola requiere recorrer la lista?

Tener la referencia `cola` permite llegar al último nodo directamente, pero
**no sirve para eliminarlo**. Para quitar la cola hay que hacer dos cosas:

1. Que el nodo anterior pase a apuntar a `null` (`anterior.siguiente = null`).
2. Que `cola` pase a apuntar a ese nodo anterior (`cola = anterior`).

El problema es que en una lista simplemente enlazada cada nodo solo tiene
una flecha hacia adelante (`siguiente`). Desde la cola no se puede
retroceder, no hay forma de preguntarle "¿quién está antes de ti?".

```
cabeza → [A] → [B] → [C | null]
                        ↑ cola      (C no sabe que B lo apunta)
```

La única manera de encontrar a B es empezar desde `cabeza` y avanzar de
`siguiente` en `siguiente` hasta llegar al nodo cuyo `siguiente` sea la
`cola`. Eso recorre casi toda la lista, así que cuesta O(n).

Una vez B apunta a `null` y `cola = B`, nadie referencia al nodo C. Queda
inalcanzable y JavaScript lo libera de la memoria solo.

Esto contrasta con eliminar la cabeza, que es O(1): la cabeza no necesita
nodo anterior, solo se mueve `cabeza` al siguiente.

Nota: en una lista **doblemente enlazada** (cada nodo con `anterior` y
`siguiente`), eliminar la cola sí sería O(1), porque `cola.anterior`
da el nodo previo directamente.