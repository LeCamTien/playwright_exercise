import { Locator, Page } from "@playwright/test";


export abstract class BasePage {
    readonly lnkUsername: Locator = this.page.locator('ul.head-menu a[href="#Welcome"]');
    readonly lnkLogOut: Locator = this.page.locator('//ul[@class="head-menu"]//a[text()="Logout"]');

    constructor(readonly page: Page) {}

    async logout(): Promise<void> {
        await this.lnkUsername.waitFor();
        await this.lnkUsername.click();
        await this.lnkLogOut.click();
    }
}