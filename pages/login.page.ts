import { Locator, Page, expect } from "@playwright/test";

export default class LoginPage {
    readonly cbbRepository: Locator = this.page.locator('#repository');
    readonly txtUsername: Locator = this.page.locator('#username');
    readonly txtPassword: Locator = this.page.locator('#password');
    readonly btnLogin: Locator = this.page.locator('.btn-login');

    constructor(private readonly page: Page) { }

    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async login(username: string, password: string, repository?: string): Promise<void> {
        if (repository !== undefined && repository !== null) {
            await this.cbbRepository.selectOption(repository);
        }
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }

    async verifyErrorMessage(message: string): Promise<void> {
        this.page.on('dialog', async (d) => {
            console.log(d.message);
            expect(d.message()).toEqual(message);
            await d.accept();
        });
    }
}