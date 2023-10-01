/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Src/Components/choice.ts":
/*!**********************************!*\
  !*** ./Src/Components/choice.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Choice = void 0;
const custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./Src/services/custom-http.ts");
const config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
const auth_1 = __webpack_require__(/*! ../services/auth */ "./Src/services/auth.ts");
class Choice {
    constructor() {
        this.quizzes = [];
        this.testResult = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.quizzes = yield custom_http_1.CustomHttp.request(config_1.default.host + '/tests');
            }
            catch (error) {
                console.log(error);
                return;
            }
            const userInfo = auth_1.Auth.getUserInfo();
            if (userInfo) {
                try {
                    const result = yield custom_http_1.CustomHttp.request(config_1.default.host + '/tests/results?userId=' + userInfo.userId);
                    if (result) {
                        if (result.error !== undefined) {
                            throw new Error(result.message);
                        }
                        this.testResult = result;
                    }
                }
                catch (error) {
                    console.log(error);
                    return;
                }
            }
            this.processQuizzes();
        });
    }
    processQuizzes() {
        const choiceOptionsElement = document.getElementById("choice-options");
        const that = this;
        if (this.quizzes && this.quizzes.length > 0 && choiceOptionsElement) {
            this.quizzes.forEach((quiz) => {
                const choiceOptionElement = document.createElement("div");
                choiceOptionElement.className = "choice__options_option";
                choiceOptionElement.setAttribute("data-id", quiz.id.toString());
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                };
                const choiceOptionTextElement = document.createElement("div");
                choiceOptionTextElement.className = "choice__options_option-text";
                choiceOptionTextElement.innerText = quiz.name;
                const choiceOptionArrowElement = document.createElement("div");
                choiceOptionArrowElement.className = "choice__options_option-arrow";
                if (this.testResult) {
                    const result = this.testResult.find((item) => item.testId === quiz.id);
                    if (result) {
                        const choiceOptionResultElement = document.createElement("div");
                        choiceOptionResultElement.className = "choice__options_option-result";
                        choiceOptionResultElement.innerHTML = '<div>Результат</div><div>' + result.score + '/' + result.total + '</div>';
                        choiceOptionElement.appendChild(choiceOptionResultElement);
                    }
                }
                const choiceOptionImageElement = document.createElement("img");
                choiceOptionImageElement.setAttribute("src", "/Images/arrow.png");
                choiceOptionImageElement.setAttribute("alt", "arrow");
                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }
    }
    chooseQuiz(element) {
        const dataId = element.getAttribute("data-id");
        if (dataId) {
            sessionStorage.setItem("dataId", dataId);
            location.href = "#/test";
        }
    }
}
exports.Choice = Choice;


/***/ }),

/***/ "./Src/Components/correct.ts":
/*!***********************************!*\
  !*** ./Src/Components/correct.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Correct = void 0;
class Correct {
}
exports.Correct = Correct;


/***/ }),

/***/ "./Src/Components/form.ts":
/*!********************************!*\
  !*** ./Src/Components/form.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
const custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./Src/services/custom-http.ts");
const auth_1 = __webpack_require__(/*! ../services/auth */ "./Src/services/auth.ts");
const config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
class Form {
    constructor(page) {
        this.fields = [];
        this.page = page;
        this.agreeElement = null;
        this.processElement = null;
        const accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
        if (accessToken) {
            location.href = '#/choice';
            return;
        }
        this.fields = [
            {
                name: "email",
                id: "email",
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: "password",
                id: "password",
                element: null,
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                valid: false,
            },
        ];
        if (this.page === 'signup') {
            this.fields.unshift({
                name: "name",
                id: "name",
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            }, {
                name: "lastName",
                id: "last-name",
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            });
        }
        const that = this;
        this.fields.forEach((item) => {
            item.element = document.getElementById(item.id);
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                };
            }
        });
        this.processElement = document.getElementById("process");
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm();
            };
        }
        if (this.page === 'signup') {
            this.agreeElement = document.getElementById("agree");
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm();
                };
            }
        }
    }
    validateField(field, element) {
        if (element === null || element === void 0 ? void 0 : element.parentNode) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = "red";
                field.valid = false;
            }
            else {
                element.parentNode.removeAttribute("style");
                field.valid = true;
            }
        }
        this.validateForm();
    }
    validateForm() {
        const validForm = this.fields.every((item) => item.valid);
        const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (this.processElement) {
            if (isValid) {
                this.processElement.removeAttribute("disabled");
            }
            else {
                this.processElement.setAttribute("disabled", "disabled");
            }
        }
        return isValid;
    }
    processForm() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validateForm()) {
                const email = (_b = (_a = this.fields.find((item) => item.name === 'email')) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.value;
                const password = (_d = (_c = this.fields.find((item) => item.name === 'password')) === null || _c === void 0 ? void 0 : _c.element) === null || _d === void 0 ? void 0 : _d.value;
                if (this.page === 'signup') {
                    try {
                        const result = yield custom_http_1.CustomHttp.request(config_1.default.host + '/signup', 'POST', {
                            name: (_f = (_e = this.fields.find((item) => item.name === 'name')) === null || _e === void 0 ? void 0 : _e.element) === null || _f === void 0 ? void 0 : _f.value,
                            lastName: (_h = (_g = this.fields.find((item) => item.name === 'lastName')) === null || _g === void 0 ? void 0 : _g.element) === null || _h === void 0 ? void 0 : _h.value,
                            email: email,
                            password: password
                        });
                        if (result) {
                            if (result.error || !result.user) {
                                throw new Error(result.message);
                            }
                        }
                    }
                    catch (error) {
                        console.log(error);
                        return;
                    }
                }
                try {
                    if (email && password) {
                        const result = yield custom_http_1.CustomHttp.request(config_1.default.host + '/login', 'POST', {
                            email: email,
                            password: password
                        });
                        if (result) {
                            if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                                throw new Error(result.message);
                            }
                            auth_1.Auth.setTokens(result.accessToken, result.refreshToken);
                            auth_1.Auth.setUserInfo({
                                fullName: result.fullName,
                                userId: result.userId,
                                userEmail: email
                            });
                            location.href = '#/choice';
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
}
exports.Form = Form;


/***/ }),

/***/ "./Src/Components/result.ts":
/*!**********************************!*\
  !*** ./Src/Components/result.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
const custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./Src/services/custom-http.ts");
const config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
const auth_1 = __webpack_require__(/*! ../services/auth */ "./Src/services/auth.ts");
class Result {
    constructor() {
        this.testId = sessionStorage.getItem('dataId');
        this.resultScore = document.getElementById("result-score");
        this.link = document.getElementById("link");
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.link) {
                this.link.onclick = this.nextPage;
            }
            const userInfo = auth_1.Auth.getUserInfo();
            if (!userInfo) {
                location.href = '#/';
                return;
            }
            if (this.testId) {
                try {
                    const result = yield custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.testId + '/result?userId=' + userInfo.userId);
                    if (result) {
                        if (result.error) {
                            throw new Error(result.message);
                        }
                        if (this.resultScore) {
                            this.resultScore.innerText = result.score + '/' + result.total;
                        }
                        return;
                    }
                }
                catch (error) {
                    console.log(error);
                    return;
                }
            }
            location.href = '#/';
        });
    }
    nextPage() {
        location.href = "#/correct";
    }
}
exports.Result = Result;


/***/ }),

