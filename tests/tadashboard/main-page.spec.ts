import { expect, test } from "@playwright/test";
import { StringHelper } from "../../utils/string-helper";
import { CommonHelper } from "../../utils/common-helper";
import { AssertionHelper } from "../../utils/assertion-helper";
import Constant from "../../utils/constant";
import LoginPage from "../../pages/login.page";
import DashboardMainPage from "../../pages/dashboard-main.page";
import NewPage from "../../pages/new-page.page";


test.skip('DA_MP_TC014 - Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const pageName = StringHelper.generateString(10);

    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const newPage = new NewPage(page);

    await loginPage.goTo(Constant.URL);
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
    await dashboardMainPage.openAddNewPage();
    await newPage.submitDataOnNewPage(pageName, true);
    await dashboardMainPage.logout();
    await loginPage.login(Constant.USERNAME2, Constant.PASSWORD);
    await dashboardMainPage.verifyNewPageAdded(pageName);
    await dashboardMainPage.logout();
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
    await dashboardMainPage.deletePage(pageName);
});

test('DA_MP_TC017 - Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children ', async ({ page }) => {
    const parentPageName = 'Test' + CommonHelper.generateRandomNumber();
    const childrenPageName = 'Test Child' + CommonHelper.generateRandomNumber();
    const expectedMsg: string[] = [
        'Are you sure you want to remove this page?',
        StringHelper.formatString("Cannot delete page '{0}' since it has child page(s).", parentPageName)
    ];

    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const newPage = new NewPage(page);

    await loginPage.goTo(Constant.URL);
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
    await dashboardMainPage.openAddNewPage();
    await newPage.submitDataOnNewPage(parentPageName, true);
    await dashboardMainPage.openAddNewPage();
    await newPage.submitDataOnNewPage(childrenPageName, true, parentPageName);
    const actualMsg = await dashboardMainPage.deletePage(parentPageName);
    AssertionHelper.assertEqual(actualMsg, expectedMsg);
});