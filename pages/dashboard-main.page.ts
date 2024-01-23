import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { StringHelper } from "../utils/string-helper";

export default class DashboardMainPage extends BasePage {
    readonly pageLocator: string = '//div[@id="main-menu"]//li/a[text()="{0}"]';
    readonly activePageLocator: string = '//div[@id="main-menu"]//li[contains(@class, "active")]/a[text()="{0}"]';
    readonly globalSettingOptionLocator: string = '//li[@class="mn-setting"]//a[text()="{0}"]';

    readonly lnkSetting: Locator = this.page.locator('#main-menu li.mn-setting');
    readonly lnkDeleteCurrentPage: Locator = this.page.locator('li.mn-setting a.delete');

    async displays(): Promise<void> {
        await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
    }

    async clickOnSettingIcon(): Promise<void> {
        await this.lnkSetting.click();
    }

    async selectGlobalSettingOption(option: string): Promise<void> {
        await this.clickOnSettingIcon();
        const lnkGlobalSettingOption: Locator = this.page.locator(StringHelper.formatString(this.globalSettingOptionLocator, option));
        await lnkGlobalSettingOption.waitFor();
        await lnkGlobalSettingOption.click();
    }

    async clickOnPage(pageName: string, parentPage?: string): Promise<void> {
        if (parentPage !== undefined && parentPage !== null) {
            const lnkParentPage: Locator = this.page.locator(StringHelper.formatString(this.pageLocator, parentPage));
            await lnkParentPage.click();
            await this.page.locator(StringHelper.formatString(this.activePageLocator, parentPage)).waitFor();
            await lnkParentPage.hover();
        }
        await this.page.locator(StringHelper.formatString(this.pageLocator, pageName)).click();
        await this.page.waitForLoadState();
    }

    async deletePage(pageName: string, parentPage?: string): Promise<string[]> {
        let dialogMsg: string[] = [];

        (parentPage !== undefined && parentPage !== null) ? await this.clickOnPage(pageName, parentPage) : await this.clickOnPage(pageName);
        const hasChildPage = await this.doesPageHaveChildPages(pageName);
        await this.clickOnSettingIcon();
        this.page.once('dialog', async (dialog) => {
            dialogMsg.push(dialog.message().trim());

            if (hasChildPage) {
                this.page.once('dialog', async (dialog) => {
                    dialogMsg.push(dialog.message().trim());
                    await dialog.accept();
                });
            }
            dialog.accept();
        });
        await this.lnkDeleteCurrentPage.click();
        if (await this.lnkDeleteCurrentPage.isVisible({ timeout: 2000 })) {
            await this.page.locator('#header').click();
        }
        return dialogMsg;
    }

    async verifyNewPageAdded(pageName: string): Promise<void> {
        await this.checkControlExist(StringHelper.formatString(this.pageLocator, pageName));
    }

    async verifyPageDeleted(pageName: string): Promise<void> {
        await this.checkControlNotExist(StringHelper.formatString(this.pageLocator, pageName));
    }

    async checkOptionNotExistUnderGlobalSetting(option: string): Promise<void> {
        await this.clickOnSettingIcon();
        await this.checkControlNotExist(StringHelper.formatString(this.globalSettingOptionLocator, option));
    }

    async doesPageHaveChildPages(parentPage: string): Promise<boolean> {
        const hasChildPageLocator = '//div[@id="main-menu"]//li[contains(@class, "haschild")]/a[text()="{0}"]';
        return await this.page.locator(StringHelper.formatString(hasChildPageLocator, parentPage)).isVisible();
    }
}