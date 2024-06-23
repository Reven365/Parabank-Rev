import { pause } from './global.function';
// @ts-check
const { test, expect } = require('@playwright/test');
// @ts-check
const { faker } = require('@faker-js/faker');

export async function registerUser(page, credential){

    await page.locator('[id="customer\\.firstName"]').fill(faker.person.firstName());
    await page.locator('[id="customer\\.lastName"]').fill(faker.person.lastName());
    await page.locator('[id="customer\\.address\\.street"]').fill(faker.location.streetAddress());
    await page.locator('[id="customer\\.address\\.city"]').fill(faker.location.city());
    await page.locator('[id="customer\\.address\\.state"]').fill(faker.location.state());
    await page.locator('[id="customer\\.address\\.zipCode"]').fill(faker.location.zipCode());
    await page.locator('[id="customer\\.phoneNumber"]').fill(faker.string.numeric(10));
    await page.locator('[id="customer\\.ssn"]').fill(faker.string.numeric(10));
    await page.locator('[id="customer\\.username"]').fill(credential.username);
    await page.locator('[id="customer\\.password"]').fill(credential.password);
    await page.locator('#repeatedPassword').fill(credential.password);
    await page.getByRole('button', { name: 'Register' }).click();    

}

export async function getStartingAccount(page, type){
    await page.getByTestId('type').selectOption(type);
    let options = await page.getByTestId('fromAccountId').locator('option').allTextContents();
    while (options.length === 0){
          await pause(500);    
          options = await page.getByTestId('fromAccountId').locator('option').allTextContents();
    }
    
    expect(options.length).toBeGreaterThan(0); 
    return options[0];  

}

export async function createAccount(page, type){ 
    const startingAccount = await getStartingAccount(page,type);    
    await page.getByTestId('fromAccountId').selectOption(startingAccount);
    await page.getByRole('button', { name: 'Open New Account' }).click();   
    await expect(page.getByText('Your new account number:')).toBeVisible();

    return await page.getByTestId('newAccountId').textContent();
   
}

export async function transferFunds(page, amount, fromAccount, toAccount){
    await page.goto('/parabank/transfer.htm');
    // @ts-ignore
      await page.getByTestId('amount').fill(amount);
      await page.getByTestId('fromAccountId').selectOption(fromAccount);
      await page.getByTestId('toAccountId').selectOption(toAccount);
      await page.getByRole('button', { name: 'Transfer'}).click();

}