/***/ "./Src/Components/test.ts":
/*!********************************!*\
  !*** ./Src/Components/test.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Test = void 0;
const custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./Src/services/custom-http.ts");
const config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
const action_test_type_1 = __webpack_require__(/*! ../types/action-test.type */ "./Src/types/action-test.type.ts");
const auth_1 = __webpack_require__(/*! ../services/auth */ "./Src/services/auth.ts");
class Test {
    constructor() {
        this.interval = 0;
        this.progressBarElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.nextButtonElement = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.quiz = null;
        this.currentQuestionIndex = 1;
        this.userResult = [];
        this.testId = sessionStorage.getItem("dataId");
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.testId) {
                try {
                    const result = yield custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.testId);
                    if (result) {
                        if (result.error !== undefined) {
                            throw new Error(result.message);
                        }
                        this.quiz = result;
                        this.startQuiz();
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    startQuiz() {
        if (!this.quiz)
            return;
        this.progressBarElement = document.getElementById("progressBar");
        this.questionTitleElement = document.getElementById("question-title");
        this.optionsElement = document.getElementById("options");
        this.prevButtonElement = document.getElementById("prev");
        this.nextButtonElement = document.getElementById("next");
        this.passButtonElement = document.getElementById("pass");
        if (this.nextButtonElement) {
            this.nextButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.next);
        }
        if (this.prevButtonElement) {
            this.prevButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.prev);
        }
        if (this.passButtonElement) {
            this.passButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.pass);
        }
        const prevTitleElement = document.querySelector(".test__prev-title");
        if (prevTitleElement) {
            prevTitleElement.innerText = this.quiz.name;
        }
        this.prepareProgressBar();
        this.showQuestion();
        const timerElement = document.getElementById("timer");
        let seconds = 59;
        const that = this;
        this.interval = window.setInterval(function () {
            seconds--;
            if (timerElement) {
                timerElement.innerText = seconds.toString();
            }
            if (seconds === 0) {
                clearInterval(that.interval);
                that.complete();
            }
        }.bind(this), 1000);
    }
    prepareProgressBar() {
        if (!this.quiz)
            return;
        for (let i = 0; i < this.quiz.questions.length; i++) {
            const itemElement = document.createElement("div");
            itemElement.className = "test__progressBar_item" + (i === 0 ? " active" : "");
            const itemCircleElement = document.createElement("div");
            itemCircleElement.className = "test__progressBar_item-circle";
            const itemTextElement = document.createElement("div");
            itemTextElement.className = "test__progressBar_item-text";
            itemTextElement.innerText = "Вопрос" + (i + 1);
            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);
            if (this.progressBarElement) {
                this.progressBarElement.appendChild(itemElement);
            }
        }
    }
    showQuestion() {
        if (!this.quiz)
            return;
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        if (this.questionTitleElement) {
            this.questionTitleElement.innerHTML = "<span>  Вопрос " + this.currentQuestionIndex + " :</span>" + activeQuestion.question;
        }
        if (this.optionsElement) {
            this.optionsElement.innerHTML = "";
        }
        const that = this;
        const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);
        activeQuestion.answers.forEach((answer) => {
            const optionElement = document.createElement("div");
            optionElement.className = "test__question_options-option";
            const inputId = "answer-" + answer.id;
            const inputElement = document.createElement("input");
            inputElement.className = "option-answer";
            inputElement.setAttribute("id", inputId);
            inputElement.setAttribute("type", "radio");
            inputElement.setAttribute("name", "answer");
            inputElement.setAttribute("value", answer.id.toString());
            if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                inputElement.setAttribute("checked", "checked");
            }
            inputElement.onchange = function () {
                that.chooseAnswer();
            };
            const labelElement = document.createElement("label");
            labelElement.setAttribute("for", inputId);
            labelElement.innerText = answer.answer;
            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);
            if (this.optionsElement) {
                this.optionsElement.appendChild(optionElement);
            }
        });
        if (this.nextButtonElement) {
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute("disabled");
            }
            else {
                this.nextButtonElement.setAttribute("disabled", "disabled");
            }
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = "Завершить";
            }
            else {
                this.nextButtonElement.innerText = "Далее";
            }
        }
        if (this.prevButtonElement) {
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute("disabled");
            }
            else {
                this.prevButtonElement.setAttribute("disabled", "disabled");
            }
        }
    }
    chooseAnswer() {
        if (this.nextButtonElement) {
            this.nextButtonElement.removeAttribute("disabled");
        }
    }
    move(action) {
        if (!this.quiz)
            return;
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        const chosenAnswer = Array.from(document.getElementsByClassName("option-answer")).find(element => {
            return element.checked;
        });
        let chosenAnswerId = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }
        const existingResult = this.userResult.find((item) => {
            return item.questionId === activeQuestion.id;
        });
        if (chosenAnswerId) {
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            }
            else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId
                });
            }
        }
        if (action === action_test_type_1.ActionTestType.next || action === action_test_type_1.ActionTestType.pass) {
            this.currentQuestionIndex++;
        }
        else {
            this.currentQuestionIndex--;
        }
        if (this.currentQuestionIndex > this.quiz.questions.length) {
            clearInterval(this.interval);
            this.complete();
            return;
        }
        if (this.progressBarElement) {
            Array.from(this.progressBarElement.children).forEach((item, index) => {
                const currentItemIndex = index + 1;
                item.classList.remove("complete");
                item.classList.remove("active");
                if (currentItemIndex === this.currentQuestionIndex) {
                    item.classList.add("active");
                }
                else if (currentItemIndex < this.currentQuestionIndex) {
                    item.classList.add("complete");
                }
            });
        }
        this.showQuestion();
    }
    complete() {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = auth_1.Auth.getUserInfo();
            if (!userInfo) {
                location.href = '#/';
                return;
            }
            let answersIdString = [];
            this.userResult.forEach((item) => {
                answersIdString.push(item.chosenAnswerId);
            });
            try {
                const result = yield custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.testId + '/pass', 'POST', {
                    userId: userInfo.userId,
                    results: this.userResult
                });
                if (result) {
                    if (result.error) {
                        throw new Error(result.message);
                    }
                    sessionStorage.setItem("score", result.score.toString());
                    sessionStorage.setItem("total", result.total.toString());
                    sessionStorage.setItem("answers", answersIdString.join(","));
                    location.href = "#/result";
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.Test = Test;


/***/ }),

