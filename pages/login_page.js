const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');

    this.loginButton = page.getByRole('button', { name: 'Autenticar' });

    this.pageTitle = page.getByText('Qubika Club');
    this.pageSubtitle = page.locator('div').filter({ hasText: /^Por favor ingrese correo y contraseña$/ });
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'networkidle' });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPageVisible() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageSubtitle).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = { LoginPage };
