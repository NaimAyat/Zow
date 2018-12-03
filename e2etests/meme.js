const puppeteer = require('puppeteer');

// test login flow
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');
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

  await page.waitForSelector('input[type=text]')
    await page.type('input[type=text]', "testuser")
    await page.type('input[type=password]', "testpass")
    const loginButton = await page.$('button[role=button]');
    await page.click("button.ui.large.primary.animated.button")
    await page.waitForSelector('h3.ui.header>div')

    let username = await page.evaluate(()=> {
      return document.querySelector('h3.ui.header>div').innerText
    })

    // await expect(username).toBe("testuser")
  //-------
  // await page.waitForSelector('a[href="/register"]')
  // await page.click('a[href="/register"]')
  // await page.type('input[placeholder="Name"]', "e2etest")
  // await page.type('input[placeholder="Email address"]', "e2etest@test.com")
  // await page.type('input[placeholder="Password"]', "password")
  // await page.click("button")
  // await page.waitForSelector('h3.ui.header>div')

  // let username = await page.evaluate(()=> {
  //   return document.querySelector('h3.ui.header>div').innerText
  // })
  console.log(username)
  await page.waitForSelector("div.column>button.ui.large.primary.button")
  await page.click("div.column>button.ui.large.primary.button")
  await page.waitForSelector('input[type=text]')
  await page.type('input[type=text]', "TestForm")
  await page.click("button.ui.blue.huge.button")
  await page.goto('http://localhost:3000/')
  await page.waitForSelector('div[role="listitem"]>div.content>div.header')
  let formName = await page.evaluate(()=> {
    return document.querySelector('div[role="listitem"]>div.content>div.header').innerText
  })
  console.log(formName)
  await page.click('div[role="listitem"]>div.content>div.header')
  await page.waitForSelector('#root > div > div.ui.container > h1:nth-child(3)')
  formName = await page.evaluate(()=> {
    return document.querySelector('#root > div > div.ui.container > h1:nth-child(3)').innerText.split('\n')[0]
  })

  
  // usernameOnPage = await page.evaluate(usernameOnPage => usernameOnPage.textContent, usernameOnPage)
  // console.log(usernameOnPage)
  // await browser.close();
})();