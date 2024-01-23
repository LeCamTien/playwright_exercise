import { Locator, Page } from "@playwright/test";

export type NewPageData = {
    pageName: string;
    isPublic?: boolean;
    parentPage?: string;
    noOfColumns?: number;
    displayAfter?: string;
};

export default class NewPage {
    readonly txtPageName: Locator = this.page.locator('#name');
    readonly cbbParentPage: Locator = this.page.locator('#parent');
    readonly cbbNumberOfColumns: Locator = this.page.locator('#columnnumber');
    readonly cbbDisplayAfter: Locator = this.page.locator('#afterpage');
    readonly cbxPublic: Locator = this.page.locator('#ispublic');
    readonly btnOk: Locator = this.page.locator('#OK');
    readonly btnCancel: Locator = this.page.locator('#Cancel');

    constructor(private readonly page: Page) { }

    async submitDataOnNewPage(data: NewPageData): Promise<void> {
        if (data.pageName) {
            await this.txtPageName.waitFor();
            await this.txtPageName.fill(data.pageName);
        }

        data.isPublic && await this.cbxPublic.check();
        data.parentPage && await this.cbbParentPage.selectOption({ label: data.parentPage });
        data.noOfColumns && await this.cbbNumberOfColumns.selectOption({ label: data.noOfColumns.toString() });
        data.displayAfter && await this.cbbDisplayAfter.selectOption({ label: data.displayAfter });

        await this.btnOk.click();
        await this.page.waitForLoadState();
    }
}