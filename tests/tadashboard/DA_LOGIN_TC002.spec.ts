import { test } from "@playwright/test";
import Constant from "../../utils/constant";
import LoginPage from "../../pages/login.page";


test('DA_LOGIN_TC002 - Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo(Constant.URL);
    await loginPage.login('abc', 'abc');
    await loginPage.verifyMessageDisplays('Username or password is invalid');
    await loginPage.displays();
});