/***/ "./Src/router.ts":
/*!***********************!*\
  !*** ./Src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
const form_1 = __webpack_require__(/*! ./Components/form */ "./Src/Components/form.ts");
const choice_1 = __webpack_require__(/*! ./Components/choice */ "./Src/Components/choice.ts");
const correct_1 = __webpack_require__(/*! ./Components/correct */ "./Src/Components/correct.ts");
const result_1 = __webpack_require__(/*! ./Components/result */ "./Src/Components/result.ts");
const test_1 = __webpack_require__(/*! ./Components/test */ "./Src/Components/test.ts");
const auth_1 = __webpack_require__(/*! ./services/auth */ "./Src/services/auth.ts");
class Router {
    constructor() {
        this.contentElement = document.getElementById("content");
        this.stylesElement = document.getElementById("styles");
        this.titleElement = document.getElementById("title");
        this.profileElement = document.getElementById("profile");
        this.profileFullNameElement = document.getElementById("profile-full-name");
        this.routes = [
            {
                route: "#/",
                title: "Главная",
                template: "Templates/index.html",
                styles: "Styles/index.min.css",
                load: () => {
                }
            },
            {
                route: "#/signup",
                title: "Регистрация",
                template: "Templates/signup.html",
                styles: "Styles/form.min.css",
                load: () => {
                    new form_1.Form('signup');
                }
            },
            {
                route: "#/login",
                title: "Вход в систему",
                template: "Templates/login.html",
                styles: "Styles/form.min.css",
                load: () => {
                    new form_1.Form('login');
                }
            },
            {
                route: "#/choice",
                title: "Выбор Теста",
                template: "Templates/choice.html",
                styles: "Styles/choice.min.css",
                load: () => {
                    new choice_1.Choice();
                }
            },
            {
                route: "#/test",
                title: "Тест",
                template: "Templates/test.html",
                styles: "Styles/test.min.css",
                load: () => {
                    new test_1.Test();
                }
            },
            {
                route: "#/result",
                title: "Результат",
                template: "Templates/result.html",
                styles: "Styles/result.min.css",
                load: () => {
                    new result_1.Result();
                }
            },
            {
                route: "#/correct",
                title: "Верные Ответы",
                template: "Templates/correct.html",
                styles: "Styles/correct.min.css",
                load: () => {
                    new correct_1.Correct();
                }
            },
        ];
    }
    openRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            const urlRoute = window.location.hash.split('?')[0];
            if (urlRoute === '#/logout') {
                yield auth_1.Auth.logout();
                window.location.href = "#/";
                return;
            }
            const newRoute = this.routes.find(item => {
                return item.route === urlRoute;
            });
            if (!newRoute) {
                window.location.href = "#/";
                return;
            }
            if (!this.contentElement || !this.stylesElement || !this.titleElement || !this.profileElement || !this.profileFullNameElement) {
                if (urlRoute === '#/') {
                    return;
                }
                else {
                    window.location.href = "#/";
                    return;
                }
            }
            this.contentElement.innerHTML = yield fetch(newRoute.template).then(response => response.text());
            this.stylesElement.setAttribute("href", newRoute.styles);
            this.titleElement.innerText = newRoute.title;
            const userInfo = auth_1.Auth.getUserInfo();
            const accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
            if (userInfo && accessToken) {
                this.profileElement.style.display = 'flex';
                this.profileFullNameElement.innerText = userInfo.fullName;
            }
            else {
                this.profileElement.style.display = 'none';
            }
            newRoute.load();
        });
    }
}
exports.Router = Router;


/***/ }),

/***/ "./Src/services/auth.ts":
/*!******************************!*\
  !*** ./Src/services/auth.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
const config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
class Auth {
    static processUnauthorizedResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = localStorage.getItem(this.refreshTokenKey);
            if (refreshToken) {
                const response = yield fetch(config_1.default.host + '/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken: refreshToken })
                });
                if (response && response.status === 200) {
                    const result = yield response.json();
                    if (result && !result.error && result.accessToken && result.refreshToken) {
                        this.setTokens(result.accessToken, result.refreshToken);
                        return true;
                    }
                }
            }
            this.removeTokens();
            location.href = '#/';
            return false;
        });
    }
    static logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = localStorage.getItem(this.refreshTokenKey);
            if (refreshToken) {
                const response = yield fetch(config_1.default.host + '/logout', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken: refreshToken })
                });
                if (response && response.status === 200) {
                    const result = yield response.json();
                    if (result && !result.error) {
                        Auth.removeTokens();
                        localStorage.removeItem(this.userInfoKey);
                        return true;
                    }
                }
            }
            return false;
        });
    }
    static setTokens(accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
    static removeTokens() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
    static setUserInfo(info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    }
    static getUserInfo() {
        const userInfo = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }
}
exports.Auth = Auth;
Auth.accessTokenKey = 'accessToken';
Auth.refreshTokenKey = 'refreshToken';
Auth.userInfoKey = 'userInfo';


/***/ }),

/***/ "./Src/services/custom-http.ts":
/*!*************************************!*\
  !*** ./Src/services/custom-http.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomHttp = void 0;
const auth_1 = __webpack_require__(/*! ./auth */ "./Src/services/auth.ts");
class CustomHttp {
    static request(url, method = "GET", body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                method: method,
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            let token = localStorage.getItem(auth_1.Auth.accessTokenKey);
            let refreshToken = localStorage.getItem(auth_1.Auth.refreshTokenKey);
            if (token) {
                params.headers['x-access-token'] = token;
                params.headers['x-auth-token'] = refreshToken;
            }
            if (body) {
                params.body = JSON.stringify(body);
            }
            const response = yield fetch(url, params);
            if (response.status < 200 || response.status >= 300) {
                if (response.status === 401) {
                    const result = yield auth_1.Auth.processUnauthorizedResponse();
                    if (result) {
                        return yield this.request(url, method, body);
                    }
                    else {
                        return null;
                    }
                }
                // return response.text().then(text => {
                //     throw new Error(text);
                // });
                throw new Error(response.statusText);
            }
            return yield response.json();
        });
    }
}
exports.CustomHttp = CustomHttp;


/***/ }),

