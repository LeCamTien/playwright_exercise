import { test } from "@playwright/test";
import { StringHelper } from "../../utils/string-helper";
import Constant from "../../utils/constant";
import LoginPage from "../../pages/login.page";
import DashboardMainPage from "../../pages/dashboard-main.page";
import NewPage from "../../pages/new-page.page";


test('DA_MP_TC014 - Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const pageName = StringHelper.generateString(10);

    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const newPage = new NewPage(page);

    // Login
    await loginPage.goTo(Constant.URL);
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);

    // Add a new page
    await dashboardMainPage.selectGlobalSettingOption('Add Page');
    await newPage.submitDataOnNewPage(pageName, true);

    // Logout and re-login with another account
    await dashboardMainPage.logout();
    await loginPage.login(Constant.USERNAME2, Constant.PASSWORD);

    // Check newly added page is visibled
    await dashboardMainPage.verifyNewPageAdded(pageName);

    // Log in  as creator page account and delete newly added page
    await dashboardMainPage.logout();
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
    await dashboardMainPage.deletePage(pageName);
    await dashboardMainPage.verifyPageDeleted(pageName);
});