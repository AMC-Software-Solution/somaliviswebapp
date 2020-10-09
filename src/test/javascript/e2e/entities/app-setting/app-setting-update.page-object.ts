import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AppSettingUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.appSetting.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fieldNameInput: ElementFinder = element(by.css('input#app-setting-fieldName'));
  fieldValueInput: ElementFinder = element(by.css('input#app-setting-fieldValue'));
  defaultValueInput: ElementFinder = element(by.css('input#app-setting-defaultValue'));
  enabledInput: ElementFinder = element(by.css('input#app-setting-enabled'));
  createdDateInput: ElementFinder = element(by.css('input#app-setting-createdDate'));
  updatedDateInput: ElementFinder = element(by.css('input#app-setting-updatedDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFieldNameInput(fieldName) {
    await this.fieldNameInput.sendKeys(fieldName);
  }

  async getFieldNameInput() {
    return this.fieldNameInput.getAttribute('value');
  }

  async setFieldValueInput(fieldValue) {
    await this.fieldValueInput.sendKeys(fieldValue);
  }

  async getFieldValueInput() {
    return this.fieldValueInput.getAttribute('value');
  }

  async setDefaultValueInput(defaultValue) {
    await this.defaultValueInput.sendKeys(defaultValue);
  }

  async getDefaultValueInput() {
    return this.defaultValueInput.getAttribute('value');
  }

  getEnabledInput() {
    return this.enabledInput;
  }
  async setCreatedDateInput(createdDate) {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput() {
    return this.createdDateInput.getAttribute('value');
  }

  async setUpdatedDateInput(updatedDate) {
    await this.updatedDateInput.sendKeys(updatedDate);
  }

  async getUpdatedDateInput() {
    return this.updatedDateInput.getAttribute('value');
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
    await this.setFieldNameInput('fieldName');
    expect(await this.getFieldNameInput()).to.match(/fieldName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFieldValueInput('fieldValue');
    expect(await this.getFieldValueInput()).to.match(/fieldValue/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDefaultValueInput('defaultValue');
    expect(await this.getDefaultValueInput()).to.match(/defaultValue/);
    await waitUntilDisplayed(this.saveButton);
    const selectedEnabled = await this.getEnabledInput().isSelected();
    if (selectedEnabled) {
      await this.getEnabledInput().click();
      expect(await this.getEnabledInput().isSelected()).to.be.false;
    } else {
      await this.getEnabledInput().click();
      expect(await this.getEnabledInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
