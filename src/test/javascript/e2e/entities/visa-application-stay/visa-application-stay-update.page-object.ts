import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VisaApplicationStayUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.visaApplicationStay.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  durationOfProposedStayInDaysInput: ElementFinder = element(by.css('input#visa-application-stay-durationOfProposedStayInDays'));
  nameOfHostingPersonOrcompanyInput: ElementFinder = element(by.css('input#visa-application-stay-nameOfHostingPersonOrcompany'));
  stayingLocationNameInput: ElementFinder = element(by.css('input#visa-application-stay-stayingLocationName'));
  stayLocationFullAddressInput: ElementFinder = element(by.css('input#visa-application-stay-stayLocationFullAddress'));
  stayLocationTelephoneNumberInput: ElementFinder = element(by.css('input#visa-application-stay-stayLocationTelephoneNumber'));
  stayLocationEmailInput: ElementFinder = element(by.css('input#visa-application-stay-stayLocationEmail'));
  whoCoversCostOfApplicantsStayInput: ElementFinder = element(by.css('input#visa-application-stay-whoCoversCostOfApplicantsStay'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDurationOfProposedStayInDaysInput(durationOfProposedStayInDays) {
    await this.durationOfProposedStayInDaysInput.sendKeys(durationOfProposedStayInDays);
  }

  async getDurationOfProposedStayInDaysInput() {
    return this.durationOfProposedStayInDaysInput.getAttribute('value');
  }

  async setNameOfHostingPersonOrcompanyInput(nameOfHostingPersonOrcompany) {
    await this.nameOfHostingPersonOrcompanyInput.sendKeys(nameOfHostingPersonOrcompany);
  }

  async getNameOfHostingPersonOrcompanyInput() {
    return this.nameOfHostingPersonOrcompanyInput.getAttribute('value');
  }

  async setStayingLocationNameInput(stayingLocationName) {
    await this.stayingLocationNameInput.sendKeys(stayingLocationName);
  }

  async getStayingLocationNameInput() {
    return this.stayingLocationNameInput.getAttribute('value');
  }

  async setStayLocationFullAddressInput(stayLocationFullAddress) {
    await this.stayLocationFullAddressInput.sendKeys(stayLocationFullAddress);
  }

  async getStayLocationFullAddressInput() {
    return this.stayLocationFullAddressInput.getAttribute('value');
  }

  async setStayLocationTelephoneNumberInput(stayLocationTelephoneNumber) {
    await this.stayLocationTelephoneNumberInput.sendKeys(stayLocationTelephoneNumber);
  }

  async getStayLocationTelephoneNumberInput() {
    return this.stayLocationTelephoneNumberInput.getAttribute('value');
  }

  async setStayLocationEmailInput(stayLocationEmail) {
    await this.stayLocationEmailInput.sendKeys(stayLocationEmail);
  }

  async getStayLocationEmailInput() {
    return this.stayLocationEmailInput.getAttribute('value');
  }

  async setWhoCoversCostOfApplicantsStayInput(whoCoversCostOfApplicantsStay) {
    await this.whoCoversCostOfApplicantsStayInput.sendKeys(whoCoversCostOfApplicantsStay);
  }

  async getWhoCoversCostOfApplicantsStayInput() {
    return this.whoCoversCostOfApplicantsStayInput.getAttribute('value');
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
    await this.setDurationOfProposedStayInDaysInput('5');
    expect(await this.getDurationOfProposedStayInDaysInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setNameOfHostingPersonOrcompanyInput('nameOfHostingPersonOrcompany');
    expect(await this.getNameOfHostingPersonOrcompanyInput()).to.match(/nameOfHostingPersonOrcompany/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStayingLocationNameInput('stayingLocationName');
    expect(await this.getStayingLocationNameInput()).to.match(/stayingLocationName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStayLocationFullAddressInput('stayLocationFullAddress');
    expect(await this.getStayLocationFullAddressInput()).to.match(/stayLocationFullAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStayLocationTelephoneNumberInput('stayLocationTelephoneNumber');
    expect(await this.getStayLocationTelephoneNumberInput()).to.match(/stayLocationTelephoneNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStayLocationEmailInput('stayLocationEmail');
    expect(await this.getStayLocationEmailInput()).to.match(/stayLocationEmail/);
    await waitUntilDisplayed(this.saveButton);
    await this.setWhoCoversCostOfApplicantsStayInput('whoCoversCostOfApplicantsStay');
    expect(await this.getWhoCoversCostOfApplicantsStayInput()).to.match(/whoCoversCostOfApplicantsStay/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
