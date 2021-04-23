jest.setTimeout(120000);
const { chromium } = require ('playwright');
let browser;
let context;

beforeAll( async() => {
    browser = await chromium.launch({headless:false, slowMo:1000});
});
beforeEach( async() => {
    context = await browser.newContext();
});
afterEach( async() => {
    await context.close();
});
afterAll( async() => {
    await browser.close();
});

describe('Tests',() => {
    let page; 
    test('1. Authorization page. Not registered user', async() => {
        page = await context.newPage();
        await page.goto('https://www.sbzend.ssls.com/');
        await page.click('button:nth-child(2) > span');
        await page.type('div > input','bla@ukr.net');
        await page.type('div.input-box.password > input','4455623');
        await page.click('span.icon.icon-eye');
        await page.click('body > div.container > div > ui-view > div > ng-include > div > div > form > div.btn-box > button');
        await page.waitForSelector('text=Uh oh! Email or password is incorrect');
    });
    test('2. Authorization page (Welcome back!)', async() => {
        page = await context.newPage();
        await page.goto('https://www.sbzend.ssls.com/');
        await page.click('button:nth-child(2) > span');
        await page.type('div > input','ssls.automation+666@gmail.com', {timeout: 1000000});
        await page.type('div.input-box.password > input','123456');
        await page.click('span.icon.icon-eye');
        await page.click('body > div.container > div > ui-view > div > ng-include > div > div > form > div.btn-box > button');
        await page.waitForSelector('div.ssls-dropdown.ssls-header-user.ssls-header-dropdown');
    });
    test('3. My profile page. Client area', async() => {
        page = await context.newPage();
        await page.goto('https://www.sbzend.ssls.com/');
        await page.click('button:nth-child(2) > span');
        await page.type('div > input','ssls.automation+666@gmail.com', {timeout: 1000000});
        await page.type('div.input-box.password > input','123456');
        await page.click('body > div.container > div > ui-view > div > ng-include > div > div > form > div.btn-box > button');
        await page.click('div.ssls-dropdown.ssls-header-user.ssls-header-dropdown');
        await page.click('div.ssls-dropdown.ssls-header-user.ssls-is-opened.ssls-header-dropdown > div > ul > li:nth-child(2) > a');
        var Name = await page.textContent('body > div.container > div > ui-view > div > div.page-content > div > div:nth-child(2) > div > form > div:nth-child(1) > div.description > span');
        Name = Name.replace(/(^\s*)|(\s*)$/g, '').trim();
        expect(Name).toEqual('Tom Ford');
        var Email = await page.textContent('body > div.container > div > ui-view > div > div.page-content > div > div:nth-child(2) > div > form > div:nth-child(2) > div.description > span');
        Email = Email.replace(/(^\s*)|(\s*)$/g, '').trim();
        expect(Email).toEqual('ssls.automation+666@gmail.com');
        var Password = await page.textContent('body > div.container > div > ui-view > div > div.page-content > div > div:nth-child(2) > div > form > div:nth-child(3) > div.description > span');
        Password = Password.replace(/(^\s*)|(\s*)$/g, '').trim();
        expect(Password).toEqual('*****');
        var Phone = await page.textContent('body > div.container > div > ui-view > div > div.page-content > div > div:nth-child(2) > div > form > div:nth-child(4) > div.description > span');
        Phone = Phone.replace(/(^\s*)|(\s*)$/g, '').trim();
        expect(Phone).toEqual('+380 12312312');
        var Address = await page.textContent('body > div.container > div > ui-view > div > div.page-content > div > div:nth-child(2) > div > form > div:nth-child(5) > div.description > span');
        Address = Address.replace(/(^\s*)|(\s*)$/g, '').trim();
        expect(Address).toEqual('Diagon alley 21, Misto, Uryupinsk 612120, Ukraine');
        var SupportPin = await page.textContent('body > div.container > div > ui-view > div > div.page-content > div > div:nth-child(2) > div > form > div:nth-child(6) > div.description > span');
        SupportPin = SupportPin.replace(/(^\s*)|(\s*)$/g, '').trim();
        expect(SupportPin).toEqual('oi3l');
    }); 
});