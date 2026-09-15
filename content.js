/* ============================================================
   Contenido del libro — "El viaje de las estrellas"
   Escuela Los Lirios
   ============================================================ */
(function (global) {
  'use strict';

  // Páginas tipo "sección" (títulos, como la portada)
  var section = function (heading, lines) {
    return { type: 'section', heading: heading, lines: lines };
  };
  // Páginas tipo "historia" (etiqueta + párrafo)
  var story = function (label, body) {
    return { type: 'story', label: label, body: body };
  };
  // Páginas tipo "ilustración"
  var art = function (key) {
    return { type: 'art', key: key };
  };

  var TEXT = [
    section('Una escuela, muchas historias', ['Escuela Los Lirios', 'Una historia para ser escuchada y compartida']), // 1
    story('El cielo de los Lirios', 'En una escuela llamada Los Lirios había una ventana muy especial. Desde allí se podía mirar el cielo. Por las mañanas entraba la luz del sol. Por las tardes pasaban las nubes. Y cuando llegaba la noche, aparecían las estrellas.'), // 2
    story('Una pequeña estrella', 'Una tarde apareció una estrella diferente. Era pequeña, casi parecía perderse entre las demás. Pero tenía algo especial: brillaba con mucha fuerza. Los estudiantes la observaron en silencio y comenzaron a hacerse preguntas.'), // 3
    story('Una pregunta', 'Uno de los estudiantes preguntó: «¿Por qué algunas estrellas parecen brillar más que otras?». La profesora sonrió y respondió: «Quizás no se trata de quién brilla más. Quizás se trata de descubrir cómo brilla cada uno».'), // 4
    story('Cada uno tiene su luz', 'Entonces comprendieron que no había dos estrellas iguales. Algunas eran grandes y otras pequeñas. Algunas estaban cerca y otras muy lejos. Cada una tenía su lugar y su propia luz. Con las personas sucede algo parecido.'), // 5
    story('Diferentes formas de aprender', 'Algunos aprenden escuchando. Otros mirando. Algunos leyendo. Otros dibujando, cantando, jugando, moviendo sus manos, experimentando o haciendo. Hay quienes necesitan más tiempo. Y también quienes necesitan que alguien los acompañe.'), // 6
    story('Una pregunta más profunda', 'Uno de los estudiantes preguntó: «¿Y qué pasa cuando uno intenta y no puede?». La profesora respondió: «Cuando algo cuesta, no significa que no puedas. Tal vez necesitas otro camino. Tal vez necesitas más tiempo. Tal vez necesitas ayuda».'), // 7
    story('Puedes seguir', 'El estudiante volvió a mirar la ventana. La pequeña estrella seguía allí. Parecía más brillante que antes. Y por un instante todos imaginaron que la estrella decía: «Puedes seguir».'), // 8
    story('El viaje comienza', 'Al día siguiente, los estudiantes llegaron con una idea: querían descubrir cuál era su propia luz. Así comenzó un viaje. No necesitaron barcos ni aviones. Era un viaje diferente: un viaje para descubrirse a sí mismos.'), // 9
    story('Las estrellas', 'Cada estudiante recibió una pequeña estrella. En ella debía escribir algo que pudiera aportar a los demás: una habilidad, una palabra, una sonrisa, una ayuda, un sueño o una fortaleza.'), // 10
    story('Esfuerzo', 'La primera estrella decía: ESFUERZO. Porque muchas veces las cosas importantes no se consiguen a la primera. Cada intento deja una enseñanza y cada pequeño avance merece ser valorado.'), // 11
    story('Amistad', 'Otra estrella decía: AMISTAD. Porque cuando caminamos acompañados, los caminos difíciles pueden parecer un poco más fáciles. Un compañero puede escuchar, esperar, ayudar y celebrar.'), // 12
    story('Valentía', 'Otra estrella decía: VALENTÍA. Porque ser valiente no significa no tener miedo. Significa atreverse a intentarlo, aunque algo parezca difícil.'), // 13
    story('Aprender', 'Y otra estrella decía: APRENDER. Porque aprender es descubrir algo nuevo cada día. También es descubrir que podemos hacer cosas que antes pensábamos que eran imposibles.'), // 14
    story('No todos al mismo ritmo', 'Durante el viaje descubrieron algo importante: no todos caminaban al mismo ritmo. Algunos avanzaban rápido. Otros se detenían. Algunos necesitaban más tiempo. Pero caminar juntos no significa caminar igual.'), // 15
    story('Nadie queda atrás', 'Caminar juntos significa esperar. Acompañar. Escuchar. Ayudar. Significa que cuando un compañero necesita apoyo, podemos acercarnos y decir: «Estoy contigo».'), // 16
    story('Celebrar los logros', 'Cuando alguien lograba algo por primera vez, todos podían celebrar. Porque el logro de una persona también puede convertirse en una alegría para todos. Una pequeña victoria puede iluminar un cielo entero.'), // 17
    story('Aprender también es equivocarse', 'Aprender no significa hacerlo todo bien. A veces nos equivocamos. A veces olvidamos. A veces tenemos que comenzar nuevamente. Un error no es el final del camino. Puede ser una oportunidad para aprender.'), // 18
    story('Las 25 estrellas', 'Al regresar a la escuela, pusieron todas sus estrellas juntas. Ninguna era igual a otra. Pero todas eran importantes. Juntas formaban un cielo mucho más grande.'), // 19
    story('El mensaje', 'La profesora miró a sus estudiantes y dijo: «No tenemos que brillar como los demás. Tenemos que descubrir nuestra propia luz». Entonces entendieron que ser diferente no significa valer menos.'), // 20
    story('Nuestro cielo', 'Cada persona tiene un camino. Cada persona tiene su propio tiempo. Cada persona tiene algo que aprender y algo que compartir. Y cuando dejamos espacio para que todos brillen, nuestro cielo se hace más grande.'), // 21
    story('Una estrella puede ser…', 'Una estrella puede ser una palabra. Una sonrisa. Un dibujo. Una canción. Un esfuerzo. Pedir ayuda. Ayudar a un amigo. Atreverse a participar. Leer una palabra. Aprender algo nuevo. Volver a intentarlo.'), // 22
    story('Cada uno cuenta', 'Hoy no venimos a demostrar quién lee mejor. Venimos a compartir nuestras voces. A compartir nuestros aprendizajes. A compartir nuestros sueños. A celebrar nuestros avances.'), // 23
    story('Cada pequeño paso cuenta', 'Cada palabra cuenta. Cada esfuerzo cuenta. Cada estudiante cuenta. Cada historia cuenta. Y cada estrella tiene un lugar en el cielo.'), // 24
    story('La luz que brilla', 'Porque hoy sabemos algo que nunca debemos olvidar: todos tenemos una luz que brilla. No tenemos que ser iguales. No tenemos que aprender igual. No tenemos que avanzar igual.'), // 25
    story('Juntos', 'Solo necesitamos la oportunidad de aprender, la oportunidad de crecer, la oportunidad de intentarlo y la oportunidad de descubrir nuestra propia luz.'), // 26
    story('El cielo se llena de luz', 'Cuando una estrella brilla, ilumina una parte del cielo. Pero cuando muchas estrellas brillan juntas, todo el cielo se llena de luz.'), // 27
    section('Todos tenemos una luz', ['Todos podemos aprender.', 'Todos podemos crecer.', 'Todos podemos brillar.']), // 28
    section('Estas son nuestras estrellas', ['Y juntos hacemos brillar nuestro cielo.']), // 29
    section('¡Gracias por escucharnos!', ['Escuela Los Lirios', '25 estrellas · 25 voces · un mismo cielo']) // 30
  ];

  // Orden final intercalando las ilustraciones entre las páginas de texto.
  // (índices sobre TEXT, 0-based)
  var order = [
    TEXT[0],
    art('escuela'),
    TEXT[1], TEXT[2],
    art('pequenaEstrella'),
    TEXT[3], TEXT[4],
    art('diversidad'),
    TEXT[5], TEXT[6], TEXT[7],
    art('ventana'),
    TEXT[8], TEXT[9],
    art('manos'),
    TEXT[10], TEXT[11], TEXT[12],
    art('valentia'),
    TEXT[13], TEXT[14], TEXT[15],
    art('juntosCamino'),
    TEXT[16], TEXT[17], TEXT[18],
    art('veinticinco'),
    TEXT[19], TEXT[20],
    art('nuestroCielo'),
    TEXT[21], TEXT[22], TEXT[23],
    art('senda'),
    TEXT[24], TEXT[25],
    art('circulo'),
    TEXT[26], TEXT[27],
    art('propiaLuz'),
    TEXT[28], TEXT[29],
    art('cierre')
  ];

  global.BOOK_CONTENT = order;
})(window);
