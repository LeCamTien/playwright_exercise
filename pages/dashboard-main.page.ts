import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { StringHelper } from "../utils/string-helper";

export default class DashboardMainPage extends BasePage {
    readonly pageLocator: string = '//div[@id="main-menu"]//li/a[text()="{0}"]';
    readonly activePageLocator: string = '//div[@id="main-menu"]//li[contains(@class, "active")]';

    readonly lnkSetting: Locator = this.page.locator('#main-menu li.mn-setting');
    readonly lnkAddPage: Locator = this.page.locator('//li[@class="mn-setting"]//a[text()="Add Page"]');
    readonly lnkDeleteCurrentPage: Locator = this.page.locator('li.mn-setting a.delete');

    async displays(): Promise<void> {
        await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
    }

    async openAddNewPage(): Promise<void> {
        await this.lnkSetting.click();
        await this.lnkAddPage.click();
    }

    async deletePage(pageName: string): Promise<string[]> {
        let dialogMsg: string[] = [];

        await this.page.locator(StringHelper.formatString(this.pageLocator, pageName)).click();
        await this.page.locator(this.activePageLocator).waitFor();
        const hasChildPage = await this.doesPageHaveChildPages(pageName);
        await this.lnkSetting.click();
        this.page.once('dialog', async (dialog) => {
            dialogMsg.push(dialog.message().trim());

            if(hasChildPage) {
                this.page.once('dialog', async (dialog) => {
                    dialogMsg.push(dialog.message().trim());
                    await dialog.accept();
                });
            } 
            dialog.accept();
        });
        await this.lnkDeleteCurrentPage.click();
        if (await this.lnkDeleteCurrentPage.isVisible({timeout: 2000})) {
            await this.page.locator('#header').click();
        }
        return dialogMsg;
    }

    async verifyNewPageAdded(pageName: string): Promise<void> {
        let pageLocator = '//div[@id="main-menu"]//li/a[text()="{0}"]';
        await expect(this.page.locator(StringHelper.formatString(pageLocator, pageName))).toBeVisible();
    }

    doesPageHaveChildPages(parentPage: string): Promise<boolean> {
        let hasChildPageLocator = '//div[@id="main-menu"]//li[contains(@class, "haschild")]/a[text()="{0}"]';
        return this.page.locator(StringHelper.formatString(hasChildPageLocator, parentPage)).isVisible();
    }
}