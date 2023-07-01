import type { Page } from 'playwright';
import { delay, isVisible } from '../driver/common-actions';
import { DashboardPage } from './dashboard-page';
import config from '../../playwright.config';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto(config.projects[0].baseUrl);
    }

    async click_signup_link() {
        await this.page.locator('//a[text()="Sign up here"]').waitFor();
        await this.page.click('//a[text()="Sign up here"]');
    }

    async userIsLoggedIn(): Promise<boolean> {
        return await isVisible(this.page, 'a[routerlink="/editor"]');
    } 

    async goToSettings() {
        await this.page.click('a[routerlink="/settings"]');
    }

    async login(email: string, password: string) {  
        await this.page.type('input[id="email"]', email,  {delay: 100});
        await this.page.type('#loginpassword', password,  {delay: 100});
        
        await this.page.getByText('Login').waitFor();
        await this.page.click('button[type="submit"]');
        // await this.page.waitForLoadState('networkidle');
        await this.page.locator('a.brand-logo img').waitFor();
        await delay(5000);
    }

    async loginToApp(email: string, password: string) {
        await this.open();
        await this.login(email, password);
        return new DashboardPage(this.page);
    }
}
