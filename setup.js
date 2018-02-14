let buttons = {
    btnLogin: "btnLogin",
    btnForgotPw: "btnForgotPw",
    btnContinue: "btnContinue",
    btnBack: "btnBack",
};

let inputs = {
    userInput: "Username",
    pwInput: "Password",
    forgotPwLogin: "Userlogin",
};

let errorFields = {
    //!!
    invLoginError: "//*[@id='login-container']/table/tbody/tr/td/div/div[1]/form/table/tbody/tr[3]/td[2]/div[2]",
    pwError: "div.error",
};

let testSelectors = {
    successLogin: "widget-adminAccounts",
    successPwRec: "div.recemail"
};
module.exports = {
    buttons,
    inputs,
    errorFields,
    testSelectors,
};