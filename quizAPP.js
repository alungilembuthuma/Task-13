// quizApp.js
const chalk = require('chalk');
const readline = require('readline');

const questions = [
    { question: "What is 2 + 2?", options: ["a) 3", "b) 4", "c) 5", "d) 6"], answer: "b" },
    { question: "What is the capital of France?", options: ["a) Berlin", "b) London", "c) Paris", "d) Rome"], answer: "c" },
    // Add 8 more questions here in the same format
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentQuestionIndex = 0;
let score = 0;
const totalQuizTime = 100; // in seconds
let quizTimer = totalQuizTime;
const questionTimeLimit = 10; // in seconds

// Function to start the quiz
function startQuiz() {
    console.log("Welcome to the quiz! You have 100 seconds to answer 10 questions.");
    const quizInterval = setInterval(() => {
        quizTimer--;
        if (quizTimer <= 0) {
            clearInterval(quizInterval);
            console.log(chalk.yellow("\nTime's up for the quiz!"));
            endQuiz();
        }
    }, 1000);

    askQuestion();
}

// Function to ask each question
function askQuestion() {
    if (currentQuestionIndex >= questions.length || quizTimer <= 0) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    let timeLeft = questionTimeLimit;

    console.log(`\nQuestion ${currentQuestionIndex + 1}: ${question.question}`);
    question.options.forEach(option => console.log(option));
    
    const questionTimer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            console.log(chalk.yellow("\nTime's up for this question!"));
            clearInterval(questionTimer);
            moveToNextQuestion();
        }
    }, 1000);

    rl.question("\nYour answer (a/b/c/d): ", (input) => {
        clearInterval(questionTimer);
        handleAnswer(input);
    });
}

// Function to handle user answer
function handleAnswer(input) {
    const answer = input.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (['a', 'b', 'c', 'd'].includes(answer)) {
        if (answer === correctAnswer) {
            console.log(chalk.green("Correct!"));
            score++;
        } else {
            console.log(chalk.red("Wrong answer."));
        }
    } else {
        console.log(chalk.red("Invalid input. Moving to the next question."));
    }
    moveToNextQuestion();
}

// Function to progress to the next question
function moveToNextQuestion() {
    currentQuestionIndex++;
    askQuestion();
}

// Function to end the quiz and show the score
function endQuiz() {
    rl.close();
    console.log(chalk.blue(`\nQuiz ended! Your score: ${score} out of ${questions.length}`));
}

// Start the quiz
startQuiz();
