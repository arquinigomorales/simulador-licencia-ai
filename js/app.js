let questions = [];
let currentQuestion = 0;

let score = 0;
let errors = [];

let selectedMode = "";

const homeScreen = document.getElementById("homeScreen");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const answersContainer = document.getElementById("answersContainer");

const nextButton = document.getElementById("nextButton");
const feedback = document.getElementById("feedback");

const progressBar = document.getElementById("progressBar");
const scoreInfo = document.getElementById("scoreInfo");

const questionImage = document.getElementById("questionImage");


/* =========================
   UTILIDADES
========================= */

function shuffle(array) {

    return [...array].sort(() => Math.random() - 0.5);

}


/* =========================
   INICIAR MODOS
========================= */

function startQuickPractice() {

    selectedMode = "quick";

    questions = shuffle(bancoPreguntas).slice(0, 10);

    startQuiz();

}


function startFullPractice() {

    selectedMode = "full";

    questions = shuffle(bancoPreguntas);

    startQuiz();

}


function startQuiz() {

    currentQuestion = 0;
    score = 0;
    errors = [];

    homeScreen.classList.add("hidden");
    resultCard.classList.add("hidden");

    quizCard.classList.remove("hidden");

    scoreInfo.textContent = "Correctas: 0";

    loadQuestion();

}


/* =========================
   MOSTRAR PREGUNTA
========================= */

function loadQuestion() {

    const question = questions[currentQuestion];

    nextButton.classList.add("hidden");

    feedback.style.display = "none";

    answersContainer.innerHTML = "";

    questionNumber.textContent =
        `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    scoreInfo.textContent =
        `Correctas: ${score}`;

    const progress =
        ((currentQuestion) / questions.length) * 100;

    progressBar.style.width =
        progress + "%";


    questionText.textContent =
        question.question;


    /* IMAGEN */

    if (question.image) {

        questionImage.src = question.image;

        questionImage.style.display = "block";

    } else {

        questionImage.style.display = "none";

    }


    /* RESPUESTAS */

    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener(
            "click",
            () => selectAnswer(index, button)
        );

        answersContainer.appendChild(button);

    });

}


/* =========================
   RESPONDER
========================= */

function selectAnswer(selectedIndex, selectedButton) {

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer");


    buttons.forEach(button => {

        button.classList.add("disabled");

    });


    if (selectedIndex === question.correct) {

        score++;

        selectedButton.classList.add("correct");

        feedback.textContent =
            "✓ Respuesta correcta";

        feedback.className =
            "feedback correct";

    }

    else {

        selectedButton.classList.add("incorrect");

        buttons[question.correct]
            .classList.add("correct");

        errors.push(question);

        feedback.textContent =
            "✗ Respuesta incorrecta. La respuesta correcta está marcada en verde.";

        feedback.className =
            "feedback incorrect";

    }


    feedback.style.display =
        "block";

    scoreInfo.textContent =
        `Correctas: ${score}`;

    nextButton.classList.remove("hidden");

}


/* =========================
   SIGUIENTE
========================= */

nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        }

        else {

            showResults();

        }

    }
);


/* =========================
   RESULTADOS
========================= */

function showResults() {

    quizCard.classList.add("hidden");

    resultCard.classList.remove("hidden");

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    document.getElementById("finalScore")
        .textContent =
        `${score}/${questions.length}`;


    document.getElementById("percentage")
        .textContent =
        `${percentage}%`;


    document.getElementById("correctResult")
        .textContent =
        score;


    document.getElementById("errorResult")
        .textContent =
        errors.length;


    let message;

    if (percentage >= 90) {

        message =
            "Excelente. Tienes un dominio muy alto del balotario.";

    }

    else if (percentage >= 80) {

        message =
            "Muy bien. Estás cerca de estar preparado.";

    }

    else if (percentage >= 70) {

        message =
            "Buen avance, pero todavía conviene practicar tus errores.";

    }

    else {

        message =
            "Necesitas seguir practicando. Revisa especialmente las preguntas que fallaste.";

    }


    document.getElementById("finalMessage")
        .textContent = message;


    const retryErrors =
        document.getElementById("retryErrors");


    if (errors.length > 0) {

        retryErrors.classList.remove("hidden");

    }

    else {

        retryErrors.classList.add("hidden");

    }

}


/* =========================
   REPASAR ERRORES
========================= */

function practiceErrors() {

    questions = [...errors];

    selectedMode = "errors";

    startQuiz();

}


/* =========================
   VOLVER AL MENÚ
========================= */

function goHome() {

    quizCard.classList.add("hidden");

    resultCard.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}
