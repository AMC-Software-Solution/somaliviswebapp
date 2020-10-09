import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ApplicantContactInfoUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.applicantContactInfo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  applicantsHomeAddressInput: ElementFinder = element(by.css('input#applicant-contact-info-applicantsHomeAddress'));
  telephoneNumberInput: ElementFinder = element(by.css('input#applicant-contact-info-telephoneNumber'));
  emailInput: ElementFinder = element(by.css('input#applicant-contact-info-email'));
  employerInput: ElementFinder = element(by.css('input#applicant-contact-info-employer'));
  employersAddressInput: ElementFinder = element(by.css('input#applicant-contact-info-employersAddress'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setApplicantsHomeAddressInput(applicantsHomeAddress) {
    await this.applicantsHomeAddressInput.sendKeys(applicantsHomeAddress);
  }

  async getApplicantsHomeAddressInput() {
    return this.applicantsHomeAddressInput.getAttribute('value');
  }

  async setTelephoneNumberInput(telephoneNumber) {
    await this.telephoneNumberInput.sendKeys(telephoneNumber);
  }

  async getTelephoneNumberInput() {
    return this.telephoneNumberInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setEmployerInput(employer) {
    await this.employerInput.sendKeys(employer);
  }

  async getEmployerInput() {
    return this.employerInput.getAttribute('value');
  }

  async setEmployersAddressInput(employersAddress) {
    await this.employersAddressInput.sendKeys(employersAddress);
  }

  async getEmployersAddressInput() {
    return this.employersAddressInput.getAttribute('value');
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
    await this.setApplicantsHomeAddressInput('applicantsHomeAddress');
    expect(await this.getApplicantsHomeAddressInput()).to.match(/applicantsHomeAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTelephoneNumberInput('telephoneNumber');
    expect(await this.getTelephoneNumberInput()).to.match(/telephoneNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('email');
    expect(await this.getEmailInput()).to.match(/email/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmployerInput('employer');
    expect(await this.getEmployerInput()).to.match(/employer/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmployersAddressInput('employersAddress');
    expect(await this.getEmployersAddressInput()).to.match(/employersAddress/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
