const { test } = require('@playwright/test');
const { registerUser } = require('../tests/helper/user');
const { LoginPage } = require('../pages/login_page');
const { DashboardPage } = require('../pages/dashboard_page');
const { CategoryPage } = require('../pages/category_page');
const { faker } = require('@faker-js/faker'); 

test.beforeEach(async ({ request, page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const userEmail = faker.internet.email();
  const userPassword = faker.internet.password();
  await registerUser(request, {
    email: userEmail,
    password: userPassword
  });

  await loginPage.goto();
  await loginPage.expectLoginPageVisible();
  await loginPage.login(userEmail, userPassword);
  await dashboardPage.expectDashboardPageVisible();
});

test('User can create new category and subcategory', async ({ request, page }) => {
  const dashboardPage = new DashboardPage(page);
  const categoryPage = new CategoryPage(page);
  const newCategory = faker.food.fruit().toString() + faker.color.human();
  const newSubCategory = faker.food.adjective().toString() + faker.color.human();

  await dashboardPage.openTab('Tipos de Categorias');
  await categoryPage.expectCategoryPageVisible();
  await categoryPage.addCategory(newCategory);
  await categoryPage.expectDialogVisible('Tipo de categoría adicionada satisfactoriamente');
  await categoryPage.addSubCategory(newSubCategory, newCategory);
  await categoryPage.expectDialogVisible('Tipo de categoría adicionada satisfactoriamente');
  await categoryPage.expectCategoryVisible(newSubCategory);
});
