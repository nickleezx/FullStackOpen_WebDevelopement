const createUser = async (request) => {
  await request.post('http://localhost:5173/api/users', {
        data: {
          name: 'test_user',
          username: 'testing_user',
          password: 'test_password'
        }
      })
}

const login = async (page, username, password) => {
  const textboxes =  await page.getByRole('textbox').all()
  await textboxes[0].fill(username)
  await textboxes[1].fill(password)
  await page.getByRole('button', {name: 'login'}).click()
  
}

const createNote = async (page, title, author, url) => {
  await page.getByRole('button', {name: 'new blog'}).click()
  const textBoxes = await page.getByRole('textbox').all()
  await textBoxes[0].fill(title)
  await textBoxes[1].fill(author)
  await textBoxes[2].fill(url)
  await page.getByRole('button', {name: 'create'}).click()
}

module.exports = {
  createUser,
  login,
  createNote,
}