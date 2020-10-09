import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PaymentTransactionUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.paymentTransaction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  transactionAmountInput: ElementFinder = element(by.css('input#payment-transaction-transactionAmount'));
  paymentTypeSelect: ElementFinder = element(by.css('select#payment-transaction-paymentType'));
  paymentDescriptionInput: ElementFinder = element(by.css('input#payment-transaction-paymentDescription'));
  paymentStatusSelect: ElementFinder = element(by.css('select#payment-transaction-paymentStatus'));
  transactionDateInput: ElementFinder = element(by.css('input#payment-transaction-transactionDate'));
  paymentProviderInput: ElementFinder = element(by.css('input#payment-transaction-paymentProvider'));
  visaApplicationSelect: ElementFinder = element(by.css('select#payment-transaction-visaApplication'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTransactionAmountInput(transactionAmount) {
    await this.transactionAmountInput.sendKeys(transactionAmount);
  }

  async getTransactionAmountInput() {
    return this.transactionAmountInput.getAttribute('value');
  }

  async setPaymentTypeSelect(paymentType) {
    await this.paymentTypeSelect.sendKeys(paymentType);
  }

  async getPaymentTypeSelect() {
    return this.paymentTypeSelect.element(by.css('option:checked')).getText();
  }

  async paymentTypeSelectLastOption() {
    await this.paymentTypeSelect.all(by.tagName('option')).last().click();
  }
  async setPaymentDescriptionInput(paymentDescription) {
    await this.paymentDescriptionInput.sendKeys(paymentDescription);
  }

  async getPaymentDescriptionInput() {
    return this.paymentDescriptionInput.getAttribute('value');
  }

  async setPaymentStatusSelect(paymentStatus) {
    await this.paymentStatusSelect.sendKeys(paymentStatus);
  }

  async getPaymentStatusSelect() {
    return this.paymentStatusSelect.element(by.css('option:checked')).getText();
  }

  async paymentStatusSelectLastOption() {
    await this.paymentStatusSelect.all(by.tagName('option')).last().click();
  }
  async setTransactionDateInput(transactionDate) {
    await this.transactionDateInput.sendKeys(transactionDate);
  }

  async getTransactionDateInput() {
    return this.transactionDateInput.getAttribute('value');
  }

  async setPaymentProviderInput(paymentProvider) {
    await this.paymentProviderInput.sendKeys(paymentProvider);
  }

  async getPaymentProviderInput() {
    return this.paymentProviderInput.getAttribute('value');
  }

  async visaApplicationSelectLastOption() {
    await this.visaApplicationSelect.all(by.tagName('option')).last().click();
  }

  async visaApplicationSelectOption(option) {
    await this.visaApplicationSelect.sendKeys(option);
  }

  getVisaApplicationSelect() {
    return this.visaApplicationSelect;
  }

  async getVisaApplicationSelectedOption() {
    return this.visaApplicationSelect.element(by.css('option:checked')).getText();
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
    await this.setTransactionAmountInput('5');
    expect(await this.getTransactionAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.paymentTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentDescriptionInput('paymentDescription');
    expect(await this.getPaymentDescriptionInput()).to.match(/paymentDescription/);
    await waitUntilDisplayed(this.saveButton);
    await this.paymentStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setTransactionDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getTransactionDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentProviderInput('paymentProvider');
    expect(await this.getPaymentProviderInput()).to.match(/paymentProvider/);
    await this.visaApplicationSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
