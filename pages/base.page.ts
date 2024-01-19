import { Locator, Page, expect } from "@playwright/test";
import Constant from "../utils/constant";
import { StringHelper } from "../utils/string-helper";


export abstract class BasePage {
    readonly menuOptionLocator: string = '//ul[@class="head-menu"]//a[text()="{0}"]';

    readonly lnkUsername: Locator = this.page.locator('ul.head-menu a[href="#Welcome"]');
    readonly lnkLogOut: Locator = this.page.locator('//ul[@class="head-menu"]//a[text()="Logout"]');

    constructor(readonly page: Page) { }

    async logout(): Promise<void> {
        await this.lnkUsername.waitFor();
        await this.lnkUsername.click();
        await this.lnkLogOut.click();
    }

    async selectMenuOption(menuPath: string): Promise<void> {
        let lnkMenuOption: Locator;
        const listOfMenuOptions: string[] = menuPath.split('->');
        for (let i = 0; i < listOfMenuOptions.length; i++) {
            lnkMenuOption = this.page.locator(StringHelper.formatString(this.menuOptionLocator, listOfMenuOptions[i]));
            // await lnkMenuOption.hover();
            await lnkMenuOption.click();
        }
    }

    async checkControlNotExist(strLocator: string): Promise<void> {
        await expect(this.page.locator(strLocator)).toBeHidden();
    }

    async checkControlExist(strLocator: string): Promise<void> {
        await expect(this.page.locator(strLocator)).toBeVisible();
    }

    async isClickable(strLocator: string): Promise<boolean> {
        try {
            await this.page.locator(strLocator).click({ timeout: Constant.TIMEOUT });
            return true;
        } catch (error) {
            return false;
        }
    }
}