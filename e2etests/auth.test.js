
describe('Authentication', () => {
  

  beforeEach(async () => {
    await page.goto('http://localhost:3000/login');
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

  it('should login to an existing account', async () => {
    await page.waitForSelector('input[type=text]')
    await page.type('input[type=text]', "testuser")
    await page.type('input[type=password]', "testpass")
    const loginButton = await page.$('button[role=button]');
    await page.click("button.ui.large.primary.animated.button")
    await page.waitForSelector('h3.ui.header>div')

    let username = await page.evaluate(()=> {
      return document.querySelector('h3.ui.header>div').innerText
    })
    await expect(username).toBe("testuser")
  });

  it('should signup and create a new account', async() => {
    await page.waitForSelector('a[href="/register"]')
    await page.click('a[href="/register"]')
    await page.type('input[placeholder="Name"]', "e2etest")
    await page.type('input[placeholder="Email address"]', "e2etest@test.com")
    await page.type('input[placeholder="Password"]', "password")
    await page.click("button")
    await page.waitForSelector('h3.ui.header>div')

    let username = await page.evaluate(()=> {
      return document.querySelector('h3.ui.header>div').innerText
    })
    await expect(username).toBe("e2etest@test.com")
  })
});