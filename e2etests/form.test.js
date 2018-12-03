
describe('Forms', () => {
  

  beforeEach(async () => {
    // login before each test
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('input[type=text]')
    await page.type('input[type=text]', "testuser")
    await page.type('input[type=password]', "testpass")
    const loginButton = await page.$('button[role=button]');
    await page.click("button.ui.large.primary.animated.button")
    await page.waitForSelector('h3.ui.header>div')

  });

  afterEach(async () => {
    // Logout after each test
    try{
      await page.waitForSelector("div.item>button")
      await page.click("div.item>button")
    }
    catch(err) {
      console.log(err)
    }
  })

  it('Should create a new form, then access it', async () => {
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
    await expect(formName).toBe("TestForm")
    await page.click('div[role="listitem"]>div.content>div.header')

    await page.waitForSelector('#root > div > div.ui.container > h1:nth-child(3)')
    formName = await page.evaluate(()=> {
      return document.querySelector('#root > div > div.ui.container > h1:nth-child(3)').innerText.split('\n')[0].replace(/\s+/g, '')
    })
    await expect(formName).toBe("TestFormPublished")
  });

  
});