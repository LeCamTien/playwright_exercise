import { test } from "@playwright/test";
import { StringHelper } from "../../utils/string-helper";
import Constant from "../../utils/constant";
import LoginPage from "../../pages/login.page";
import DashboardMainPage from "../../pages/dashboard-main.page";
import NewPage from "../../pages/new-page.page";

test('DA_MP_TC014 - Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    // Navigate to Dashboard login page
    const loginPage = new LoginPage(page);
    await loginPage.goTo(Constant.URL);

    // Log in specific repository with valid account
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);

    // Go to Global Setting -> Add page
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.openAddNewPage();

    // Enter Page Name field
    // Check Public checkbox
    // Click OK button
    const newPage = new NewPage(page);
    const pageName = StringHelper.generateString(10);
    await newPage.submitDataOnNewPage(pageName, true);

    // Click on Log out link
    await dashboardMainPage.logout();

    // Log in with another valid account
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);

    // Check newly added page is visibled
    await dashboardMainPage.verifyNewPageAdded(pageName);

    // Log in  as creator page account and delete newly added page
    await dashboardMainPage.deletePage(pageName);
});