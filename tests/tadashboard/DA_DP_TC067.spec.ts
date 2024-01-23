import { test } from "@playwright/test";
import LoginPage from "../../pages/login.page";
import DashboardMainPage from "../../pages/dashboard-main.page";
import Constant from "../../utils/constant";
import DataProfilesPage from "../../pages/data-profiles.page";
import { AssertionHelper } from "../../utils/assertion-helper";
import DataProfiles from "../../data/data-profiles";

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
    const actualPresetDataProfiles = (await dataProfilesPage.getDataProfiles()).sort();
    console.log(actualPresetDataProfiles);
    AssertionHelper.assertEqual(actualPresetDataProfiles, DataProfiles.expectedPresetDataProfiles.sort());
});