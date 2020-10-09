import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ApplicantTravelDocumentUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.applicantTravelDocument.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  documentNumberInput: ElementFinder = element(by.css('input#applicant-travel-document-documentNumber'));
  dateOfIssueInput: ElementFinder = element(by.css('input#applicant-travel-document-dateOfIssue'));
  expiryDateInput: ElementFinder = element(by.css('input#applicant-travel-document-expiryDate'));
  issuingAuthorityInput: ElementFinder = element(by.css('input#applicant-travel-document-issuingAuthority'));
  documentPhotoInput: ElementFinder = element(by.css('input#file_documentPhoto'));
  typeOfDocumentSelect: ElementFinder = element(by.css('select#applicant-travel-document-typeOfDocument'));
  applicantSelect: ElementFinder = element(by.css('select#applicant-travel-document-applicant'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDocumentNumberInput(documentNumber) {
    await this.documentNumberInput.sendKeys(documentNumber);
  }

  async getDocumentNumberInput() {
    return this.documentNumberInput.getAttribute('value');
  }

  async setDateOfIssueInput(dateOfIssue) {
    await this.dateOfIssueInput.sendKeys(dateOfIssue);
  }

  async getDateOfIssueInput() {
    return this.dateOfIssueInput.getAttribute('value');
  }

  async setExpiryDateInput(expiryDate) {
    await this.expiryDateInput.sendKeys(expiryDate);
  }

  async getExpiryDateInput() {
    return this.expiryDateInput.getAttribute('value');
  }

  async setIssuingAuthorityInput(issuingAuthority) {
    await this.issuingAuthorityInput.sendKeys(issuingAuthority);
  }

  async getIssuingAuthorityInput() {
    return this.issuingAuthorityInput.getAttribute('value');
  }

  async setDocumentPhotoInput(documentPhoto) {
    await this.documentPhotoInput.sendKeys(documentPhoto);
  }

  async getDocumentPhotoInput() {
    return this.documentPhotoInput.getAttribute('value');
  }

  async setTypeOfDocumentSelect(typeOfDocument) {
    await this.typeOfDocumentSelect.sendKeys(typeOfDocument);
  }

  async getTypeOfDocumentSelect() {
    return this.typeOfDocumentSelect.element(by.css('option:checked')).getText();
  }

  async typeOfDocumentSelectLastOption() {
    await this.typeOfDocumentSelect.all(by.tagName('option')).last().click();
  }
  async applicantSelectLastOption() {
    await this.applicantSelect.all(by.tagName('option')).last().click();
  }

  async applicantSelectOption(option) {
    await this.applicantSelect.sendKeys(option);
  }

  getApplicantSelect() {
    return this.applicantSelect;
  }

  async getApplicantSelectedOption() {
    return this.applicantSelect.element(by.css('option:checked')).getText();
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
    await this.setDocumentNumberInput('documentNumber');
    expect(await this.getDocumentNumberInput()).to.match(/documentNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfIssueInput('01-01-2001');
    expect(await this.getDateOfIssueInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setExpiryDateInput('01-01-2001');
    expect(await this.getExpiryDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setIssuingAuthorityInput('issuingAuthority');
    expect(await this.getIssuingAuthorityInput()).to.match(/issuingAuthority/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDocumentPhotoInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.typeOfDocumentSelectLastOption();
    await this.applicantSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
