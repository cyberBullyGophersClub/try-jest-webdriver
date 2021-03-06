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
                //"headless",
                "disable-gpu",
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
            By.id(s.inputs.userInput)
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
        ), timeout
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


describe("Тесты восстановления пароля", () => {
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

beforeEach(async () => {
    await driver.get(acc.domen);
    await driver.wait(
        until.elementLocated(
            By.id(s.buttons.btnForgotPw)
        ));
    await driver.findElement(By.id(s.buttons.btnForgotPw)).click();
});

afterAll(async () => {
    await driver.quit();
});

test("Верное сообщение об ошибке при вводе кириллицы", async () => {
    await driver.findElement(By.id(s.inputs.forgotPwLogin)).sendKeys("Тест");
    await driver.findElement(By.id(s.buttons.btnContinue)).click();
    await driver.wait(
        until.elementLocated(
            By.css(s.errorFields.pwError)
        ));
    let error = await driver.findElement(By.css(s.errorFields.pwError)).getText();
    expect(error).toEqual("Недопустимые символы.");
    }, timeout);

test("Верное сообщение об ошибке при вводе несуществующего аккаунта", async () => {
    await driver.findElement(By.id(s.inputs.forgotPwLogin)).sendKeys(acc.invLogin);
    await driver.findElement(By.id(s.buttons.btnContinue)).click();
    await driver.wait(
        until.elementLocated(
            By.css(s.errorFields.pwError)
        ));
    let error = await driver.findElement(By.css(s.errorFields.pwError)).getText();
    expect(error).toEqual("Вы указали неверный логин.");
    }, timeout);

test("Верное сообщение об ошибке при восстановлении пароля с отсутствующим e-mail", async () => {
    await driver.findElement(By.id(s.inputs.forgotPwLogin)).sendKeys(acc.pwTestLogin);
    await driver.findElement(By.id(s.buttons.btnContinue)).click();
    await driver.wait(
        until.elementLocated(
            By.css(s.errorFields.pwError)
        ));
    let error = await driver.findElement(By.css(s.errorFields.pwError)).getText();
    expect(error).toEqual("Для сотрудника не задан e-mail для восстановления пароля.");
    }, timeout);

test("Отправка инструкций на e-mail", async () => {
    await driver.findElement(By.id(s.inputs.forgotPwLogin)).sendKeys(acc.authTestLogin);
    await driver.findElement(By.id(s.buttons.btnContinue)).click();
    await driver.findElement(By.css(s.testSelectors.successPwRec));
    }, timeout);

test("Тест кнопки 'НАЗАД'", async () => {
    await driver.findElement(By.id(s.buttons.btnBack)).click();
    await driver.wait(
        until.elementLocated(
            By.id(s.buttons.btnForgotPw)
        ));
    }, timeout);

});