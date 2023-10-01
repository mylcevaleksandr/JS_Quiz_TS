import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from '../services/auth';
import {QuizListType} from "../types/quiz-list.type";
import {TestResultType} from "../types/test-result.type";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";


export class Choice {
    private quizzes: QuizListType[] = [];
    private testResult: TestResultType[] | null = null;

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        try {
            this.quizzes = await CustomHttp.request(config.host + '/tests');
        } catch (error) {
            console.log(error);
            return
        }
        const userInfo: UserInfoType | null = Auth.getUserInfo();
        if (userInfo) {
            try {
                const result: DefaultResponseType | TestResultType[] = await CustomHttp.request(config.host + '/tests/results?userId=' + userInfo.userId);
                if (result) {
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    this.testResult = result as TestResultType[];
                }
            } catch (error) {
                console.log(error);
                return
            }
        }
        this.processQuizzes();

    }

    private processQuizzes(): void {
        const choiceOptionsElement: HTMLElement | null = document.getElementById("choice-options");
        const that: Choice = this;
        if (this.quizzes && this.quizzes.length > 0 && choiceOptionsElement) {

            this.quizzes.forEach((quiz: QuizListType) => {
                const choiceOptionElement: HTMLDivElement | null = document.createElement("div");
                choiceOptionElement.className = "choice__options_option";
                choiceOptionElement.setAttribute("data-id", quiz.id.toString());
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(<HTMLElement>this);
                };


                const choiceOptionTextElement: HTMLDivElement | null = document.createElement("div");
                choiceOptionTextElement.className = "choice__options_option-text";
                choiceOptionTextElement.innerText = quiz.name;

                const choiceOptionArrowElement: HTMLDivElement | null = document.createElement("div");
                choiceOptionArrowElement.className = "choice__options_option-arrow";

                if (this.testResult) {
                    const result: TestResultType | undefined = this.testResult.find((item: TestResultType): boolean => item.testId === quiz.id);
                    if (result) {
                        const choiceOptionResultElement: HTMLDivElement | null = document.createElement("div");
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

    private chooseQuiz(element: HTMLElement): void {
        const dataId: string | null = element.getAttribute("data-id");
        if (dataId) {
            sessionStorage.setItem("dataId", dataId);
            location.href = "#/test";
        }
    }
}