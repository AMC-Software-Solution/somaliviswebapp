import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ApplicationFeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.applicationFee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  amountInput: ElementFinder = element(by.css('input#application-fee-amount'));
  descriptionInput: ElementFinder = element(by.css('input#application-fee-description'));
  currencyInput: ElementFinder = element(by.css('input#application-fee-currency'));
  currentIsoCodeInput: ElementFinder = element(by.css('input#application-fee-currentIsoCode'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setCurrencyInput(currency) {
    await this.currencyInput.sendKeys(currency);
  }

  async getCurrencyInput() {
    return this.currencyInput.getAttribute('value');
  }

  async setCurrentIsoCodeInput(currentIsoCode) {
    await this.currentIsoCodeInput.sendKeys(currentIsoCode);
  }

  async getCurrentIsoCodeInput() {
    return this.currentIsoCodeInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setAmountInput('5');
    expect(await this.getAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrencyInput('currency');
    expect(await this.getCurrencyInput()).to.match(/currency/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrentIsoCodeInput('currentIsoCode');
    expect(await this.getCurrentIsoCodeInput()).to.match(/currentIsoCode/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
