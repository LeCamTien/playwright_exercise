import { test } from "@playwright/test";
import { StringHelper } from "../../utils/string-helper";
import { CommonHelper } from "../../utils/common-helper";
import { AssertionHelper } from "../../utils/assertion-helper";
import Constant from "../../utils/constant";
import LoginPage from "../../pages/login.page";
import DashboardMainPage from "../../pages/dashboard-main.page";
import NewPage from "../../pages/new-page.page";


test('DA_MP_TC017 - Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children ', async ({ page }) => {
    const parentPageName = 'Test' + CommonHelper.generateRandomNumber();
    const childrenPageName = 'TestChild' + CommonHelper.generateRandomNumber();
    const expectedMsgWithChildPage: string[] = [
        'Are you sure you want to remove this page?',
        StringHelper.formatString("Cannot delete page '{0}' since it has child page(s).", parentPageName)
    ];

    const expectedMsgWithoutChildPage: string[] = [
        'Are you sure you want to remove this page?'
    ];

    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const newPage = new NewPage(page);

    // Login
    await loginPage.goTo(Constant.URL);
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);

    // Add a new parent page
    await dashboardMainPage.selectGlobalSettingOption('Add Page');
    await newPage.submitDataOnNewPage({ pageName: parentPageName, isPublic: true });

    // Add a children page of newly added page
    await dashboardMainPage.selectGlobalSettingOption('Add Page');
    await newPage.submitDataOnNewPage({ pageName: childrenPageName, isPublic: true, parentPage: parentPageName });

    // Delete parent page and verify the messages show
    const actualMsg = await dashboardMainPage.deletePage(parentPageName);
    AssertionHelper.assertEqual(actualMsg, expectedMsgWithChildPage);

    // Delete children page, verify the confirm message shows and check children page is deleted
    const actualMsg2 = await dashboardMainPage.deletePage(childrenPageName, parentPageName);
    AssertionHelper.assertEqual(actualMsg2, expectedMsgWithoutChildPage);
    await dashboardMainPage.verifyPageDeleted(childrenPageName);

    // Delete parent page, verify the confirm message shows and check parent page is deleted
    const actualMsg3 = await dashboardMainPage.deletePage(parentPageName);
    AssertionHelper.assertEqual(actualMsg3, expectedMsgWithoutChildPage);
    await dashboardMainPage.verifyPageDeleted(parentPageName);

    // Click on "Overview" page
    await dashboardMainPage.clickOnPage('Overview');

    // Check "Delete" link disappears
    await dashboardMainPage.checkOptionNotExistUnderGlobalSetting('Delete');
});