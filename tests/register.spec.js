// @ts-check
const { test, expect } = require('@playwright/test');
// @ts-check
const { faker } = require('@faker-js/faker');
const { registerUser, createAccount } = require('../Functions/account.functions');

test.beforeEach( async ({ page }) => {
//Given
  await page.goto('/parabank/register.htm');
  const credential = {username:faker.internet.userName(), password:faker.internet.password()};

//When
    await registerUser(page, credential);

//Then
  await expect(page.getByText('Your account was created')).toBeVisible();
 
});
  
test('Create new account', async ({ page }) => {
    //Given
      await page.goto('/parabank/openaccount.htm');
    //When  
      const accountNumber = await createAccount(page,'CHECKING');
    //Then
      expect(accountNumber).not.toBeUndefined();
      expect(accountNumber).not.toBe('');    
     
    });