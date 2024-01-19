import { test } from '@playwright/test';
import LoginPage from '../../pages/login.page';
import Constant from '../../utils/constant';
import DashboardMainPage from '../../pages/dashboard-main.page';
import PanelsPage from '../../pages/panels.page';

test('DA_PANEL_TC028 - Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelsPage = new PanelsPage(page);

    // Login
    await loginPage.goTo(Constant.URL);
    await loginPage.login(Constant.USERNAME, Constant.PASSWORD);

    // Click Administer link, then click Panels link
    await dashboardMainPage.selectMenuOption('Administer->Panels');

    // Click Add New link
    await panelsPage.clickOnAddNew();

    // Verify Add New Panel page shows
    await panelsPage.verifyAddNewPanelDialogDisplays();

    // All control/form are disabled or locked when Add New Panel dialog is opening
    await panelsPage.verifyAllControlsDisabled();
})