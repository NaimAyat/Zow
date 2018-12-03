
describe('The Zow App', () => {
  

  beforeEach(async () => {
    await page.goto('http://localhost:3000');
  });

  afterEach(async () => {
    // Logout after each test
    try{
      await page.waitForSelector("span>a")
      await page.click("span>a")
    }
    catch(err) {
      console.log(err)
    }
  })

  it('should login to an existing account', async () => {
    await page.waitForSelector(".ui.primary.button")
    await page.click(".ui.primary.button")
    await page.waitForSelector('input[type=text]')
    await page.type('input[type=text]', "testuser")
    await page.type('input[type=password]', "testpass")
    const loginButton = await page.$('button[role=button]');
    await loginButton.click()  
    await page.waitForSelector("div.right.item")
    let username = await page.evaluate(()=> {
      return document.querySelector("div.right.item span").innerText.split("\n")[0]
    })
    await expect(username).toBe("testuser")
  });

  it('should signup and create a new account', async() => {
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
    expect(username).toBe("e2etest@test.com")
  })
});