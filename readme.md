# Task 5 

## Goals

### As a tester
### I am able to create and clone a new repo in github [x]
### I am able to create a new playwright JS project [x]
### I am able to configure my project [x]
### I am able to add extra libraries to my node js project [x]
### I am able to create a test script which meets test case requirements [x]
### I am able to use before / after hooks with my tests [x]
### I am able to create reuable functions to call in my test [x]
### I am able to run my tests [x]
### I am able to upload my work to github [x]

## Test Case

Parabank is a valuable demo banking application, however the data on the system is constantly reset by other users.
Therefore for this exercise you will need to generate new accounts per test to ensure stability (not usually best practice in your applications).
You will need to generate test data for this exercise it is recomended that you utilise @faker-js/faker from npmjs.com.

### Url: https://parabank.parasoft.com/

### Case One - Register User

* As a new user
* I am able to capture all the required data and submit
* Then I should be able to login with my new account

### Case Two - Open a new account

* As a registered user
* I am able to open a new 'Checking' account
* Then I should be given a new account number
* And I should be able to view the account
* And the account should have the minimum deposit value as a credit

### Case Three - Transfer Funds

* As a registed user
* I am able to transfer half the total of the initial account to a newly created account
* Then the new account should have its initial value + the transferred amount