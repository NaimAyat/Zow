describe('Authentication', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should login to an existing account without any trouble', async () => {
    let els = await page.evaluate(() => {
      let btn = document.querySelectorAll("button")[0]
      btn.click()
      let emailInput = document.querySelectorAll("input")[0]
      let passwordInput = document.querySelectorAll("input")[1]
      let login = document.querySelectorAll("button")[0]
      return {
        emailInput,
        passwordInput,
        login
      }
    });
    await page.type('input[type=text]', "testuser")
    await page.type('input[type=password]', "testpass")
    const loginButton = await page.$('button[role=button]');
    await loginButton.click()
    let usernameOnPage = await page.$x('//span')
  
    await page.waitForSelector("div.right.item")
  
    let username = await page.evaluate(()=> {
      return document.querySelector("div.right.item span").innerText.split("\n")[0]
    })

    await expect(username).toBe("testuser")

  });
});