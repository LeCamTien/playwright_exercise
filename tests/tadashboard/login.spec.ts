import { test } from "@playwright/test";
import Constant from "../../utils/constant";
import LoginPage from "../../pages/login.page";
import DashboardMainPage from "../../pages/dashboard-main.page";

test('DA_LOGIN_TC001 - Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo(Constant.URL);
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);

    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
});

test('DA_LOGIN_TC002 - Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo(Constant.URL);
    await loginPage.login('abc', 'abc');
    await loginPage.verifyErrorMessage('Username or password is invalid');
});