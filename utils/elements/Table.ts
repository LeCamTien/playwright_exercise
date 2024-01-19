import { Locator, expect } from "@playwright/test";

export default class Table {
    element: Locator;
    constructor(locator: Locator) {
        this.element = locator;
    }

    async checkTableExist(): Promise<void> {
        await expect(this.element).toBeVisible();
    }

    async isHeaderExist(): Promise<boolean> {
        return await this.element.locator('//tr/th').count() !== 0;
    }

    async isColumnExistWithRowIdx(rowIdx: number, columnIdx: number): Promise<boolean> {
        return await this.element.locator('//tr').nth(rowIdx).locator('//td').nth(columnIdx).isVisible();
    }

    async getColumnIndexByColumnName(columnName: string): Promise<number> {
        let columnIndex: number = 0;
        let actualColumnName = '';
        const columnCount = await this.element.locator('//tr/th').count();
        for (let i = 0; i < columnCount; i++) {
            actualColumnName = await this.element.locator('//tr/th').nth(i).innerText();
            if (actualColumnName === columnName) {
                columnIndex = i;
                break;
            }
        }
        return columnIndex;
    }

    async getRowsDataByColumn(columnName: string): Promise<Array<string>> {
        let rowCount: number = await this.element.locator('//tr').count();
        let rowStart: number = 0;
        let rowsData: string[] = [];
        const columnIdx = await this.getColumnIndexByColumnName(columnName);

        if (await this.isHeaderExist()) {
            rowCount = rowCount - 1;
            rowStart = rowStart + 1;
        }

        for (let i = rowStart; i < rowCount; i++) {
            if (await this.isColumnExistWithRowIdx(i, columnIdx)) {
                let rowData = await this.element.locator('//tr').nth(i).locator('//td').nth(columnIdx).innerText();
                rowsData.push(rowData.replace(/\s+/g, ' ').trim());
            }
        }
        return rowsData;
    }
}