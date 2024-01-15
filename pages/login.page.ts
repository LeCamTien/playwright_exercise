import { Locator, Page } from "@playwright/test";


export default class LoginPage {
    readonly cbxRepository: Locator = this.page.locator('#repository');
    readonly txtUsername: Locator = this.page.locator('#username');
    readonly txtPassword: Locator = this.page.locator('#password');
    readonly btnLogin: Locator = this.page.locator('.btn-login');

    constructor(private readonly page: Page) {}

    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async login(username: string, password: string, repository?: string): Promise<void> {
        if (typeof repository !== 'undefined' && repository !== null) {
            await this.cbxRepository.selectOption(repository);
        }
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }
}