/***/ "./Src/types/action-test.type.ts":
/*!***************************************!*\
  !*** ./Src/types/action-test.type.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionTestType = void 0;
var ActionTestType;
(function (ActionTestType) {
    ActionTestType["next"] = "next";
    ActionTestType["pass"] = "pass";
    ActionTestType["prev"] = "prev";
})(ActionTestType || (exports.ActionTestType = ActionTestType = {}));


/***/ }),

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    host: 'http://localhost:3000/api'
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./Src/app.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const router_1 = __webpack_require__(/*! ./router */ "./Src/router.ts");
class App {
    constructor() {
        this.router = new router_1.Router();
        window.addEventListener("DOMContentLoaded", this.handleRouteChanging.bind(this));
        window.addEventListener("popstate", this.handleRouteChanging.bind(this));
    }
    handleRouteChanging() {
        this.router.openRoute();
    }
}
(new App());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFDN0UsQ0FBQztJQUVPLG1CQUFtQjtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQUVELENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaXRsb2dpYTI0bW9kdWxlcHVyZV9qc19xdWl6X21vZHVsZXMvLi9TcmMvQ29tcG9uZW50cy9jaG9pY2UudHMiLCJ3ZWJwYWNrOi8vaXRsb2dpYTI0bW9kdWxlcHVyZV9qc19xdWl6X21vZHVsZXMvLi9TcmMvQ29tcG9uZW50cy9jb3JyZWN0LnRzIiwid2VicGFjazovL2l0bG9naWEyNG1vZHVsZXB1cmVfanNfcXVpel9tb2R1bGVzLy4vU3JjL0NvbXBvbmVudHMvZm9ybS50cyIsIndlYnBhY2s6Ly9pdGxvZ2lhMjRtb2R1bGVwdXJlX2pzX3F1aXpfbW9kdWxlcy8uL1NyYy9Db21wb25lbnRzL3Jlc3VsdC50cyIsIndlYnBhY2s6Ly9pdGxvZ2lhMjRtb2R1bGVwdXJlX2pzX3F1aXpfbW9kdWxlcy8uL1NyYy9Db21wb25lbnRzL3Rlc3QudHMiLCJ3ZWJwYWNrOi8vaXRsb2dpYTI0bW9kdWxlcHVyZV9qc19xdWl6X21vZHVsZXMvLi9TcmMvcm91dGVyLnRzIiwid2VicGFjazovL2l0bG9naWEyNG1vZHVsZXB1cmVfanNfcXVpel9tb2R1bGVzLy4vU3JjL3NlcnZpY2VzL2F1dGgudHMiLCJ3ZWJwYWNrOi8vaXRsb2dpYTI0bW9kdWxlcHVyZV9qc19xdWl6X21vZHVsZXMvLi9TcmMvc2VydmljZXMvY3VzdG9tLWh0dHAudHMiLCJ3ZWJwYWNrOi8vaXRsb2dpYTI0bW9kdWxlcHVyZV9qc19xdWl6X21vZHVsZXMvLi9TcmMvdHlwZXMvYWN0aW9uLXRlc3QudHlwZS50cyIsIndlYnBhY2s6Ly9pdGxvZ2lhMjRtb2R1bGVwdXJlX2pzX3F1aXpfbW9kdWxlcy8uL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vaXRsb2dpYTI0bW9kdWxlcHVyZV9qc19xdWl6X21vZHVsZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaXRsb2dpYTI0bW9kdWxlcHVyZV9qc19xdWl6X21vZHVsZXMvLi9TcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q3VzdG9tSHR0cH0gZnJvbSBcIi4uL3NlcnZpY2VzL2N1c3RvbS1odHRwXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IHtBdXRofSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoJztcclxuaW1wb3J0IHtRdWl6TGlzdFR5cGV9IGZyb20gXCIuLi90eXBlcy9xdWl6LWxpc3QudHlwZVwiO1xyXG5pbXBvcnQge1Rlc3RSZXN1bHRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvdGVzdC1yZXN1bHQudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJJbmZvVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcbmltcG9ydCB7RGVmYXVsdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2RlZmF1bHQtcmVzcG9uc2UudHlwZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDaG9pY2Uge1xyXG4gICAgcHJpdmF0ZSBxdWl6emVzOiBRdWl6TGlzdFR5cGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB0ZXN0UmVzdWx0OiBUZXN0UmVzdWx0VHlwZVtdIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVpenplcyA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMnKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB1c2VySW5mbzogVXNlckluZm9UeXBlIHwgbnVsbCA9IEF1dGguZ2V0VXNlckluZm8oKTtcclxuICAgICAgICBpZiAodXNlckluZm8pIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogRGVmYXVsdFJlc3BvbnNlVHlwZSB8IFRlc3RSZXN1bHRUeXBlW10gPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzL3Jlc3VsdHM/dXNlcklkPScgKyB1c2VySW5mby51c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdCA9IHJlc3VsdCBhcyBUZXN0UmVzdWx0VHlwZVtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzUXVpenplcygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByb2Nlc3NRdWl6emVzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNob2ljZU9wdGlvbnNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNob2ljZS1vcHRpb25zXCIpO1xyXG4gICAgICAgIGNvbnN0IHRoYXQ6IENob2ljZSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMucXVpenplcyAmJiB0aGlzLnF1aXp6ZXMubGVuZ3RoID4gMCAmJiBjaG9pY2VPcHRpb25zRWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5xdWl6emVzLmZvckVhY2goKHF1aXo6IFF1aXpMaXN0VHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuY2xhc3NOYW1lID0gXCJjaG9pY2VfX29wdGlvbnNfb3B0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgcXVpei5pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNob29zZVF1aXooPEhUTUxFbGVtZW50PnRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25UZXh0RWxlbWVudC5jbGFzc05hbWUgPSBcImNob2ljZV9fb3B0aW9uc19vcHRpb24tdGV4dFwiO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQuaW5uZXJUZXh0ID0gcXVpei5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNob2ljZU9wdGlvbkFycm93RWxlbWVudDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkFycm93RWxlbWVudC5jbGFzc05hbWUgPSBcImNob2ljZV9fb3B0aW9uc19vcHRpb24tYXJyb3dcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBUZXN0UmVzdWx0VHlwZSB8IHVuZGVmaW5lZCA9IHRoaXMudGVzdFJlc3VsdC5maW5kKChpdGVtOiBUZXN0UmVzdWx0VHlwZSk6IGJvb2xlYW4gPT4gaXRlbS50ZXN0SWQgPT09IHF1aXouaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uUmVzdWx0RWxlbWVudDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uUmVzdWx0RWxlbWVudC5jbGFzc05hbWUgPSBcImNob2ljZV9fb3B0aW9uc19vcHRpb24tcmVzdWx0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvblJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+0KDQtdC30YPQu9GM0YLQsNGCPC9kaXY+PGRpdj4nICsgcmVzdWx0LnNjb3JlICsgJy8nICsgcmVzdWx0LnRvdGFsICsgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uUmVzdWx0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uSW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi9JbWFnZXMvYXJyb3cucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uSW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcImFsdFwiLCBcImFycm93XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkFycm93RWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uc0VsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaG9vc2VRdWl6KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YUlkOiBzdHJpbmcgfCBudWxsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgIGlmIChkYXRhSWQpIHtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImRhdGFJZFwiLCBkYXRhSWQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIjL3Rlc3RcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnLmpzXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb3JyZWN0IHtcclxuLy8gICAgIGNvbnN0cnVjdG9yKCkge1xyXG4vLyAgICAgICAgIHRoaXMudXNlckRhdGEgPSBBdXRoLmdldFVzZXJJbmZvKCk7XHJcbi8vICAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLnVzZXJEYXRhLnVzZXJJZDtcclxuLy8gICAgICAgICB0aGlzLnVzZXJFbWFpbCA9IHRoaXMudXNlckRhdGEudXNlckVtYWlsO1xyXG4vLyAgICAgICAgIHRoaXMudXNlckZ1bGxOYW1lID0gdGhpcy51c2VyRGF0YS5mdWxsTmFtZTtcclxuLy8gICAgICAgICB0aGlzLnRlc3RJZCA9IG51bGw7XHJcbi8vICAgICAgICAgdGhpcy5xdWl6ID0gbnVsbDtcclxuLy8gICAgICAgICB0aGlzLmN1cnJlbnRUZXN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudC10ZXN0XCIpO1xyXG4vLyAgICAgICAgIHRoaXMudGVzdElkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImRhdGFJZFwiKTtcclxuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ycmVjdFBlcnNvbicpLmlubmVyVGV4dCA9IHRoaXMudXNlckZ1bGxOYW1lO1xyXG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3JyZWN0RW1haWwnKS5pbm5lclRleHQgPSB0aGlzLnVzZXJFbWFpbDtcclxuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tcIikub25jbGljayA9IHRoaXMuc2VlUmVzdWx0UGFnZTtcclxuLy9cclxuLy8gICAgICAgICB0aGlzLmluaXQoKTtcclxuLy8gICAgIH1cclxuLy9cclxuLy8gICAgIGFzeW5jIGluaXQoKSB7XHJcbi8vICAgICAgICAgaWYgKHRoaXMudGVzdElkICYmIHRoaXMudXNlcklkKSB7XHJcbi8vICAgICAgICAgICAgIHRyeSB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzLycgKyB0aGlzLnRlc3RJZCArICcvcmVzdWx0L2RldGFpbHM/dXNlcklkPScgKyB0aGlzLnVzZXJJZCk7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWl6ID0gcmVzdWx0O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Fuc3dlcnMoKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy9cclxuLy8gICAgIHNob3dBbnN3ZXJzKCkge1xyXG4vLyAgICAgICAgIHRoaXMuY3VycmVudFRlc3RFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMucXVpei50ZXN0Lm5hbWU7XHJcbi8vICAgICAgICAgY29uc3QgcXVlc3Rpb25zID0gdGhpcy5xdWl6LnRlc3QucXVlc3Rpb25zO1xyXG4vLyAgICAgICAgIGNvbnN0IHRlc3RSZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb3JyZWN0X19xdWVzdGlvbnNcIik7XHJcbi8vXHJcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgY29uc3QgYW5zd2VycyA9IHF1ZXN0aW9uc1tpXS5hbnN3ZXJzO1xyXG4vLyAgICAgICAgICAgICBjb25zdCB0ZXN0UXVlc3Rpb25UaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyAgICAgICAgICAgICB0ZXN0UXVlc3Rpb25UaXRsZUVsZW1lbnQuaW5uZXJIVE1MID0gXCI8c3Bhbj4gINCS0L7Qv9GA0L7RgSBcIiArIFtpICsgMV0gKyBcIjogPC9zcGFuPlwiICsgcXVlc3Rpb25zW2ldLnF1ZXN0aW9uO1xyXG4vLyAgICAgICAgICAgICB0ZXN0UmVzdWx0RWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0UXVlc3Rpb25UaXRsZUVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICBjb25zdCB0ZXN0QW5zd2Vyc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICB0ZXN0UXVlc3Rpb25UaXRsZUVsZW1lbnQuY2xhc3NOYW1lID0gXCJjb3JyZWN0X19xdWVzdGlvbnNfdGl0bGVcIjtcclxuLy8gICAgICAgICAgICAgdGVzdEFuc3dlcnNFbGVtZW50LmNsYXNzTmFtZSA9IFwiY29ycmVjdF9fcXVlc3Rpb25zX2Fuc3dlcnNcIjtcclxuLy9cclxuLy8gICAgICAgICAgICAgYW5zd2Vycy5mb3JFYWNoKGFuc3dlciA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZVR3b0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgdGVzdEFuc3dlclRleHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHRlc3RBbnN3ZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy9cclxuLy8gICAgICAgICAgICAgICAgIHRlc3RBbnN3ZXJFbGVtZW50LmNsYXNzTmFtZSA9IFwiY29ycmVjdF9fcXVlc3Rpb25zX2Fuc3dlcnMtYW5zd2VyXCI7XHJcbi8vICAgICAgICAgICAgICAgICB0ZXN0QW5zd2VyVGV4dEVsZW1lbnQuY2xhc3NOYW1lID0gXCJjb3JyZWN0X19xdWVzdGlvbnNfYW5zd2Vycy1hbnN3ZXItdGV4dFwiO1xyXG4vLyAgICAgICAgICAgICAgICAgY2lyY2xlRWxlbWVudC5jbGFzc05hbWUgPSBcImNvcnJlY3RfX3F1ZXN0aW9uc19hbnN3ZXJzLWFuc3dlci1jaXJjbGVcIjtcclxuLy8gICAgICAgICAgICAgICAgIGNpcmNsZVR3b0VsZW1lbnQuY2xhc3NOYW1lID0gXCJjb3JyZWN0X19xdWVzdGlvbnNfYW5zd2Vycy1hbnN3ZXItY2lyY2xlLWlubmVyXCI7XHJcbi8vXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoYW5zd2VyLmNvcnJlY3QgPT09IHRydWUpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0ZXN0QW5zd2VyVGV4dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdyZWVuXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNpcmNsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdyZWVuLWNpcmNsZVwiKTtcclxuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5zd2VyLmNvcnJlY3QgPT09IGZhbHNlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGVzdEFuc3dlclRleHRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJyZWRcIik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY2lyY2xlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicmVkLWNpcmNsZVwiKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICAgICAgICAgIGNpcmNsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY2lyY2xlVHdvRWxlbWVudCk7XHJcbi8vICAgICAgICAgICAgICAgICB0ZXN0QW5zd2VyRWxlbWVudC5hcHBlbmRDaGlsZChjaXJjbGVFbGVtZW50KTtcclxuLy8gICAgICAgICAgICAgICAgIHRlc3RBbnN3ZXJFbGVtZW50LmFwcGVuZENoaWxkKHRlc3RBbnN3ZXJUZXh0RWxlbWVudCk7XHJcbi8vICAgICAgICAgICAgICAgICB0ZXN0QW5zd2Vyc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGVzdEFuc3dlckVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICAgICAgdGVzdEFuc3dlclRleHRFbGVtZW50LmlubmVySFRNTCA9IGFuc3dlci5hbnN3ZXI7XHJcbi8vICAgICAgICAgICAgICAgICB0ZXN0UmVzdWx0RWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0QW5zd2Vyc0VsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vXHJcbi8vICAgICBzZWVSZXN1bHRQYWdlKCkge1xyXG4vLyAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIiMvcmVzdWx0XCI7XHJcbi8vICAgICB9XHJcbi8vXHJcbn0iLCJpbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IHtGb3JtRmllbGRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvZm9ybS1maWVsZC50eXBlXCI7XHJcbmltcG9ydCB7U2lnbnVwUmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvc2lnbnVwLXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtMb2dpblJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2xvZ2luLXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIHtcclxuICAgIHJlYWRvbmx5IHBhZ2U6ICdzaWdudXAnIHwgJ2xvZ2luJztcclxuICAgIHJlYWRvbmx5IGFncmVlRWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XHJcbiAgICByZWFkb25seSBwcm9jZXNzRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBmaWVsZHM6IEZvcm1GaWVsZFR5cGVbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhZ2U6ICdzaWdudXAnIHwgJ2xvZ2luJykge1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgdGhpcy5hZ3JlZUVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0VsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XHJcbiAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy9jaG9pY2UnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmllbGRzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImVtYWlsXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJlbWFpbFwiLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsM30pKyQvLFxyXG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJwYXNzd29yZFwiLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcZCkoPz0uKlsjJEAhJSYqP10pW0EtWmEtelxcZCMkQCElJio/XXs4LDMwfSQvLFxyXG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPT09ICdzaWdudXAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXlvQkC3Qr11b0LAt0Y9dK1xccyokLyxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdE5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJsYXN0LW5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXlvQkC3Qr11b0LAt0Y9dK1xccyokLyxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0aGF0OiBGb3JtID0gdGhpcztcclxuICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKChpdGVtOiBGb3JtRmllbGRUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uaWQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbGlkYXRlRmllbGQuY2FsbCh0aGF0LCBpdGVtLCA8SFRNTElucHV0RWxlbWVudD50aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2Nlc3NcIik7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9jZXNzRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wYWdlID09PSAnc2lnbnVwJykge1xyXG4gICAgICAgICAgICB0aGlzLmFncmVlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdyZWVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWdyZWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFncmVlRWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVGaWVsZChmaWVsZDogRm9ybUZpZWxkVHlwZSwgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZWxlbWVudD8ucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQudmFsdWUgfHwgIWVsZW1lbnQudmFsdWUubWF0Y2goZmllbGQucmVnZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAoZWxlbWVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5ib3JkZXJDb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICBmaWVsZC52YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XHJcbiAgICAgICAgICAgICAgICBmaWVsZC52YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUZvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlRm9ybSgpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRGb3JtOiBib29sZWFuID0gdGhpcy5maWVsZHMuZXZlcnkoKGl0ZW06IEZvcm1GaWVsZFR5cGUpID0+IGl0ZW0udmFsaWQpO1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLmFncmVlRWxlbWVudCA/IHRoaXMuYWdyZWVFbGVtZW50LmNoZWNrZWQgJiYgdmFsaWRGb3JtIDogdmFsaWRGb3JtO1xyXG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcHJvY2Vzc0Zvcm0oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1haWw6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuZmllbGRzLmZpbmQoKGl0ZW06IEZvcm1GaWVsZFR5cGUpOiBib29sZWFuID0+IGl0ZW0ubmFtZSA9PT0gJ2VtYWlsJyk/LmVsZW1lbnQ/LnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5maWVsZHMuZmluZCgoaXRlbTogRm9ybUZpZWxkVHlwZSk6IGJvb2xlYW4gPT4gaXRlbS5uYW1lID09PSAncGFzc3dvcmQnKT8uZWxlbWVudD8udmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSAnc2lnbnVwJykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IFNpZ251cFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvc2lnbnVwJywgJ1BPU1QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZmllbGRzLmZpbmQoKGl0ZW06IEZvcm1GaWVsZFR5cGUpOiBib29sZWFuID0+IGl0ZW0ubmFtZSA9PT0gJ25hbWUnKT8uZWxlbWVudD8udmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0aGlzLmZpZWxkcy5maW5kKChpdGVtOiBGb3JtRmllbGRUeXBlKTogYm9vbGVhbiA9PiBpdGVtLm5hbWUgPT09ICdsYXN0TmFtZScpPy5lbGVtZW50Py52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgIXJlc3VsdC51c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbWFpbCAmJiBwYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogTG9naW5SZXNwb25zZVR5cGUgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL2xvZ2luJywgJ1BPU1QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yIHx8ICFyZXN1bHQuYWNjZXNzVG9rZW4gfHwgIXJlc3VsdC5yZWZyZXNoVG9rZW4gfHwgIXJlc3VsdC5mdWxsTmFtZSB8fCAhcmVzdWx0LnVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdXRoLnNldFRva2VucyhyZXN1bHQuYWNjZXNzVG9rZW4sIHJlc3VsdC5yZWZyZXNoVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdXRoLnNldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lOiByZXN1bHQuZnVsbE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHJlc3VsdC51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IGVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvY2hvaWNlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge0RlZmF1bHRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9kZWZhdWx0LXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtQYXNzVGVzdFR5cGV9IGZyb20gXCIuLi90eXBlcy9wYXNzLXRlc3QudHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3VsdCB7XHJcbiAgICByZWFkb25seSB0ZXN0SWQ6IHN0cmluZyB8IG51bGxcclxuICAgIHByaXZhdGUgcmVzdWx0U2NvcmU6IEhUTUxFbGVtZW50IHwgbnVsbFxyXG4gICAgcmVhZG9ubHkgbGluazogSFRNTEVsZW1lbnQgfCBudWxsXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50ZXN0SWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdkYXRhSWQnKTtcclxuICAgICAgICB0aGlzLnJlc3VsdFNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHQtc2NvcmVcIik7XHJcbiAgICAgICAgdGhpcy5saW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5rXCIpXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5saW5rKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluay5vbmNsaWNrID0gdGhpcy5uZXh0UGFnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdXNlckluZm86IFVzZXJJbmZvVHlwZSB8IG51bGwgPSBBdXRoLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgaWYgKCF1c2VySW5mbykge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvJztcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50ZXN0SWQpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogRGVmYXVsdFJlc3BvbnNlVHlwZSB8IFBhc3NUZXN0VHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMudGVzdElkICsgJy9yZXN1bHQ/dXNlcklkPScgKyB1c2VySW5mby51c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFNjb3JlLmlubmVyVGV4dCA9IChyZXN1bHQgYXMgUGFzc1Rlc3RUeXBlKS5zY29yZSArICcvJyArIChyZXN1bHQgYXMgUGFzc1Rlc3RUeXBlKS50b3RhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy8nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmV4dFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiIy9jb3JyZWN0XCI7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7Q3VzdG9tSHR0cH0gZnJvbSBcIi4uL3NlcnZpY2VzL2N1c3RvbS1odHRwXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IHtRdWl6QW5zd2VyVHlwZSwgUXVpelF1ZXN0aW9uVHlwZSwgUXVpelR5cGV9IGZyb20gXCIuLi90eXBlcy9xdWl6LnR5cGVcIjtcclxuaW1wb3J0IHtVc2VyUmVzdWx0VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3VzZXItcmVzdWx0LnR5cGVcIjtcclxuaW1wb3J0IHtEZWZhdWx0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvZGVmYXVsdC1yZXNwb25zZS50eXBlXCI7XHJcbmltcG9ydCB7QWN0aW9uVGVzdFR5cGV9IGZyb20gXCIuLi90eXBlcy9hY3Rpb24tdGVzdC50eXBlXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge1Rlc3RSZXN1bHRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvdGVzdC1yZXN1bHQudHlwZVwiO1xyXG5pbXBvcnQge1Bhc3NUZXN0VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3Bhc3MtdGVzdC50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGVzdCB7XHJcbiAgICBwcml2YXRlIHByb2dyZXNzQmFyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBwYXNzQnV0dG9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmV2QnV0dG9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBuZXh0QnV0dG9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvblRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBxdWl6OiBRdWl6VHlwZSB8IG51bGw7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRRdWVzdGlvbkluZGV4OiBudW1iZXI7XHJcbiAgICByZWFkb25seSB1c2VyUmVzdWx0OiBVc2VyUmVzdWx0VHlwZVtdO1xyXG4gICAgcmVhZG9ubHkgdGVzdElkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBpbnRlcnZhbDogbnVtYmVyID0gMFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBhc3NCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnF1aXogPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMudXNlclJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMudGVzdElkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImRhdGFJZFwiKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMudGVzdElkKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBRdWl6VHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMudGVzdElkKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1aXogPSByZXN1bHQgYXMgUXVpelR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFF1aXooKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0UXVpeigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzc0JhclwiKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbi10aXRsZVwiKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcHRpb25zXCIpO1xyXG4gICAgICAgIHRoaXMucHJldkJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZcIik7XHJcbiAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKTtcclxuICAgICAgICB0aGlzLnBhc3NCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLm5leHRCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblRlc3RUeXBlLm5leHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcmV2QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50Lm9uY2xpY2sgPSB0aGlzLm1vdmUuYmluZCh0aGlzLCBBY3Rpb25UZXN0VHlwZS5wcmV2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFzc0J1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXNzQnV0dG9uRWxlbWVudC5vbmNsaWNrID0gdGhpcy5tb3ZlLmJpbmQodGhpcywgQWN0aW9uVGVzdFR5cGUucGFzcyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcmV2VGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlc3RfX3ByZXYtdGl0bGVcIilcclxuICAgICAgICBpZiAocHJldlRpdGxlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBwcmV2VGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMucXVpei5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZXBhcmVQcm9ncmVzc0JhcigpO1xyXG4gICAgICAgIHRoaXMuc2hvd1F1ZXN0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgdGltZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpO1xyXG4gICAgICAgIGxldCBzZWNvbmRzID0gNTk7XHJcbiAgICAgICAgY29uc3QgdGhhdDogVGVzdCA9IHRoaXNcclxuICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2Vjb25kcy0tO1xyXG4gICAgICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJUZXh0ID0gc2Vjb25kcy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWNvbmRzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoYXQuaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByZXBhcmVQcm9ncmVzc0JhcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5xdWl6LnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtRWxlbWVudDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgaXRlbUVsZW1lbnQuY2xhc3NOYW1lID0gXCJ0ZXN0X19wcm9ncmVzc0Jhcl9pdGVtXCIgKyAoaSA9PT0gMCA/IFwiIGFjdGl2ZVwiIDogXCJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpdGVtQ2lyY2xlRWxlbWVudDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgaXRlbUNpcmNsZUVsZW1lbnQuY2xhc3NOYW1lID0gXCJ0ZXN0X19wcm9ncmVzc0Jhcl9pdGVtLWNpcmNsZVwiO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbVRleHRFbGVtZW50OiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBpdGVtVGV4dEVsZW1lbnQuY2xhc3NOYW1lID0gXCJ0ZXN0X19wcm9ncmVzc0Jhcl9pdGVtLXRleHRcIjtcclxuICAgICAgICAgICAgaXRlbVRleHRFbGVtZW50LmlubmVyVGV4dCA9IFwi0JLQvtC/0YDQvtGBXCIgKyAoaSArIDEpO1xyXG5cclxuICAgICAgICAgICAgaXRlbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbUNpcmNsZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpdGVtRWxlbWVudC5hcHBlbmRDaGlsZChpdGVtVGV4dEVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyRWxlbWVudC5hcHBlbmRDaGlsZChpdGVtRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UXVlc3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1aXopIHJldHVybjtcclxuICAgICAgICBjb25zdCBhY3RpdmVRdWVzdGlvbjogUXVpelF1ZXN0aW9uVHlwZSA9IHRoaXMucXVpei5xdWVzdGlvbnNbdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCAtIDFdO1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25UaXRsZUVsZW1lbnQuaW5uZXJIVE1MID0gXCI8c3Bhbj4gINCS0L7Qv9GA0L7RgSBcIiArIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggKyBcIiA6PC9zcGFuPlwiICsgYWN0aXZlUXVlc3Rpb24ucXVlc3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGhhdDogVGVzdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgY2hvc2VuT3B0aW9uOiBVc2VyUmVzdWx0VHlwZSB8IHVuZGVmaW5lZCA9IHRoaXMudXNlclJlc3VsdC5maW5kKGl0ZW0gPT4gaXRlbS5xdWVzdGlvbklkID09PSBhY3RpdmVRdWVzdGlvbi5pZCk7XHJcblxyXG4gICAgICAgIGFjdGl2ZVF1ZXN0aW9uLmFuc3dlcnMuZm9yRWFjaCgoYW5zd2VyOiBRdWl6QW5zd2VyVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBvcHRpb25FbGVtZW50LmNsYXNzTmFtZSA9IFwidGVzdF9fcXVlc3Rpb25fb3B0aW9ucy1vcHRpb25cIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0SWQ6IHN0cmluZyA9IFwiYW5zd2VyLVwiICsgYW5zd2VyLmlkO1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5jbGFzc05hbWUgPSBcIm9wdGlvbi1hbnN3ZXJcIjtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGlucHV0SWQpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhZGlvXCIpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImFuc3dlclwiKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGFuc3dlci5pZC50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaG9zZW5PcHRpb24gJiYgY2hvc2VuT3B0aW9uLmNob3NlbkFuc3dlcklkID09PSBhbnN3ZXIuaWQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VBbnN3ZXIoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsRWxlbWVudDogSFRNTExhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuXHJcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgaW5wdXRJZCk7XHJcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5pbm5lclRleHQgPSBhbnN3ZXIuYW5zd2VyO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGNob3Nlbk9wdGlvbiAmJiBjaG9zZW5PcHRpb24uY2hvc2VuQW5zd2VySWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID09PSB0aGlzLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSBcItCX0LDQstC10YDRiNC40YLRjFwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSBcItCU0LDQu9C10LVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcmV2QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldkJ1dHRvbkVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY2hvb3NlQW5zd2VyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm5leHRCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG1vdmUoYWN0aW9uOiBBY3Rpb25UZXN0VHlwZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUXVlc3Rpb246IFF1aXpRdWVzdGlvblR5cGUgPSB0aGlzLnF1aXoucXVlc3Rpb25zW3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggLSAxXTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGNob3NlbkFuc3dlcjogSFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZCA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm9wdGlvbi1hbnN3ZXJcIikpLmZpbmQoZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkO1xyXG4gICAgICAgIH0pIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBjaG9zZW5BbnN3ZXJJZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGNob3NlbkFuc3dlciAmJiBjaG9zZW5BbnN3ZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgY2hvc2VuQW5zd2VySWQgPSBOdW1iZXIoY2hvc2VuQW5zd2VyLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjb25zdCBleGlzdGluZ1Jlc3VsdDogVXNlclJlc3VsdFR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnVzZXJSZXN1bHQuZmluZCgoaXRlbTogVXNlclJlc3VsdFR5cGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucXVlc3Rpb25JZCA9PT0gYWN0aXZlUXVlc3Rpb24uaWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNob3NlbkFuc3dlcklkKSB7XHJcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdSZXN1bHQuY2hvc2VuQW5zd2VySWQgPSBjaG9zZW5BbnN3ZXJJZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlclJlc3VsdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbklkOiBhY3RpdmVRdWVzdGlvbi5pZCxcclxuICAgICAgICAgICAgICAgICAgICBjaG9zZW5BbnN3ZXJJZDogY2hvc2VuQW5zd2VySWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gQWN0aW9uVGVzdFR5cGUubmV4dCB8fCBhY3Rpb24gPT09IEFjdGlvblRlc3RUeXBlLnBhc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgtLTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCA+IHRoaXMucXVpei5xdWVzdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb2dyZXNzQmFyRWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaCgoaXRlbTogRWxlbWVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEl0ZW1JbmRleDogbnVtYmVyID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW1JbmRleCA9PT0gdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEl0ZW1JbmRleCA8IHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dRdWVzdGlvbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGNvbXBsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgIGlmICghdXNlckluZm8pIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5zd2Vyc0lkU3RyaW5nOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMudXNlclJlc3VsdC5mb3JFYWNoKChpdGVtOiBVc2VyUmVzdWx0VHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBhbnN3ZXJzSWRTdHJpbmcucHVzaChpdGVtLmNob3NlbkFuc3dlcklkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBQYXNzVGVzdFR5cGUgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzLycgKyB0aGlzLnRlc3RJZCArICcvcGFzcycsICdQT1NUJywge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySW5mby51c2VySWQsXHJcbiAgICAgICAgICAgICAgICByZXN1bHRzOiB0aGlzLnVzZXJSZXN1bHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwic2NvcmVcIiwgKHJlc3VsdCBhcyBQYXNzVGVzdFR5cGUpLnNjb3JlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInRvdGFsXCIsIChyZXN1bHQgYXMgUGFzc1Rlc3RUeXBlKS50b3RhbC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhbnN3ZXJzXCIsIGFuc3dlcnNJZFN0cmluZy5qb2luKFwiLFwiKSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIjL3Jlc3VsdFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtGb3JtfSBmcm9tIFwiLi9Db21wb25lbnRzL2Zvcm1cIjtcclxuaW1wb3J0IHtDaG9pY2V9IGZyb20gXCIuL0NvbXBvbmVudHMvY2hvaWNlXCI7XHJcbmltcG9ydCB7Q29ycmVjdH0gZnJvbSBcIi4vQ29tcG9uZW50cy9jb3JyZWN0XCI7XHJcbmltcG9ydCB7UmVzdWx0fSBmcm9tIFwiLi9Db21wb25lbnRzL3Jlc3VsdFwiO1xyXG5pbXBvcnQge1Rlc3R9IGZyb20gXCIuL0NvbXBvbmVudHMvdGVzdFwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtSb3V0ZVR5cGV9IGZyb20gXCIuL3R5cGVzL3JvdXRlLnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcclxuICAgIHJlYWRvbmx5IGNvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGxcclxuICAgIHJlYWRvbmx5IHN0eWxlc0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbFxyXG4gICAgcmVhZG9ubHkgdGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGxcclxuICAgIHJlYWRvbmx5IHByb2ZpbGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGxcclxuICAgIHJlYWRvbmx5IHByb2ZpbGVGdWxsTmFtZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbFxyXG5cclxuICAgIHByaXZhdGUgcm91dGVzOiBSb3V0ZVR5cGVbXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5zdHlsZXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHlsZXNcIik7XHJcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2ZpbGVcIik7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlRnVsbE5hbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9maWxlLWZ1bGwtbmFtZVwiKTtcclxuICAgICAgICB0aGlzLnJvdXRlcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFwiIy9cIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcItCT0LvQsNCy0L3QsNGPXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJUZW1wbGF0ZXMvaW5kZXguaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzOiBcIlN0eWxlcy9pbmRleC5taW4uY3NzXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogXCIjL3NpZ251cFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiVGVtcGxhdGVzL3NpZ251cC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFwiU3R5bGVzL2Zvcm0ubWluLmNzc1wiLFxyXG4gICAgICAgICAgICAgICAgbG9hZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGb3JtKCdzaWdudXAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFwiIy9sb2dpblwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi0JLRhdC+0LQg0LIg0YHQuNGB0YLQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlRlbXBsYXRlcy9sb2dpbi5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFwiU3R5bGVzL2Zvcm0ubWluLmNzc1wiLFxyXG4gICAgICAgICAgICAgICAgbG9hZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGb3JtKCdsb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogXCIjL2Nob2ljZVwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi0JLRi9Cx0L7RgCDQotC10YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJUZW1wbGF0ZXMvY2hvaWNlLmh0bWxcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlczogXCJTdHlsZXMvY2hvaWNlLm1pbi5jc3NcIixcclxuICAgICAgICAgICAgICAgIGxvYWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQ2hvaWNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiBcIiMvdGVzdFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi0KLQtdGB0YJcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlRlbXBsYXRlcy90ZXN0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlczogXCJTdHlsZXMvdGVzdC5taW4uY3NzXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFRlc3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFwiIy9yZXN1bHRcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcItCg0LXQt9GD0LvRjNGC0LDRglwiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiVGVtcGxhdGVzL3Jlc3VsdC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFwiU3R5bGVzL3Jlc3VsdC5taW4uY3NzXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogXCIjL2NvcnJlY3RcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcItCS0LXRgNC90YvQtSDQntGC0LLQtdGC0YtcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlRlbXBsYXRlcy9jb3JyZWN0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlczogXCJTdHlsZXMvY29ycmVjdC5taW4uY3NzXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvcnJlY3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvcGVuUm91dGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgdXJsUm91dGU6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KCc/JylbMF07XHJcbiAgICAgICAgaWYgKHVybFJvdXRlID09PSAnIy9sb2dvdXQnKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IEF1dGgubG9nb3V0KCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjL1wiO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5ld1JvdXRlOiBSb3V0ZVR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnJvdXRlcy5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5yb3V0ZSA9PT0gdXJsUm91dGU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghbmV3Um91dGUpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiMvXCI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50RWxlbWVudCB8fCAhdGhpcy5zdHlsZXNFbGVtZW50IHx8ICF0aGlzLnRpdGxlRWxlbWVudCB8fCAhdGhpcy5wcm9maWxlRWxlbWVudCB8fCAhdGhpcy5wcm9maWxlRnVsbE5hbWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh1cmxSb3V0ZSA9PT0gJyMvJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiIy9cIjtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IGF3YWl0IGZldGNoKG5ld1JvdXRlLnRlbXBsYXRlKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3R5bGVzRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIG5ld1JvdXRlLnN0eWxlcyk7XHJcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gbmV3Um91dGUudGl0bGU7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOlVzZXJJbmZvVHlwZXxudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XHJcbiAgICAgICAgaWYgKHVzZXJJbmZvICYmIGFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRnVsbE5hbWVFbGVtZW50LmlubmVyVGV4dCA9IHVzZXJJbmZvLmZ1bGxOYW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1JvdXRlLmxvYWQoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge1JlZnJlc2hSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9yZWZyZXNoLXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtMb2dvdXRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9sb2dvdXQtcmVzcG9uc2UudHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGgge1xyXG4gICAgcHVibGljIHN0YXRpYyBhY2Nlc3NUb2tlbktleTogc3RyaW5nID0gJ2FjY2Vzc1Rva2VuJztcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVmcmVzaFRva2VuS2V5OiBzdHJpbmcgPSAncmVmcmVzaFRva2VuJztcclxuICAgIHByaXZhdGUgc3RhdGljIHVzZXJJbmZvS2V5OiBzdHJpbmcgPSAndXNlckluZm8nO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcHJvY2Vzc1VuYXV0aG9yaXplZFJlc3BvbnNlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbjogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5KTtcclxuICAgICAgICBpZiAocmVmcmVzaFRva2VuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5ob3N0ICsgJy9yZWZyZXNoJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe3JlZnJlc2hUb2tlbjogcmVmcmVzaFRva2VufSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBSZWZyZXNoUmVzcG9uc2VUeXBlIHwgbnVsbCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgIXJlc3VsdC5lcnJvciAmJiByZXN1bHQuYWNjZXNzVG9rZW4gJiYgcmVzdWx0LnJlZnJlc2hUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9rZW5zKHJlc3VsdC5hY2Nlc3NUb2tlbiwgcmVzdWx0LnJlZnJlc2hUb2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmVUb2tlbnMoKTtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5yZWZyZXNoVG9rZW5LZXkpO1xyXG4gICAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY29uZmlnLmhvc3QgKyAnL2xvZ291dCcsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtyZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlbn0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogTG9nb3V0UmVzcG9uc2VUeXBlIHwgbnVsbCAgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmICFyZXN1bHQuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBBdXRoLnJlbW92ZVRva2VucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMudXNlckluZm9LZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0VG9rZW5zKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5hY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5LCByZWZyZXNoVG9rZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlbW92ZVRva2VucygpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmFjY2Vzc1Rva2VuS2V5KTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnJlZnJlc2hUb2tlbktleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRVc2VySW5mbyhpbmZvOiBVc2VySW5mb1R5cGUpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnVzZXJJbmZvS2V5LCBKU09OLnN0cmluZ2lmeShpbmZvKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRVc2VySW5mbygpOiBVc2VySW5mb1R5cGUgfCBudWxsIHtcclxuICAgICAgICBjb25zdCB1c2VySW5mbzogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudXNlckluZm9LZXkpO1xyXG4gICAgICAgIGlmICh1c2VySW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1c2VySW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtBdXRofSBmcm9tIFwiLi9hdXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlcXVlc3QodXJsOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIiwgYm9keTogYW55ID0gbnVsbCk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IHRva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XHJcbiAgICAgICAgbGV0IHJlZnJlc2hUb2tlbjogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEF1dGgucmVmcmVzaFRva2VuS2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddID0gdG9rZW47XHJcbiAgICAgICAgICAgIHBhcmFtcy5oZWFkZXJzWyd4LWF1dGgtdG9rZW4nXSA9IHJlZnJlc2hUb2tlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChib2R5KSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcGFyYW1zKTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA8IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBib29sZWFuID0gYXdhaXQgQXV0aC5wcm9jZXNzVW5hdXRob3JpemVkUmVzcG9uc2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXF1ZXN0KHVybCwgbWV0aG9kLCBib2R5KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLnRleHQoKS50aGVuKHRleHQgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKHRleHQpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gQWN0aW9uVGVzdFR5cGUge1xyXG4gICAgbmV4dCA9IFwibmV4dFwiLFxyXG4gICAgcGFzcyA9IFwicGFzc1wiLFxyXG4gICAgcHJldiA9IFwicHJldlwiXHJcbn0iLCJleHBvcnQgIGRlZmF1bHQge1xyXG4gICAgaG9zdDonaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaSdcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQge1JvdXRlcn0gZnJvbSBcIi4vcm91dGVyXCI7XHJcblxyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgdGhpcy5oYW5kbGVSb3V0ZUNoYW5naW5nLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgdGhpcy5oYW5kbGVSb3V0ZUNoYW5naW5nLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlUm91dGVDaGFuZ2luZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5vcGVuUm91dGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKG5ldyBBcHAoKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9