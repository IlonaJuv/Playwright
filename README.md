# Yle areena playwright testing

## Description
A UI test suite for Yle Areena built with Playwright and run in Lambdatest. The test also include accessibility overview by Axe-core.

## Setup
1. Clone the repository 
```shell
git clone https://github.com/IlonaJuv/playwright-lambdatest.git
```
2. Install dependencies with npm install
3. Create a .env file with YOUR LambdaTest credentials:
```.env
LT_USERNAME=your_username
LT_ACCESS_KEY=your_access_key
```

## Tests
The tests in this repository use Playwright and LambdaTest to automate browser testing. The tests cover basic functionality of a sample website.

To run the tests, use the command:
```shell
npx playwright test
```
This will execute the tests in parallel across multiple browsers and platforms provided by LambdaTest. 

The tests often timeout when using lambdatest, especially when running all of the tests at the same time.
So it is recommended to run them one by one by using the command:
```shell
npx playwright test testname.spec.js
```
Lambdatest sometimes has issues connecting to the website or the lambdatest services which can cause the tests to fail so you may have to run them multiple times to get them to pass.

Sometimes the browser might want to check cookies and sometimes not. If it is trying to, you can see it from the video of the test in lambdatest automation builds or if you see that the testing gets stuck after entering the website and it tries to click something other than accept/cancel cookies.
In this case uncomment this line:
```shell
await page.getByText('Hyväksy Kaikki').click();
```

To inspect the test results use the command:
```shell
npx playwright show-report
```
Accessibility results can be found in artifacts-folder.

## Limitations 
Playwright is a relatively new tool and may not be compatible with all websites. Additionally, LambdaTest has limitations on the number of parallel tests that can be run based on the plan selected.

Some tests do not work on firefox, but it is probably a lamdatest issue.

## Group 9

- Adnan Avni
- Ilona Juvonen
- Roope Kylli
- Perttu Harvala
 

































