import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ApplicantUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.applicant.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#applicant-title'));
  firstNameInput: ElementFinder = element(by.css('input#applicant-firstName'));
  middleNamesInput: ElementFinder = element(by.css('input#applicant-middleNames'));
  lastNameInput: ElementFinder = element(by.css('input#applicant-lastName'));
  fullNameInput: ElementFinder = element(by.css('input#applicant-fullName'));
  dateOfBirthInput: ElementFinder = element(by.css('input#applicant-dateOfBirth'));
  placeOfBirthInput: ElementFinder = element(by.css('input#applicant-placeOfBirth'));
  sexSelect: ElementFinder = element(by.css('select#applicant-sex'));
  maritalStatusSelect: ElementFinder = element(by.css('select#applicant-maritalStatus'));
  occupationInput: ElementFinder = element(by.css('input#applicant-occupation'));
  photoInput: ElementFinder = element(by.css('input#file_photo'));
  applicantContactInfoSelect: ElementFinder = element(by.css('select#applicant-applicantContactInfo'));
  nationalitySelect: ElementFinder = element(by.css('select#applicant-nationality'));
  countryOfBirthSelect: ElementFinder = element(by.css('select#applicant-countryOfBirth'));
  nationalityAtBirthSelect: ElementFinder = element(by.css('select#applicant-nationalityAtBirth'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setMiddleNamesInput(middleNames) {
    await this.middleNamesInput.sendKeys(middleNames);
  }

  async getMiddleNamesInput() {
    return this.middleNamesInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setFullNameInput(fullName) {
    await this.fullNameInput.sendKeys(fullName);
  }

  async getFullNameInput() {
    return this.fullNameInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth) {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput() {
    return this.dateOfBirthInput.getAttribute('value');
  }

  async setPlaceOfBirthInput(placeOfBirth) {
    await this.placeOfBirthInput.sendKeys(placeOfBirth);
  }

  async getPlaceOfBirthInput() {
    return this.placeOfBirthInput.getAttribute('value');
  }

  async setSexSelect(sex) {
    await this.sexSelect.sendKeys(sex);
  }

  async getSexSelect() {
    return this.sexSelect.element(by.css('option:checked')).getText();
  }

  async sexSelectLastOption() {
    await this.sexSelect.all(by.tagName('option')).last().click();
  }
  async setMaritalStatusSelect(maritalStatus) {
    await this.maritalStatusSelect.sendKeys(maritalStatus);
  }

  async getMaritalStatusSelect() {
    return this.maritalStatusSelect.element(by.css('option:checked')).getText();
  }

  async maritalStatusSelectLastOption() {
    await this.maritalStatusSelect.all(by.tagName('option')).last().click();
  }
  async setOccupationInput(occupation) {
    await this.occupationInput.sendKeys(occupation);
  }

  async getOccupationInput() {
    return this.occupationInput.getAttribute('value');
  }

  async setPhotoInput(photo) {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput() {
    return this.photoInput.getAttribute('value');
  }

  async applicantContactInfoSelectLastOption() {
    await this.applicantContactInfoSelect.all(by.tagName('option')).last().click();
  }

  async applicantContactInfoSelectOption(option) {
    await this.applicantContactInfoSelect.sendKeys(option);
  }

  getApplicantContactInfoSelect() {
    return this.applicantContactInfoSelect;
  }

  async getApplicantContactInfoSelectedOption() {
    return this.applicantContactInfoSelect.element(by.css('option:checked')).getText();
  }

  async nationalitySelectLastOption() {
    await this.nationalitySelect.all(by.tagName('option')).last().click();
  }

  async nationalitySelectOption(option) {
    await this.nationalitySelect.sendKeys(option);
  }

  getNationalitySelect() {
    return this.nationalitySelect;
  }

  async getNationalitySelectedOption() {
    return this.nationalitySelect.element(by.css('option:checked')).getText();
  }

  async countryOfBirthSelectLastOption() {
    await this.countryOfBirthSelect.all(by.tagName('option')).last().click();
  }

  async countryOfBirthSelectOption(option) {
    await this.countryOfBirthSelect.sendKeys(option);
  }

  getCountryOfBirthSelect() {
    return this.countryOfBirthSelect;
  }

  async getCountryOfBirthSelectedOption() {
    return this.countryOfBirthSelect.element(by.css('option:checked')).getText();
  }

  async nationalityAtBirthSelectLastOption() {
    await this.nationalityAtBirthSelect.all(by.tagName('option')).last().click();
  }

  async nationalityAtBirthSelectOption(option) {
    await this.nationalityAtBirthSelect.sendKeys(option);
  }

  getNationalityAtBirthSelect() {
    return this.nationalityAtBirthSelect;
  }

  async getNationalityAtBirthSelectedOption() {
    return this.nationalityAtBirthSelect.element(by.css('option:checked')).getText();
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
    await this.setTitleInput('title');
    expect(await this.getTitleInput()).to.match(/title/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMiddleNamesInput('middleNames');
    expect(await this.getMiddleNamesInput()).to.match(/middleNames/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFullNameInput('fullName');
    expect(await this.getFullNameInput()).to.match(/fullName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfBirthInput('01-01-2001');
    expect(await this.getDateOfBirthInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setPlaceOfBirthInput('placeOfBirth');
    expect(await this.getPlaceOfBirthInput()).to.match(/placeOfBirth/);
    await waitUntilDisplayed(this.saveButton);
    await this.sexSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.maritalStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setOccupationInput('occupation');
    expect(await this.getOccupationInput()).to.match(/occupation/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhotoInput(absolutePath);
    await this.applicantContactInfoSelectLastOption();
    await this.nationalitySelectLastOption();
    await this.countryOfBirthSelectLastOption();
    await this.nationalityAtBirthSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
