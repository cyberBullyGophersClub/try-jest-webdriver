//const puppeteer = require('puppeteer');
const acc = require("./accounts");
const s = require("./setup");


let driver;
let webdriver;
let By;
let until;
const timeout = 50000;

/*
let browser;
let page;
const width = 1300;
const height = 800;
*/

describe("Тесты авторизации", () => {
    beforeAll(async () => {
        webdriver = require('selenium-webdriver');
        until = webdriver.until;
        By = webdriver.By;

        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = {
            args: [
                /*'headless',
                'disable-gpu',*/
                "no-sandbox",
            ],
        };
        chromeCapabilities.set("chromeOptions", chromeOptions);
        driver = new webdriver.Builder().forBrowser("chrome").build();
});

beforeEach(async() => {
    await driver.get(acc.domen);
    await driver.wait(
        until.elementLocated(
            By.id("Username")
        ));
});

afterAll(async () => {
    await driver.quit();
});

test("Верное сообщение об ошибке при авторизации неверного/несуществующего аккаунта", async () => {
    await driver.findElement(By.id(s.inputs.userInput)).sendKeys(acc.invLogin);
    await driver.findElement(By.id(s.inputs.pwInput)).sendKeys(acc.password);
    await driver.findElement(By.id(s.buttons.btnLogin)).click();
    await driver.wait(
        until.elementLocated(
            By.xpath(s.errorFields.invLoginError)
        )
    );

    let error = await driver.findElement(By.xpath(s.errorFields.invLoginError)).getText();
    expect(error).toEqual("Неверный логин или пароль.");

    }, timeout);

test("Успешная авторизация", async () => {
    await driver.findElement(By.id(s.inputs.userInput)).sendKeys(acc.authTestLogin);
    await driver.findElement(By.id(s.inputs.pwInput)).sendKeys(acc.password);
    await driver.findElement(By.id(s.buttons.btnLogin)).click();
    await driver.wait(
        until.elementLocated(
            By.id(s.testSelectors.successLogin)
        )
    );
    }, timeout);
});


/*describe("Тесты восстановления пароля", () => {
    beforeAll(async () => {
    browser = await puppeteer.launch({headless: false,
        args: [`--window-size=${width},${height}` ,"--no-sandbox"]});
    page = await browser.newPage();
    await page.setViewport({width, height});
});

beforeEach(async () => {
    await page.goto(acc.domen);
    await page.waitFor(1000);
    await page.click(s.buttons.btnForgotPw);
});

afterAll(async () => {
    await browser.close();
});

test("Верное сообщение об ошибке при вводе кириллицы", async () => {
    await page.type(s.inputs.forgotPwLogin, "тест");
    await page.click(s.buttons.btnContinue);
    const errText = await page.$eval(s.errorFields.pwError, el => el.textContent);
    expect(errText).toEqual("Недопустимые символы.");
    }, timeout);

test("Верное сообщение об ошибке при вводе несуществующего аккаунта", async () => {
    await page.type(s.inputs.forgotPwLogin, acc.invLogin);
    await page.click(s.buttons.btnContinue);
    const errText = await page.$eval(s.errorFields.pwError, el => el.textContent);
    expect(errText).toEqual("Вы указали неверный логин.");
    }, timeout);

test("Верное сообщение об ошибке при восстановлении пароля с отсутствующим e-mail", async () => {
    await page.type(s.inputs.forgotPwLogin, acc.pwTestLogin);
    await page.click(s.buttons.btnContinue);
    const errText = await page.$eval(s.errorFields.pwError, el => el.textContent);
    expect(errText).toEqual("Для сотрудника не задан e-mail для восстановления пароля.");
    }, timeout);

test("Отправка инструкций на e-mail", async () => {
    await page.type(s.inputs.forgotPwLogin, acc.authTestLogin);
    await page.click(s.buttons.btnContinue);
    await page.waitForSelector(s.testSelectors.successPwRec);
    }, timeout);

test("Тест кнопки 'НАЗАД'", async () => {
    await page.click(s.buttons.btnBack);
    await page.waitForSelector(s.buttons.btnForgotPw);
    }, timeout);

});*/