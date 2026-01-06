const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;

    this.salirButton = page.locator('#sidenav-collapse-main').getByText('Salir');
  }

  async goto() {
    await this.page.goto('/dashboard', { waitUntil: 'networkidle' });
  }

  async expectDashboardPageVisible() {
    await expect(this.salirButton).toBeVisible();
  }

  async openTab(tab){
    this.page.getByRole('link', { name: tab }).click();
  }
}

module.exports = { DashboardPage };
