import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class EmployeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.employee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  employeeFullNameInput: ElementFinder = element(by.css('input#employee-employeeFullName'));
  professionInput: ElementFinder = element(by.css('input#employee-profession'));
  phoneInput: ElementFinder = element(by.css('input#employee-phone'));
  genderSelect: ElementFinder = element(by.css('select#employee-gender'));
  bioInput: ElementFinder = element(by.css('input#employee-bio'));
  profilePhotoInput: ElementFinder = element(by.css('input#file_profilePhoto'));
  profilePhotoUrlInput: ElementFinder = element(by.css('input#employee-profilePhotoUrl'));
  enabledInput: ElementFinder = element(by.css('input#employee-enabled'));
  reasonInput: ElementFinder = element(by.css('input#employee-reason'));
  createdDateInput: ElementFinder = element(by.css('input#employee-createdDate'));
  lastUpdatedDateInput: ElementFinder = element(by.css('input#employee-lastUpdatedDate'));
  userSelect: ElementFinder = element(by.css('select#employee-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmployeeFullNameInput(employeeFullName) {
    await this.employeeFullNameInput.sendKeys(employeeFullName);
  }

  async getEmployeeFullNameInput() {
    return this.employeeFullNameInput.getAttribute('value');
  }

  async setProfessionInput(profession) {
    await this.professionInput.sendKeys(profession);
  }

  async getProfessionInput() {
    return this.professionInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }
  async setBioInput(bio) {
    await this.bioInput.sendKeys(bio);
  }

  async getBioInput() {
    return this.bioInput.getAttribute('value');
  }

  async setProfilePhotoInput(profilePhoto) {
    await this.profilePhotoInput.sendKeys(profilePhoto);
  }

  async getProfilePhotoInput() {
    return this.profilePhotoInput.getAttribute('value');
  }

  async setProfilePhotoUrlInput(profilePhotoUrl) {
    await this.profilePhotoUrlInput.sendKeys(profilePhotoUrl);
  }

  async getProfilePhotoUrlInput() {
    return this.profilePhotoUrlInput.getAttribute('value');
  }

  getEnabledInput() {
    return this.enabledInput;
  }
  async setReasonInput(reason) {
    await this.reasonInput.sendKeys(reason);
  }

  async getReasonInput() {
    return this.reasonInput.getAttribute('value');
  }

  async setCreatedDateInput(createdDate) {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput() {
    return this.createdDateInput.getAttribute('value');
  }

  async setLastUpdatedDateInput(lastUpdatedDate) {
    await this.lastUpdatedDateInput.sendKeys(lastUpdatedDate);
  }

  async getLastUpdatedDateInput() {
    return this.lastUpdatedDateInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
    await this.setEmployeeFullNameInput('employeeFullName');
    expect(await this.getEmployeeFullNameInput()).to.match(/employeeFullName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setProfessionInput('profession');
    expect(await this.getProfessionInput()).to.match(/profession/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneInput('phone');
    expect(await this.getPhoneInput()).to.match(/phone/);
    await waitUntilDisplayed(this.saveButton);
    await this.genderSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setBioInput('bio');
    expect(await this.getBioInput()).to.match(/bio/);
    await waitUntilDisplayed(this.saveButton);
    await this.setProfilePhotoInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setProfilePhotoUrlInput('profilePhotoUrl');
    expect(await this.getProfilePhotoUrlInput()).to.match(/profilePhotoUrl/);
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
    await this.setReasonInput('reason');
    expect(await this.getReasonInput()).to.match(/reason/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
