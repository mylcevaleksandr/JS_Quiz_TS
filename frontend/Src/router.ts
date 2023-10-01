import {Form} from "./Components/form";
import {Choice} from "./Components/choice";
import {Correct} from "./Components/correct";
import {Result} from "./Components/result";
import {Test} from "./Components/test";
import {Auth} from "./services/auth";
import {RouteType} from "./types/route.type";
import {UserInfoType} from "./types/user-info.type";

export class Router {
    readonly contentElement: HTMLElement | null
    readonly stylesElement: HTMLElement | null
    readonly titleElement: HTMLElement | null
    readonly profileElement: HTMLElement | null
    readonly profileFullNameElement: HTMLElement | null

    private routes: RouteType[]

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
                    new Form('signup');
                }
            },
            {
                route: "#/login",
                title: "Вход в систему",
                template: "Templates/login.html",
                styles: "Styles/form.min.css",
                load: () => {
                    new Form('login');
                }
            },
            {
                route: "#/choice",
                title: "Выбор Теста",
                template: "Templates/choice.html",
                styles: "Styles/choice.min.css",
                load: () => {
                    new Choice();
                }
            },
            {
                route: "#/test",
                title: "Тест",
                template: "Templates/test.html",
                styles: "Styles/test.min.css",
                load: () => {
                    new Test();
                }
            },
            {
                route: "#/result",
                title: "Результат",
                template: "Templates/result.html",
                styles: "Styles/result.min.css",
                load: () => {
                    new Result();
                }
            },
            {
                route: "#/correct",
                title: "Верные Ответы",
                template: "Templates/correct.html",
                styles: "Styles/correct.min.css",
                load: () => {
                    new Correct();
                }
            },
        ];
    }

    public async openRoute(): Promise<void> {
        const urlRoute: string = window.location.hash.split('?')[0];
        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = "#/";
            return;
        }
        const newRoute: RouteType | undefined = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = "#/";
            return;
        }

        if (!this.contentElement || !this.stylesElement || !this.titleElement || !this.profileElement || !this.profileFullNameElement) {
            if (urlRoute === '#/') {
                return
            } else {
                window.location.href = "#/";
                return
            }
        }

        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());

        this.stylesElement.setAttribute("href", newRoute.styles);
        this.titleElement.innerText = newRoute.title;

        const userInfo:UserInfoType|null = Auth.getUserInfo();
        const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey);
        if (userInfo && accessToken) {
            this.profileElement.style.display = 'flex';
            this.profileFullNameElement.innerText = userInfo.fullName;
        } else {
            this.profileElement.style.display = 'none';
        }

        newRoute.load();
    }
}