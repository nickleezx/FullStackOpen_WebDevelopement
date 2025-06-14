const { test, expect, beforeEach, describe } = require('@playwright/test')
const testHelper = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await testHelper.createUser(request)
    await page.goto('http://localhost:5173')
  })

  test('Login form is show', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('Login successful with correct credentials', async ({ page }) => {
      testHelper.login(page, "testing_user", "test_password")
      await expect(page.getByText('testing_user logged in')).toBeVisible()
    })
    
    test('Login unsuccessful with invalid credentials', async ({ page }) => {
      testHelper.login(page, "testing_user", "failed_password")
      await expect(page.getByText('Unable to login')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await testHelper.login(page, 'testing_user', 'test_password')
    })

    test('Logged in user can create a blog', async ({ page }) => {
      await page.getByRole('button', {name: 'new blog'}).click()
      const textBoxes = await page.getByRole('textbox').all()
      await textBoxes[0].fill('test_blog')
      await textBoxes[1].fill('testing_user')
      await textBoxes[2].fill('www.newblog.com')
      await page.getByRole('button', {name: 'create'}).click()

      await expect(page.getByText('Added a new blog: test_blog by testing_user')).toBeVisible()

    })

    describe('when note exist', () => {
      beforeEach(async ({ page }) => {
        await testHelper.createNote(page, 'test_blog', 'testing_user', 'www.test.com')
      })


      test('blog can be liked', async ({ page }) => {
        const button = page.getByRole('button', {name: 'view'})
        await button.waitFor()
        await button.click()
        await page.getByRole('button', {name: 'like'}).click()
        const likeCounter = page.getByTestId('likes')
        await expect(likeCounter).toContainText('1')
      })
      
      test('blog can be deleted', async ({ page }) => {
        const button = page.getByRole('button', {name: 'view'})
        await button.waitFor()
        await button.click()

        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', {name: 'remove'}).click()

        await expect(page.getByText('test_blog testing_user')).not.toBeVisible()

      })

      test('Delete button not visible to other users', async ({ page }) => {
        await page.getByRole('button', {name: 'Log out'}).click()
        await testHelper.login(page, 'root', 'test_password')
        await page.getByRole('button', {name: 'view'}).click()
        await expect(page.getByRole('button', {name: 'Remove'})).not.toBeVisible()
      })
    })

    describe('When multiple notes exists', () => {
      beforeEach(async ({page}) => {
        await testHelper.createNote(page, 'blog1', 'testing_user', 'www.test1.com')
        await testHelper.createNote(page, 'blog2', 'testing_user', 'www.test2.com')
        await page.getByText('blog2 testing_user').waitFor()
      })

      test('blogs are ordered from most likes to least', async ({ page }) => {
        await page.getByRole('button', {name: 'view'}).last().click()
        await page.getByRole('button', {name: "like"}).click()
        const firstBlog = page.locator('.blog').first()
        console.log(firstBlog)
        await expect(firstBlog.getByText('blog2')).toBeVisible()
      })
    })

  })

})