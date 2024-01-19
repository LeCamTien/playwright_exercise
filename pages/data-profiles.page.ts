import Table from "../utils/elements/Table";
import { BasePage } from "./base.page";

export default class DataProfilesPage extends BasePage {
    readonly tblDataProfiles: Table = new Table(this.page.locator('table.GridView'));

    async verifyTableExist(): Promise<void> {
        await this.tblDataProfiles.checkTableExist();
    }

    async getDataProfiles(): Promise<string[]> {
        return await this.tblDataProfiles.getRowsDataByColumn('Data Profile');
    }
}