import { test, expect } from '@playwright/test';
import { admin_user, local_user, student_user } from './testdata';
import { DashboardPage } from '../pages/dashboard-page';
import { LoginPage } from '../pages/login-page';

var loginPage;

  test.beforeEach(async ({ page }) => { /* ... */
    loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test(`Test Login with Local User @smoke`, async ({ page }) => {
    await loginPage.login(local_user.email, local_user.password);
    const dashboardPage = new DashboardPage(page);
    expect(await dashboardPage.isDashboardTextPresent()).toBeTruthy();
    expect(await dashboardPage.getLoggedInUserName()).toContainText("taff");
  });


  test(`Test Login with Student User @smoke`, async ({ page }) => {
    await loginPage.login(student_user.email, student_user.password);
    const dashboardPage = new DashboardPage(page);
    expect(await dashboardPage.isDashboardTextPresent()).toBeTruthy();
    // expect(await dashboardPage.getLoggedInUserName()).toHaveText("Vikash Singh" || "Dinesh Student");
  });

  test(`Test Login with Admin User @smoke`, async ({ page }) => {
    await loginPage.login(admin_user.email, admin_user.password);
    const dashboardPage = new DashboardPage(page);
    expect(await dashboardPage.isDashboardTextPresent()).toBeTruthy();
    // expect(await dashboardPage.getLoggedInUserName()).toHaveText("Vikash Singh" || "Dinesh Student");
  });
    

  test.afterAll(async ({ page }) => { 
    await page.close();
  });
