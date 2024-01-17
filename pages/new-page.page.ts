import { Locator, Page } from "@playwright/test";

export default class NewPage {
    readonly txtPageName: Locator = this.page.locator('#name');
    readonly cbbParentPage: Locator = this.page.locator('#parent');
    readonly cbbNumberOfColumns: Locator = this.page.locator('#columnnumber');
    readonly cbbDisplayAfter: Locator = this.page.locator('#afterpage');
    readonly cbxPublic: Locator = this.page.locator('#ispublic');
    readonly btnOk: Locator = this.page.locator('#OK');
    readonly btnCancel: Locator = this.page.locator('#Cancel');

    constructor(private readonly page: Page) { }

    async submitDataOnNewPage(pageName: string, isPublic?: boolean, parentPage?: string, noOfColumns?: string, displayAfter?: string): Promise<void> {
        await this.txtPageName.fill(pageName);

        if (parentPage !== undefined && parentPage !== null) {
            await this.cbbParentPage.selectOption({ label: parentPage });
        }

        if (noOfColumns !== undefined && noOfColumns !== null) {
            await this.cbbNumberOfColumns.selectOption({ label: noOfColumns });
        }

        if (displayAfter !== undefined && displayAfter !== null) {
            await this.cbbDisplayAfter.selectOption({ label: displayAfter });
        }

        if (isPublic !== undefined && isPublic !== null) {
            await this.cbxPublic.check();
        }

        await this.btnOk.click();
        await this.page.waitForLoadState();
    }
}