var questions = [
    {
        question: "Commonly used data types include:",
        options: ["threads", "strings", "ribbons", "strands"],
        answer: "strings",
    },
    {
        question:
            "The element within parentheses in an if / else statement is known as:",
        options: ["behavior", "attitude", "attribute", "condition"],
        answer: "condition",
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        options: ["files", "zip drives", "booleans", "strands"],
        answer: "booleans",
    },
    {
        question:
            "Which values must be enclosed within quotes when being assigned to variables?",
        options: ["string", "thread", "ribbon", "strand"],
        answer: "string",
    },
    {
        question:
            "Which of the following are not one of the 3 main languages of the world wide web?",
        options: ["Javascript", "html", "jquery", "css"],
        answer: "jquery",
    },
];

var points = 0;
var questionIndex = 0;
var wrapper = document.querySelector("#wrapper");
var fiveHundredSeconds = document.querySelector("#fiveHundredSeconds");
var initiate = document.querySelector("#initiate");
var recordHolders = document.querySelector("#highScore");
var quiz = document.querySelector("#quiz");
var startOver = document.querySelector("#startOver");
var timeRemaining = 501;
var penaltyContainer = 0;
var penalty = 50;
var list = document.createElement("list");


fiveHundredSeconds.addEventListener("click", function () {
    if (penaltyContainer === 0) {
        penaltyContainer = setInterval(function () {
            timeRemaining--;
            fiveHundredSeconds.textContent = "Seconds Left: " + timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(penaltyContainer);
                allDone();
                fiveHundredSeconds.textContent = "Game Over!";
            }
        }, 5000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    quiz.innerHTML = "";
    list.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userOptions = questions[questionIndex].options;
        quiz.textContent = userQuestion;
    }
    userOptions.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quiz.appendChild(list);
        list.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });
}

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "You entered the correct answer:  " + questions[questionIndex].answer;
        }
        else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect, you should have:  " + questions[questionIndex].answer;
        }

    }

    questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "That concludes our quiz!" + " " + "You received  " + points + "/" + queries.length + " !";
    } else {
        render(questionIndex);
    }
    quiz.appendChild(createDiv);

}

function allDone() {
    quiz.innerHTML = "";
    fiveHundredSeconds.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Completion"

    quiz.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quiz.appendChild(createP);

    if (fiveHundredSeconds >= 0) {
        var timeRemaining = fiveHundredSeconds;
        var createP2 = document.createElement("p");
        clearInterval(penaltyContainer);
        createP.textContent = "Final Score: " + timeRemaining;

        quiz.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quiz.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quiz.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quiz.appendChild(createSubmit);


    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("Null");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var scores = localStorage.getItem("scores");
            if (Scores === null) {
                scores = [];
            } else {
                scores = JSON.parse(scores);
            }
            scores.push(finalScore);
            var newScore = JSON.stringify(scores);
            localStorage.setItem("Scores", newScore);
            window.location.replace("./HallofFame.html");
        }

    });

    var scores = localStorage.getItem("scores");
    allScores = JSON.parse(scores);

    if (scores !== null) {

        for (var i = 0; i < scores.length; i++) {

            var createLi = document.createElement("li");
            createLi.textContent = allScores[i].initials + " " + scores[i].points;
            highScore.appendChild(createLi);


            // Thank you, slack! //
            startOver.addEventListener("click", function () {
                window.location.replace("./index.html");
            });
