import type { Page } from 'playwright';
import { Locator, expect } from '@playwright/test';
import { isVisible } from '../driver/common-actions';
import { ManageExpectationsPage } from './manage-opportunities-page';

export class DashboardPage {
    readonly page: Page;

    totalAppointmentsCount:string = '#TotalAppointments';
    totalIntroductionsCount:string = '#TotalIntroductions';
    totaleventviewscount:string = '#TotalEventViews';
    totaloprtunityviewscount:string = '#TotalOprtunityViews';
    totalecosystemcontributioncount:string ='#TotalEcosystemContribution';

    promoteIcon :string = 'a[href="#toggle_Promote"]';
    expectationIcon:string = 'a[href="/Promote/Expectations/"]';


    constructor(page: Page) {
        this.page = page;
    }

    async isDashboardTextPresent(): Promise<boolean> {
        return await isVisible(this.page, 'a.brand-logo img');
    }

    async getLoggedInUserName() {
        return await this.page.locator('css=#profileDropdown div p');
    }

    async getTotalAppointmentCount(): Promise<Locator> {
        return await this.page.locator(this.totalAppointmentsCount);
    }

    async getTotalIntroductionsCount(): Promise<Locator> {
        return await this.page.locator(this.totalIntroductionsCount);
    }

    async getTotalEventViewsCount(): Promise<Locator> {
        return await this.page.locator(this.totaleventviewscount);
    }

    async getTotalExpectationViewCount(): Promise<Locator> {
        return await this.page.locator(this.totaloprtunityviewscount);
    }    

    async getTotalEcosystemContributionsCount(): Promise<Locator> {
        return await this.page.locator(this.totalecosystemcontributioncount);
    }

    async click_on_opportunities_inLeftPanel() {
        await this.page.locator(this.promoteIcon).waitFor();
        await this.page.locator(this.promoteIcon).click();
        await this.page.locator(this.expectationIcon).click();
        return new ManageExpectationsPage(this.page);
    }

    async isUpcomingAppointmentSectionDisplayed() {
        await this.page.getByRole('heading', { name: 'Upcoming Appointments' }).waitFor();
        const section = await this.page.getByRole('heading', { name: 'Upcoming Appointments' });
        return await section.isVisible();
    }

    async isLatestUpdateHeaderVisible() {
        return await this.page.getByRole('heading', { name: 'Latest Updates' }).isVisible();
    }

    async getSection_inBottom(sectionName: string) {
        return await this.page.getByRole('heading', { name: sectionName }).isVisible();
    }

    

}

