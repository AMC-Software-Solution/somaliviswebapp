import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ElectronicVisaUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.electronicVisa.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#electronic-visa-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#electronic-visa-lastName'));
  visaNumberInput: ElementFinder = element(by.css('input#electronic-visa-visaNumber'));
  barcodeInput: ElementFinder = element(by.css('input#electronic-visa-barcode'));
  nationalityInput: ElementFinder = element(by.css('input#electronic-visa-nationality'));
  placeOfBirthInput: ElementFinder = element(by.css('input#electronic-visa-placeOfBirth'));
  travelDocumentInput: ElementFinder = element(by.css('input#electronic-visa-travelDocument'));
  travelDocumentIssueDateInput: ElementFinder = element(by.css('input#electronic-visa-travelDocumentIssueDate'));
  travelDocumentExpiryDateInput: ElementFinder = element(by.css('input#electronic-visa-travelDocumentExpiryDate'));
  travelPurposeInput: ElementFinder = element(by.css('input#electronic-visa-travelPurpose'));
  visaValidFromInput: ElementFinder = element(by.css('input#electronic-visa-visaValidFrom'));
  visaValidUntilInput: ElementFinder = element(by.css('input#electronic-visa-visaValidUntil'));
  visaValidityTypeInput: ElementFinder = element(by.css('input#electronic-visa-visaValidityType'));
  visaTypeInput: ElementFinder = element(by.css('input#electronic-visa-visaType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setVisaNumberInput(visaNumber) {
    await this.visaNumberInput.sendKeys(visaNumber);
  }

  async getVisaNumberInput() {
    return this.visaNumberInput.getAttribute('value');
  }

  async setBarcodeInput(barcode) {
    await this.barcodeInput.sendKeys(barcode);
  }

  async getBarcodeInput() {
    return this.barcodeInput.getAttribute('value');
  }

  async setNationalityInput(nationality) {
    await this.nationalityInput.sendKeys(nationality);
  }

  async getNationalityInput() {
    return this.nationalityInput.getAttribute('value');
  }

  async setPlaceOfBirthInput(placeOfBirth) {
    await this.placeOfBirthInput.sendKeys(placeOfBirth);
  }

  async getPlaceOfBirthInput() {
    return this.placeOfBirthInput.getAttribute('value');
  }

  async setTravelDocumentInput(travelDocument) {
    await this.travelDocumentInput.sendKeys(travelDocument);
  }

  async getTravelDocumentInput() {
    return this.travelDocumentInput.getAttribute('value');
  }

  async setTravelDocumentIssueDateInput(travelDocumentIssueDate) {
    await this.travelDocumentIssueDateInput.sendKeys(travelDocumentIssueDate);
  }

  async getTravelDocumentIssueDateInput() {
    return this.travelDocumentIssueDateInput.getAttribute('value');
  }

  async setTravelDocumentExpiryDateInput(travelDocumentExpiryDate) {
    await this.travelDocumentExpiryDateInput.sendKeys(travelDocumentExpiryDate);
  }

  async getTravelDocumentExpiryDateInput() {
    return this.travelDocumentExpiryDateInput.getAttribute('value');
  }

  async setTravelPurposeInput(travelPurpose) {
    await this.travelPurposeInput.sendKeys(travelPurpose);
  }

  async getTravelPurposeInput() {
    return this.travelPurposeInput.getAttribute('value');
  }

  async setVisaValidFromInput(visaValidFrom) {
    await this.visaValidFromInput.sendKeys(visaValidFrom);
  }

  async getVisaValidFromInput() {
    return this.visaValidFromInput.getAttribute('value');
  }

  async setVisaValidUntilInput(visaValidUntil) {
    await this.visaValidUntilInput.sendKeys(visaValidUntil);
  }

  async getVisaValidUntilInput() {
    return this.visaValidUntilInput.getAttribute('value');
  }

  async setVisaValidityTypeInput(visaValidityType) {
    await this.visaValidityTypeInput.sendKeys(visaValidityType);
  }

  async getVisaValidityTypeInput() {
    return this.visaValidityTypeInput.getAttribute('value');
  }

  async setVisaTypeInput(visaType) {
    await this.visaTypeInput.sendKeys(visaType);
  }

  async getVisaTypeInput() {
    return this.visaTypeInput.getAttribute('value');
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
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVisaNumberInput('visaNumber');
    expect(await this.getVisaNumberInput()).to.match(/visaNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBarcodeInput('barcode');
    expect(await this.getBarcodeInput()).to.match(/barcode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNationalityInput('nationality');
    expect(await this.getNationalityInput()).to.match(/nationality/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPlaceOfBirthInput('placeOfBirth');
    expect(await this.getPlaceOfBirthInput()).to.match(/placeOfBirth/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTravelDocumentInput('travelDocument');
    expect(await this.getTravelDocumentInput()).to.match(/travelDocument/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTravelDocumentIssueDateInput('01-01-2001');
    expect(await this.getTravelDocumentIssueDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setTravelDocumentExpiryDateInput('01-01-2001');
    expect(await this.getTravelDocumentExpiryDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setTravelPurposeInput('travelPurpose');
    expect(await this.getTravelPurposeInput()).to.match(/travelPurpose/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVisaValidFromInput('01-01-2001');
    expect(await this.getVisaValidFromInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setVisaValidUntilInput('01-01-2001');
    expect(await this.getVisaValidUntilInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setVisaValidityTypeInput('visaValidityType');
    expect(await this.getVisaValidityTypeInput()).to.match(/visaValidityType/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVisaTypeInput('visaType');
    expect(await this.getVisaTypeInput()).to.match(/visaType/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
