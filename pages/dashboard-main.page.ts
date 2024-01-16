import { Locator, Page, expect } from "@playwright/test";
import { StringHelper } from "../utils/string-helper";

export default class DashboardMainPage {
    readonly lnkUsername: Locator = this.page.locator('ul.head-menu a[href="#Welcome"]');
    readonly lnkLogOut: Locator = this.page.locator('//ul[@class="head-menu"]//a[text()="Logout"]');
    readonly lnkSetting: Locator = this.page.locator('#main-menu li.mn-setting');
    readonly lnkAddPage: Locator = this.page.locator('//li[@class="mn-setting"]//a[text()="Add Page"]');
    readonly lnkDeleteCurrentPage: Locator = this.page.locator('li.mn-setting a.delete');

    constructor(private readonly page: Page) {}

    async displays(): Promise<void> {
        await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
    }

    async logout(): Promise<void> {
        await this.lnkUsername.click();
        await this.lnkLogOut.click();
    }

    async openAddNewPage(): Promise<void> {
        await this.lnkSetting.click();
        await this.lnkAddPage.click();
    }

    async deletePage(pageName: string): Promise<void> {
        let pageLocator = '//div[@id="main-menu"]//li/a[text()="{0}"]';
        await this.page.locator(StringHelper.formatString(pageLocator, pageName)).click();
        await this.lnkSetting.click();
        this.page.on('dialog', dialog => dialog.accept());
        await this.lnkDeleteCurrentPage.click();
    }

    async verifyNewPageAdded(pageName: string): Promise<void> {
        let pageLocator = '//div[@id="main-menu"]//li/a[text()="{0}"]';
        await expect(this.page.locator(StringHelper.formatString(pageLocator, pageName))).toBeVisible();
    }
}