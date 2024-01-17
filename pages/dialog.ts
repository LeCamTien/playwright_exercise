import { Page, expect, test } from "@playwright/test";

export default class Dialog {
	message: string;
	constructor(private readonly page: Page) {
		this.message = "";
	}

	async verifyMessageDisplays(msg: string): Promise<void> {
		await test.step('Verify dialog message content', () => {
			expect(this.message).toEqual(msg);
		})
	}

	async handleDialog(): Promise<void> {
		await test.step('Get dialog message then dismiss it', async () => {
			const dialog = await this.page.waitForEvent('dialog', { timeout: 2000});
			this.message = dialog.message();
			await dialog.dismiss();
		});
	}
}