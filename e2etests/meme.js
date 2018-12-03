const puppeteer = require('puppeteer');

// test login flow
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  // Get the "viewport" of the page, as reported by the page.
 
  // let els = await page.evaluate(() => {
  //   let btn = document.querySelectorAll("button")[0]
  //   btn.click()
  //   let emailInput = document.querySelectorAll("input")[0]
  //   let passwordInput = document.querySelectorAll("input")[1]
  //   let login = document.querySelectorAll("button")[0]
  //   return {
  //     emailInput,
  //     passwordInput,
  //     login
  //   }
  // });
  // await page.type('input[type=text]', "testuser")
  // await page.type('input[type=password]', "testpass")
  // const loginButton = await page.$('button[role=button]');
  // await loginButton.click()
  // let usernameOnPage = await page.$x('//span')

  // await page.waitForSelector("div.right.item")

  // let username = await page.evaluate(()=> {
  //   return document.querySelector("div.right.item span").innerText.split("\n")[0]
  // })

  // try{
  //   console.log(username)
  // }
  // catch(err) {
  //   console.log("Test failed")
  // }


  //-------
  await page.waitForSelector(".ui.secondary.button")
  await page.click(".ui.secondary.button")
  await page.type('input[placeholder="Name"]', "e2etest")
  await page.type('input[placeholder="Email address"]', "e2etest@test.com")
  await page.type('input[placeholder="Password"]', "password")
  await page.click("button")
  await page.waitForSelector("div.right.item")

  let username = await page.evaluate(()=> {
    return document.querySelector("div.right.item span").innerText.split("\n")[0]
  })
  console.log(username)
  // usernameOnPage = await page.evaluate(usernameOnPage => usernameOnPage.textContent, usernameOnPage)
  // console.log(usernameOnPage)
  // await browser.close();
})();