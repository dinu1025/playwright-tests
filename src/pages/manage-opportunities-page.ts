import type { Locator, Page } from 'playwright';
import { delay } from '../driver/common-actions';

export class ManageExpectationsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    addExpectationButton :string ='button[class="custom_btn_default Addpermission "]';
    expectationTypeButton :string ='#expectation_type_id';
    advicebutton :string ='id="item280719999992847460-1"';
    typename :string ='[id="name"]';
    description :string ='[data-placeholder="Description"]';
    eligibilityCriteria :string ='p[data-placeholder="Eligibility Criteria"]';
    hostName :string ='[id="host_name"]';
    hostphone :string ='[id="contact"]';
    hostEmail :string ='[id="mail_to"]';
    externalLink :string ='[id="registration_link"]';
    selectFilterButton :string ='//div[@id="prettydropdown-filter"]//ul';
    searchButton :string ='[id="txtSearch_approvedopportunities"]';
    clickExpectationName :string ='[class="truncate"]';
    advice :string ='[class="vEvent"]';
    expectationTitle :string ='h1';
    deadlineText :string ='[class="date-watch-lt"]';
    promoteIcon :string = 'a[href="#toggle_Promote"]';
    expectationIcon:string = 'a[href="/Promote/Expectations/"]';
    clickOnYes:string = '[id="deletePath"] button[class="btn btn-gradient-primary"]';
    deleteButton :string= 'a[class="clsAppointmentsAcceptPopupOpen DeletePermission"] img[alt="Delete"]';
    noRecordFound :string= '[id="divapproveopportunitiesNoRecords"]';
    pendingApproval :string= '[class="tableHeader mb-4"]';


    async click_on_add_expectation(){
        await this.page.locator (this.addExpectationButton).click();
    }

    async create_expectation_type(expectationName:string, type:string){
        await this.page.selectOption(this.expectationTypeButton, type);
        await this.page.locator(this.typename).type(expectationName);
        await this.page.locator(this.description).type("This is an automaiton opportunitiy");
        await this.page.locator(this.eligibilityCriteria).type("Masters");
        await this.page.locator(this.hostName).type("Host_Automation");
        await this.page.locator(this.hostphone).type("2344552766");
        await this.page.locator(this.hostEmail).type("automation1@gmail.com");
        await this.page.locator('input[name="Logo"]').setInputFiles('playwright-logo.png');
        await this.page.locator('input[data-file-name="#background_image"]').setInputFiles('playwright-logo.png');
        await this.page.locator (this.selectFilterButton).click();
        await this.page.locator('#btnPublish').click(); 
        await this.page.locator (this.addExpectationButton).waitFor();
        await this.page.getByText("Pending Approval").waitFor();
        await delay(10000);
    }
    
    async click_on_expectation(expectationName:string) {
        await this.page.getByText(expectationName).scrollIntoViewIfNeeded();
        await this.page.getByText(expectationName).click();
        await this.page.getByText(expectationName).waitFor();
        await delay(5000);
    }
    
    async get_expectation_type(){
         return await this.page.locator(this.advice);
    }

    async get_expectation_name(){
        return await this.page.locator(this.expectationTitle);
    }
    
    async get_expectation_deadline_text(){
        return await this.page.locator(this.deadlineText);
    }

    async getExpectationInfo_inApprovedExpectationsTable(info:string): Promise<Locator> {
        return await this.page.getByText(info);
    }

    async search_the_expectation(search:string){
        await this.page.locator(this.searchButton).click();
        await this.page.locator(this.searchButton).type(search);
        await this.page.keyboard.press('Enter');
        await this.page.getByText("Pending Approval").waitFor();
        // await this.page.getByText("Advice").waitFor();
        await delay(5000);
    }

    async delete_expectation(){
        await this.page.locator(this.deleteButton).click();
        await this.page.locator(this.clickOnYes).click();
        await this.page.getByText("Pending Approval").waitFor();
        await delay(5000);
    }
    
    async getMessage_noRecordFound(){ 
        await delay(5000);
        return await this.page.locator(this.noRecordFound);
        
    }
}
