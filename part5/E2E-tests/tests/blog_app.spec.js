const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNewBlogWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'apple'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Wrong User',
        username: 'wronguser',
        password: 'watermelon'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'apple')

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'pear')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'apple')
    })

    test('a new blog can be created', async ({ page }) => {
      await createNewBlogWith(page, 'Test Blog 1', 'Test Writer', 'testurl.com')

      const updateDiv = page.locator('.update')
      await expect(updateDiv).toContainText('a new blog "Test Blog 1" by Test Writer added')

      await expect(page.getByRole('heading', { name: 'Blogs' })).toBeVisible()

      const blogDiv = page.locator('.blog').first()
      await expect(blogDiv).toContainText('Test Blog 1 Test Writer')
    })

    test('a blog can be liked', async ({ page }) => {
      await createNewBlogWith(page, 'Test Blog 2', 'Test Writer', 'testurl.com')

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      const blogDiv = page.locator('.blog').last()
      await expect(blogDiv).toContainText('Test Blog 2 Test Writer hidetesturl.comlikes 1 likeremove')
    })

    test('a user can delete their blog', async ({ page }) => {
      await createNewBlogWith(page, 'Test Blog 3', 'Test Writer', 'testurl.com')
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Remove Blog "Test Blog 3" by Test Writer?')
        dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()

      const blogDiv = page.locator('.blog').first()
      await expect(blogDiv).toHaveCount(0)
    })

    test('a wrong user cannot delete a blog', async ({ page }) => {
      await createNewBlogWith(page, 'Test Blog 4', 'Test Writer', 'testurl.com')
      await page.getByRole('button', { name: 'logout' }).click()

      await loginWith(page, 'wronguser', 'watermelon')
      await page.getByRole('button', { name: 'view' }).click()

      const blogDiv = page.locator('.blog').last()
      await expect(blogDiv).toContainText('Test Blog 4 Test Writer hidetesturl.comlikes 0 like')
    })
  })

  describe('when there are more blogs', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'apple')
      await createNewBlogWith(page, 'Test Blog 1', 'Test Writer', 'testurl.com')
      await createNewBlogWith(page, 'Test Blog 2', 'Test Writer', 'testurl.com')
     
      const blog1 = page.getByText('Test Blog 1')
      const blog1Element = blog1.locator('..')
      const blog2 = page.getByText('Test Blog 2')
      const blog2Element = blog2.locator('..')

      await blog1Element.getByRole('button', { name: 'view' }).click()
      await blog2Element.getByRole('button', { name: 'view' }).click()
    })

    test('blogs are in the right order', async ({ page }) => {
      await page.getByRole('button', { name: 'like' }).first().click()
      await page.getByRole('button', { name: 'like' }).nth(1).click()
      await page.getByRole('button', { name: 'like' }).nth(1).click()
      await page.getByRole('button', { name: 'like' }).nth(1).click()

      const newFirstBlog = page.locator('.blog').first()
      await expect(newFirstBlog).toContainText('Test Blog 2')
    })
  })
})