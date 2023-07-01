import { test, expect } from '@playwright/test';

import { local_user } from './testdata';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

var loginPage;

test.beforeEach(async ({ page }) => { /* ... */
  loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(local_user.email, local_user.password);
});

test('Verify Appointments sections for Local User @smoke', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  expect(await dashboardPage.isUpcomingAppointmentSectionDisplayed()).toBeTruthy();
  expect(await dashboardPage.isLatestUpdateHeaderVisible()).toBeTruthy();

  expect(await dashboardPage.getSection_inBottom("Total Introductions"));
  expect(await dashboardPage.getTotalEcosystemContributionsCount()).toHaveText(/[0-9]/g);
});

test.afterAll(async ({ page }) => { 
  await page.close();
});