import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";
import {PassTestType} from "../types/pass-test.type";

export class Result {
    readonly testId: string | null
    private resultScore: HTMLElement | null
    readonly link: HTMLElement | null

    constructor() {
        this.testId = sessionStorage.getItem('dataId');
        this.resultScore = document.getElementById("result-score");
        this.link = document.getElementById("link")
        this.init();
    }


    private async init(): Promise<void> {
        if (this.link) {
            this.link.onclick = this.nextPage;
        }
        const userInfo: UserInfoType | null = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
            return
        }

        if (this.testId) {
            try {
                const result: DefaultResponseType | PassTestType = await CustomHttp.request(config.host + '/tests/' + this.testId + '/result?userId=' + userInfo.userId);
                if (result) {
                    if ((result as DefaultResponseType).error) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    if (this.resultScore) {
                        this.resultScore.innerText = (result as PassTestType).score + '/' + (result as PassTestType).total;

                    }
                    return;
                }
            } catch (error) {
                console.log(error);
                return
            }
        }
        location.href = '#/';
    }

    private nextPage(): void {
        location.href = "#/correct";
    }


}