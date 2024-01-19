import { Locator } from "playwright-core";
import { BasePage } from "./base.page";
import { expect } from "playwright/test";

export default class PanelsPage extends BasePage {
    readonly lnkAddNew: Locator = this.page.locator('div.panel_tag2 a');

    async clickOnAddNew(): Promise<void> {
        await this.lnkAddNew.click();
    }

    async verifyAddNewPanelDialogDisplays(): Promise<void> {
        await expect(this.page.locator('//div[@class="ui-dialog editpanelDlg"]//span[text()="Add New Panel"]')).toBeVisible();
    }

    async verifyAllControlsDisabled(): Promise<void> {
        expect(await this.isClickable('li.mn-setting')).toBe(false);
    }
}