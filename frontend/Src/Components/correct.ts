import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Correct {
//     constructor() {
//         this.userData = Auth.getUserInfo();
//         this.userId = this.userData.userId;
//         this.userEmail = this.userData.userEmail;
//         this.userFullName = this.userData.fullName;
//         this.testId = null;
//         this.quiz = null;
//         this.currentTestElement = document.getElementById("current-test");
//         this.testId = sessionStorage.getItem("dataId");
//         document.getElementById('correctPerson').innerText = this.userFullName;
//         document.getElementById('correctEmail').innerText = this.userEmail;
//         document.getElementById("back").onclick = this.seeResultPage;
//
//         this.init();
//     }
//
//     async init() {
//         if (this.testId && this.userId) {
//             try {
//                 const result = await CustomHttp.request(config.host + '/tests/' + this.testId + '/result/details?userId=' + this.userId);
//                 if (result) {
//                     if (result.error) {
//                         throw new Error(result.error);
//                     }
//                     this.quiz = result;
//                     this.showAnswers();
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }
//
//     showAnswers() {
//         this.currentTestElement.innerText = this.quiz.test.name;
//         const questions = this.quiz.test.questions;
//         const testResultElement = document.querySelector(".correct__questions");
//
//         for (let i = 0; i < questions.length; i++) {
//             const answers = questions[i].answers;
//             const testQuestionTitleElement = document.createElement("div");
//             testQuestionTitleElement.innerHTML = "<span>  Вопрос " + [i + 1] + ": </span>" + questions[i].question;
//             testResultElement.appendChild(testQuestionTitleElement);
//             const testAnswersElement = document.createElement("div");
//
//             testQuestionTitleElement.className = "correct__questions_title";
//             testAnswersElement.className = "correct__questions_answers";
//
//             answers.forEach(answer => {
//                 const circleElement = document.createElement("div");
//                 const circleTwoElement = document.createElement("div");
//                 const testAnswerTextElement = document.createElement("div");
//                 const testAnswerElement = document.createElement("div");
//
//                 testAnswerElement.className = "correct__questions_answers-answer";
//                 testAnswerTextElement.className = "correct__questions_answers-answer-text";
//                 circleElement.className = "correct__questions_answers-answer-circle";
//                 circleTwoElement.className = "correct__questions_answers-answer-circle-inner";
//
//                 if (answer.correct === true) {
//                     testAnswerTextElement.classList.add("green");
//                     circleElement.classList.add("green-circle");
//                 } else if (answer.correct === false) {
//                     testAnswerTextElement.classList.add("red");
//                     circleElement.classList.add("red-circle");
//                 }
//
//                 circleElement.appendChild(circleTwoElement);
//                 testAnswerElement.appendChild(circleElement);
//                 testAnswerElement.appendChild(testAnswerTextElement);
//                 testAnswersElement.appendChild(testAnswerElement);
//                 testAnswerTextElement.innerHTML = answer.answer;
//                 testResultElement.appendChild(testAnswersElement);
//             });
//         }
//     }
//
//
//     seeResultPage() {
//         location.href = "#/result";
//     }
//
}