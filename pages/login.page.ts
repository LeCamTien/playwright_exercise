import { Locator, Page, expect, test } from "@playwright/test";

export default class LoginPage {
    readonly cbbRepository: Locator = this.page.locator('#repository');
    readonly txtUsername: Locator = this.page.locator('#username');
    readonly txtPassword: Locator = this.page.locator('#password');
    readonly btnLogin: Locator = this.page.locator('.btn-login');

    constructor(private readonly page: Page) { }

    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async displays(): Promise<void> {
        await expect(this.btnLogin).toBeVisible();
    }

    async login(username: string, password: string, repository?: string): Promise<void> {
        await this.btnLogin.waitFor();
        if (repository !== undefined && repository !== null) {
            await this.cbbRepository.selectOption(repository);
        }
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }

    async verifyMessageDisplays(message: string): Promise<void> {
        await test.step('Verify the dialog message', async () => {
            this.page.on('dialog', async dialog => {
                console.log(dialog.message);
                expect(dialog.message().trim()).toEqual(message);
                await dialog.accept();
            });
        });
    }
}