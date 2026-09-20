// Banco de 50 preguntas de matemáticas para 7.º grado
const questionBank = [
    // Operaciones con Enteros
    { question: "¿Cuál es el resultado de $-8 + 5$?", options: ["-3", "3", "-13", "13"], answer: "-3" },
    { question: "Calcula: $(-6) \\times (-4)$", options: ["-24", "24", "-10", "10"], answer: "24" },
    { question: "Si la temperatura era de $-2^\\circ\\text{C}$ y subió $7^\\circ\\text{C}$, ¿cuál es la temperatura actual?", options: ["$9^\\circ\\text{C}$", "$-5^\\circ\\text{C}$", "$5^\\circ\\text{C}$", "$-9^\\circ\\text{C}$"], answer: "$5^\\circ\\text{C}$" },
    { question: "¿Cuál es el resultado de $12 - (-5)$?", options: ["7", "17", "-7", "-17"], answer: "17" },
    { question: "Resuelve: $(-15) \\div 3$", options: ["5", "-5", "3", "-3"], answer: "-5" },
    { question: "¿Cuál es el valor absoluto de $|-18|$?", options: ["-18", "18", "0", "1"], answer: "18" },
    { question: "El opuesto del número $-9$ es:", options: ["9", "-9", "0", "1/9"], answer: "9" },
    { question: "Si debes $\\$10.000$ y pagas $\\$6.000$, tu saldo es:", options: ["+$4.000$", "-$4.000$", "-$16.000$", "+$16.000$"], answer: "-$4.000$" },

    // Tipos de Números y Propiedades
    { question: "¿Cuál de los siguientes números es un número primo?", options: ["9", "15", "17", "21"], answer: "17" },
    { question: "¿Cuál es el máximo común divisor (MCD) de $12$ y $18$?", options: ["2", "3", "6", "36"], answer: "6" },
    { question: "¿Cuál es el mínimo común múltiplo (mcm) de $4$ y $6$?", options: ["12", "24", "8", "16"], answer: "12" },
    { question: "¿Qué tipo de número es $\\frac{3}{4}$?", options: ["Entero", "Racional", "Irracional", "Natural"], answer: "Racional" },
    { question: "Un número racional se representa como la división de dos enteros $a/b$, donde $b$ debe ser:", options: ["Mayor que 10", "Diferente de 0", "Igual a 1", "Un número negativo"], answer: "Diferente de 0" },
    { question: "¿Cuál es la descomposición en factores primos de $12$?", options: ["$2 \\times 6$", "$3 \\times 4$", "$2^2 \\times 3$", "$2 \\times 3^2$"], answer: "$2^2 \\times 3$" },

    // Fracciones y Decimales
    { question: "Suma de fracciones: $\\frac{1}{4} + \\frac{2}{4}$", options: ["$\\frac{3}{8}$", "$\\frac{3}{4}$", "$\\frac{1}{2}$", "$\\frac{2}{4}$"], answer: "$\\frac{3}{4}$" },
    { question: "Simplifica la fracción $\\frac{6}{8}$ a su mínima expresión:", options: ["$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$", "$\\frac{4}{3}$"], answer: "$\\frac{3}{4}$" },
    { question: "Multiplica: $\\frac{2}{3} \\times \\frac{3}{5}$", options: ["$\\frac{5}{8}$", "$\\frac{6}{15}$", "$\\frac{2}{5}$", "$\\frac{1}{2}$"], answer: "$\\frac{2}{5}$" },
    { question: "¿A qué número decimal equivale la fracción $\\frac{1}{2}$?", options: ["0,2", "0,5", "0,25", "1,2"], answer: "0,5" },
    { question: "Resuelve: $0,75 + 0,25$", options: ["1,0", "0,100", "0,50", "1,25"], answer: "1,0" },
    { question: "¿Cuál es el resultado de $3,5 \\times 2$?", options: ["6,5", "7,0", "7,5", "8,0"], answer: "7,0" },

    // Conjuntos
    { question: "Si $A = \\{1, 2, 3\\}$ y $B = \\{3, 4, 5\\}$, ¿cuál es la Unión ($A \\cup B$)?", options: ["$\\{3\\}$", "$\\{1, 2, 3, 4, 5\\}$", "$\\{1, 2, 4, 5\\}$", "$\\{\\}$"], answer: "$\\{1, 2, 3, 4, 5\\}$" },
    { question: "Si $A = \\{a, b, c\\}$ y $B = \\{b, c, d\\}$, ¿cuál es la Intersección ($A \\cap B$)?", options: ["$\\{a, d\\}$", "$\\{b, c\\}$", "$\\{a, b, c, d\\}$", "$\\{a\\}$"], answer: "$\\{b, c\\}$" },
    { question: "Un conjunto que no posee ningún elemento se llama:", options: ["Conjunto Finito", "Conjunto Vacío", "Conjunto Universal", "Conjunto Unitario"], answer: "Conjunto Vacío" },
    { question: "Si un conjunto $M$ tiene $1$ solo elemento, se denomina:", options: ["Vacío", "Unitario", "Infinito", "Universal"], answer: "Unitario" },
    { question: "El símbolo $\\in$ en teoría de conjuntos significa:", options: ["Pertenece a", "Es subconjunto de", "Unión", "Intersección"], answer: "Pertenece a" },

    // Potenciación y Radicación Básico
    { question: "Calcula $3^3$:", options: ["9", "27", "18", "81"], answer: "27" },
    { question: "¿Cuánto es $5^0$?", options: ["0", "5", "1", "10"], answer: "1" },
    { question: "¿Cuál es la raíz cuadrada de $\\sqrt{49}$?", options: ["6", "7", "8", "9"], answer: "7" },
    { question: "Calcula $\\sqrt{81}$:", options: ["8", "9", "81", "18"], answer: "9" },
    { question: "Si $2^x = 16$, ¿cuál es el valor de $x$?", options: ["2", "3", "4", "8"], answer: "4" },

    // Razones, Proporciones y Porcentajes
    { question: "Si 3 cuadernos cuestan $\\$6.000$, ¿cuánto cuestan 6 cuadernos?", options: ["$\\$9.000$", "$\\$12.000$", "$\\$15.000$", "$\\$18.000$"], answer: "$\\$12.000$" },
    { question: "¿Cuál es el $50\\%$ de $80$?", options: ["20", "40", "30", "50"], answer: "40" },
    { question: "El $10\\%$ de $150$ es:", options: ["15", "1,5", "150", "30"], answer: "15" },
    { question: "En una clase de 30 estudiantes, el $20\\%$ lleva gafas. ¿Cuántos son?", options: ["5", "6", "10", "3"], answer: "6" },

    // Álgebra Básica y Ecuaciones
    { question: "Resuelve la ecuación: $x + 7 = 15$", options: ["$x = 8$", "$x = 22$", "$x = 105$", "$x = 9$"], answer: "$x = 8$" },
    { question: "Resuelve: $2x = 18$", options: ["$x = 36$", "$x = 9$", "$x = 16$", "$x = 20$"], answer: "$x = 9$" },
    { question: "Si $x = 3$, evalúa la expresión $2x + 4$:", options: ["7", "10", "12", "9"], answer: "10" },
    { question: "El triple de un número $x$ aumentado en 2 se escribe como:", options: ["$3x + 2$", "$x^3 + 2$", "$3(x + 2)$", "$x + 5$"], answer: "$3x + 2$" },

    // Geometría y Medida Básica
    { question: "¿Cuál es el perímetro de un cuadrado cuyo lado mide $5\\text{ cm}$?", options: ["$10\\text{ cm}$", "$20\\text{ cm}$", "$25\\text{ cm}$", "$15\\text{ cm}$"], answer: "$20\\text{ cm}$" },
    { question: "¿Cuál es el área de un rectángulo de base $6\\text{ cm}$ y altura $4\\text{ cm}$?", options: ["$10\\text{ cm}^2$", "$20\\text{ cm}^2$", "$24\\text{ cm}^2$", "$12\\text{ cm}^2$"], answer: "$24\\text{ cm}^2$" },
    { question: "Un ángulo que mide exactamente $90^\\circ$ se llama:", options: ["Agudo", "Obtuso", "Recto", "Llano"], answer: "Recto" },
    { question: "La suma de los ángulos internos de cualquier triángulo es:", options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$270^\\circ$"], answer: "$180^\\circ$" },
    { question: "Un triángulo que tiene sus 3 lados iguales se llama:", options: ["Isósceles", "Escaleno", "Equilátero", "Rectángulo"], answer: "Equilátero" },

    // Estadística y Lógica
    { question: "¿Cuál es la media (promedio) de los números $4, 6, 8$?", options: ["5", "6", "7", "18"], answer: "6" },
    { question: "En el conjunto de datos $\\{2, 3, 3, 5, 8\\}$, la moda es:", options: ["2", "3", "4", "5"], answer: "3" },
    { question: "Si lanzas un dado común de 6 caras, ¿cuál es la probabilidad de sacar un $1$?", options: ["$\\frac{1}{2}$", "$\\frac{1}{6}$", "$\\frac{6}{1}$", "$\\frac{1}{3}$"], answer: "$\\frac{1}{6}$" },
    { question: "En la serie $2, 4, 8, 16, ...$, ¿cuál es el número siguiente?", options: ["20", "24", "32", "64"], answer: "32" },
    { question: "En la serie $5, 10, 15, 20, ...$, el patrón consiste en:", options: ["Multiplicar por 2", "Sumar 5", "Restar 5", "Elevar al cuadrado"], answer: "Sumar 5" },
    { question: "¿Cuántos minutos hay en $2,5$ horas?", options: ["120", "130", "150", "250"], answer: "150" }
];