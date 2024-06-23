// @ts-check
const { test, expect } = require('@playwright/test');
// @ts-check
const { faker, tr } = require('@faker-js/faker');
const { registerUser, createAccount, getStartingAccount, transferFunds } = require('../Functions/account.functions');

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

    test('Transfer Funds', async ({ page }) => {
      //Given
      //from
      //to      
        await page.goto('/parabank/openaccount.htm');
        const fromAccount = await getStartingAccount(page,'CHECKING');
        const toAccount = await createAccount(page,'CHECKING');
      //When
      await page.goto('/parabank/overview.htm');
      const amountAvailable = await page.getByRole('row', {name: fromAccount }).getByRole('cell', {name: '$'}).nth(1).textContent(); 
      //value has $
      //we need half the amoutAvailable
      // @ts-ignore
      let halfAvailable = ((amountAvailable?.split('$')[1]) / 2).toString();  
      

      await transferFunds(page, halfAvailable, fromAccount, toAccount);
      
      
      //Then
      if(!halfAvailable.includes(`.`)){
        halfAvailable += ".00";
      }
      await expect(page.getByText(`$${halfAvailable} has been transferred from account #${fromAccount} to account #${toAccount}`)).toBeVisible();
       
      });


  