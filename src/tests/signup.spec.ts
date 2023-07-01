import { test, expect } from '@playwright/test';
import { admin_user, local_user, student_user } from './testdata';
import { DashboardPage } from '../pages/dashboard-page';
import { LoginPage } from '../pages/login-page';
import { SignUpPage } from '../pages/signup-page';

var loginPage;

  test.beforeEach(async ({ page }) => { /* ... */
    loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test(`Test SIgnup @smoke`, async ({ page }) => {
    await loginPage.click_signup_link();
    const singUpPage = new SignUpPage(page);
    await singUpPage.enterEmail_clickNext("emab@gmail.com");
    // expect(await dashboardPage.getLoggedInUserName()).toContainText("taff");
  });
    

  test.afterAll(async ({ page }) => { 
    await page.close();
  });
