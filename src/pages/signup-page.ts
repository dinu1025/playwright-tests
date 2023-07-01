import type { Page } from 'playwright';
import { delay, isVisible } from '../driver/common-actions';
import { DashboardPage } from './dashboard-page';
import config from '../../playwright.config';

export class SignUpPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async enterEmail_clickNext(email: string) {
        await this.page.locator('//h3[text()="Access your local entrepreneurship ecosystem."]').waitFor();
        await this.page.type('div[id="divEmail"] input[id="txtEmail"]', email);
        await this.page.locator('div[id="divEmail"] + div+p + div button').click();
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
