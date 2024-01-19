import { test } from "@playwright/test";
import LoginPage from "../../pages/login.page";
import DashboardMainPage from "../../pages/dashboard-main.page";
import Constant from "../../utils/constant";
import DataProfilesPage from "../../pages/data-profiles.page";
import { AssertionHelper } from "../../utils/assertion-helper";

test('DA_DP_TC067 - Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const dataProfilesPage = new DataProfilesPage(page);

    // Login
    await loginPage.goTo(Constant.URL);
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);

    // Click Administer link, then click Data Profiles link
    await dashboardMainPage.selectMenuOption('Administer->Data Profiles');

    // Check Data Profiles are listed alphabetically
    const expectedPresetDataProfiles: string[] = [
        'Action Implementation By Status',
        'Functional Tests',
        'Test Case Execution',
        'Test Case Execution Failure Trend',
        'Test Case Execution History',
        'Test Case Execution Results',
        'Test Case Execution Trend',
        'Test Module Execution',
        'Test Module Execution Failure Trend',
        'Test Module Execution Failure Trend by Build',
        'Test Module Execution History',
        'Test Module Execution Results',
        'Test Module Execution Results Report',
        'Test Module Execution Trend',
        'Test Module Execution Trend by Build',
        'Test Module Implementation By Priority',
        'Test Module Implementation By Status',
        'Test Module Status per Assigned Users',
        'Test Objective Execution'
    ];
    const actualPresetDataProfiles = (await dataProfilesPage.getDataProfiles()).sort();
    console.log(actualPresetDataProfiles);
    AssertionHelper.assertEqual(actualPresetDataProfiles, expectedPresetDataProfiles.sort());
});