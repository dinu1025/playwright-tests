import { test, expect } from '@playwright/test';

import { local_user } from './testdata';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ManageExpectationsPage } from '../pages/manage-opportunities-page';

var loginPage;
var expectation_name = (Math.floor(Math.random() * (30 - 1)) + 1) + 'Auto opp';


test.beforeEach(async ({ page }) => { /* ... */
  loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(local_user.email, local_user.password);
});

const op_type = ['High', 'Low', 'Medium'];
for (const type of op_type) {
  test(`User can create Expectation @sanity ${type}`, async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    expect(await dashboardPage.isUpcomingAppointmentSectionDisplayed()).toBeTruthy();

    const manageExpectationsPage = await dashboardPage.click_on_opportunities_inLeftPanel();
    await manageExpectationsPage.click_on_add_expectation();
    await manageExpectationsPage.create_expectation_type(expectation_name, type);

    await manageExpectationsPage.search_the_expectation(expectation_name);
    expect(await manageExpectationsPage.getExpectationInfo_inApprovedExpectationsTable(expectation_name)).toBeVisible();
    // expect(await manageExpectationsPage.getExpectationInfo_inApprovedExpectationsTable("Advice")).toBeVisible();
    expect(await manageExpectationsPage.getExpectationInfo_inApprovedExpectationsTable("Host_Automation")).toBeVisible();

  });
}

test.afterAll(async ({ page }) => {
  await page.close();
});