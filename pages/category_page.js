const { expect } = require('@playwright/test');

class CategoryPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByText('Tipos de categorías');

    this.addButton = page.getByRole('button', { name: 'Adicionar' });
    this.acceptButton = page.getByRole('button', { name: 'Aceptar' });
    this.isCategory = page.locator('label').filter({ hasText: 'Es subcategoria?' });
    this.categoriesListCombobox = page.locator('div').filter({ hasText: /^Seleccione la categoría padre$/ });
    this.mainCategoryPlaceholder = page.getByPlaceholder('Seleccione la categoría padre');

    this.newCategoryField = page.getByPlaceholder('Nombre de categoría');
    }

  async goto() {
    await this.page.goto('/category-type', { waitUntil: 'networkidle' });
  }

  async expectCategoryPageVisible() {
    await expect(this.pageTitle).toBeVisible();
  }

  async openTab(tab){
    this.page.getByRole('link', { name: tab }).click();
  }

  async addCategory(newCategoryName){
    await this.addButton.click()
    await this.newCategoryField.fill(newCategoryName);
    await this.acceptButton.click()
  }

  async addSubCategory(newCategoryName, newSubCategoryName){
    await this.addButton.click()
    await this.newCategoryField.fill(newCategoryName);
    await this.isCategory.click();
    await this.categoriesListCombobox.first().click()
    await this.categoriesListCombobox.first().locator('input').fill(newSubCategoryName);
    await this.page.getByRole('option', { name: newSubCategoryName }).first().click();
    await this.acceptButton.click()
  }

  async goToMostRecentCategories(){
    const list = this.page.locator('ul.pagination li');
    const totalCount = await list.count();
    await list.nth(totalCount - 2 ).click();
  }

  async expectCategoryVisible(subCategoryName){
    await this.goToMostRecentCategories();
    await expect(this.page.getByText(subCategoryName).last()).toBeVisible();
  
  }
  async expectDialogVisible(dialogMessage){
    await expect(
    this.page.getByRole('alertdialog', { name: dialogMessage })
  ).toBeVisible();
  
  }
}

module.exports = { CategoryPage };
