import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VisaApplicationUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.visaApplication.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  applicationNameInput: ElementFinder = element(by.css('input#visa-application-applicationName'));
  applicationCodeInput: ElementFinder = element(by.css('input#visa-application-applicationCode'));
  applicationDateInput: ElementFinder = element(by.css('input#visa-application-applicationDate'));
  applicationStatusSelect: ElementFinder = element(by.css('select#visa-application-applicationStatus'));
  travelPurposeSelect: ElementFinder = element(by.css('select#visa-application-travelPurpose'));
  visaTypeSelect: ElementFinder = element(by.css('select#visa-application-visaType'));
  travelModeSelect: ElementFinder = element(by.css('select#visa-application-travelMode'));
  portOfEntryInput: ElementFinder = element(by.css('input#visa-application-portOfEntry'));
  numberOfEntriesRequestedInput: ElementFinder = element(by.css('input#visa-application-numberOfEntriesRequested'));
  intendedDateOfArrivalInput: ElementFinder = element(by.css('input#visa-application-intendedDateOfArrival'));
  intendedDateOfDepartureInput: ElementFinder = element(by.css('input#visa-application-intendedDateOfDeparture'));
  validUntilInput: ElementFinder = element(by.css('input#visa-application-validUntil'));
  travelPurposeOtherInput: ElementFinder = element(by.css('input#visa-application-travelPurposeOther'));
  rejectReasonInput: ElementFinder = element(by.css('input#visa-application-rejectReason'));
  approvedDateInput: ElementFinder = element(by.css('input#visa-application-approvedDate'));
  visaApplicationStaySelect: ElementFinder = element(by.css('select#visa-application-visaApplicationStay'));
  applicationFeeSelect: ElementFinder = element(by.css('select#visa-application-applicationFee'));
  electronicVisaSelect: ElementFinder = element(by.css('select#visa-application-electronicVisa'));
  approvedBySelect: ElementFinder = element(by.css('select#visa-application-approvedBy'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setApplicationNameInput(applicationName) {
    await this.applicationNameInput.sendKeys(applicationName);
  }

  async getApplicationNameInput() {
    return this.applicationNameInput.getAttribute('value');
  }

  async setApplicationCodeInput(applicationCode) {
    await this.applicationCodeInput.sendKeys(applicationCode);
  }

  async getApplicationCodeInput() {
    return this.applicationCodeInput.getAttribute('value');
  }

  async setApplicationDateInput(applicationDate) {
    await this.applicationDateInput.sendKeys(applicationDate);
  }

  async getApplicationDateInput() {
    return this.applicationDateInput.getAttribute('value');
  }

  async setApplicationStatusSelect(applicationStatus) {
    await this.applicationStatusSelect.sendKeys(applicationStatus);
  }

  async getApplicationStatusSelect() {
    return this.applicationStatusSelect.element(by.css('option:checked')).getText();
  }

  async applicationStatusSelectLastOption() {
    await this.applicationStatusSelect.all(by.tagName('option')).last().click();
  }
  async setTravelPurposeSelect(travelPurpose) {
    await this.travelPurposeSelect.sendKeys(travelPurpose);
  }

  async getTravelPurposeSelect() {
    return this.travelPurposeSelect.element(by.css('option:checked')).getText();
  }

  async travelPurposeSelectLastOption() {
    await this.travelPurposeSelect.all(by.tagName('option')).last().click();
  }
  async setVisaTypeSelect(visaType) {
    await this.visaTypeSelect.sendKeys(visaType);
  }

  async getVisaTypeSelect() {
    return this.visaTypeSelect.element(by.css('option:checked')).getText();
  }

  async visaTypeSelectLastOption() {
    await this.visaTypeSelect.all(by.tagName('option')).last().click();
  }
  async setTravelModeSelect(travelMode) {
    await this.travelModeSelect.sendKeys(travelMode);
  }

  async getTravelModeSelect() {
    return this.travelModeSelect.element(by.css('option:checked')).getText();
  }

  async travelModeSelectLastOption() {
    await this.travelModeSelect.all(by.tagName('option')).last().click();
  }
  async setPortOfEntryInput(portOfEntry) {
    await this.portOfEntryInput.sendKeys(portOfEntry);
  }

  async getPortOfEntryInput() {
    return this.portOfEntryInput.getAttribute('value');
  }

  async setNumberOfEntriesRequestedInput(numberOfEntriesRequested) {
    await this.numberOfEntriesRequestedInput.sendKeys(numberOfEntriesRequested);
  }

  async getNumberOfEntriesRequestedInput() {
    return this.numberOfEntriesRequestedInput.getAttribute('value');
  }

  async setIntendedDateOfArrivalInput(intendedDateOfArrival) {
    await this.intendedDateOfArrivalInput.sendKeys(intendedDateOfArrival);
  }

  async getIntendedDateOfArrivalInput() {
    return this.intendedDateOfArrivalInput.getAttribute('value');
  }

  async setIntendedDateOfDepartureInput(intendedDateOfDeparture) {
    await this.intendedDateOfDepartureInput.sendKeys(intendedDateOfDeparture);
  }

  async getIntendedDateOfDepartureInput() {
    return this.intendedDateOfDepartureInput.getAttribute('value');
  }

  async setValidUntilInput(validUntil) {
    await this.validUntilInput.sendKeys(validUntil);
  }

  async getValidUntilInput() {
    return this.validUntilInput.getAttribute('value');
  }

  async setTravelPurposeOtherInput(travelPurposeOther) {
    await this.travelPurposeOtherInput.sendKeys(travelPurposeOther);
  }

  async getTravelPurposeOtherInput() {
    return this.travelPurposeOtherInput.getAttribute('value');
  }

  async setRejectReasonInput(rejectReason) {
    await this.rejectReasonInput.sendKeys(rejectReason);
  }

  async getRejectReasonInput() {
    return this.rejectReasonInput.getAttribute('value');
  }

  async setApprovedDateInput(approvedDate) {
    await this.approvedDateInput.sendKeys(approvedDate);
  }

  async getApprovedDateInput() {
    return this.approvedDateInput.getAttribute('value');
  }

  async visaApplicationStaySelectLastOption() {
    await this.visaApplicationStaySelect.all(by.tagName('option')).last().click();
  }

  async visaApplicationStaySelectOption(option) {
    await this.visaApplicationStaySelect.sendKeys(option);
  }

  getVisaApplicationStaySelect() {
    return this.visaApplicationStaySelect;
  }

  async getVisaApplicationStaySelectedOption() {
    return this.visaApplicationStaySelect.element(by.css('option:checked')).getText();
  }

  async applicationFeeSelectLastOption() {
    await this.applicationFeeSelect.all(by.tagName('option')).last().click();
  }

  async applicationFeeSelectOption(option) {
    await this.applicationFeeSelect.sendKeys(option);
  }

  getApplicationFeeSelect() {
    return this.applicationFeeSelect;
  }

  async getApplicationFeeSelectedOption() {
    return this.applicationFeeSelect.element(by.css('option:checked')).getText();
  }

  async electronicVisaSelectLastOption() {
    await this.electronicVisaSelect.all(by.tagName('option')).last().click();
  }

  async electronicVisaSelectOption(option) {
    await this.electronicVisaSelect.sendKeys(option);
  }

  getElectronicVisaSelect() {
    return this.electronicVisaSelect;
  }

  async getElectronicVisaSelectedOption() {
    return this.electronicVisaSelect.element(by.css('option:checked')).getText();
  }

  async approvedBySelectLastOption() {
    await this.approvedBySelect.all(by.tagName('option')).last().click();
  }

  async approvedBySelectOption(option) {
    await this.approvedBySelect.sendKeys(option);
  }

  getApprovedBySelect() {
    return this.approvedBySelect;
  }

  async getApprovedBySelectedOption() {
    return this.approvedBySelect.element(by.css('option:checked')).getText();
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
    await this.setApplicationNameInput('applicationName');
    expect(await this.getApplicationNameInput()).to.match(/applicationName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setApplicationCodeInput('applicationCode');
    expect(await this.getApplicationCodeInput()).to.match(/applicationCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setApplicationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getApplicationDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.applicationStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.travelPurposeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.visaTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.travelModeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setPortOfEntryInput('portOfEntry');
    expect(await this.getPortOfEntryInput()).to.match(/portOfEntry/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNumberOfEntriesRequestedInput('numberOfEntriesRequested');
    expect(await this.getNumberOfEntriesRequestedInput()).to.match(/numberOfEntriesRequested/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIntendedDateOfArrivalInput('01-01-2001');
    expect(await this.getIntendedDateOfArrivalInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setIntendedDateOfDepartureInput('01-01-2001');
    expect(await this.getIntendedDateOfDepartureInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setValidUntilInput('01-01-2001');
    expect(await this.getValidUntilInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setTravelPurposeOtherInput('travelPurposeOther');
    expect(await this.getTravelPurposeOtherInput()).to.match(/travelPurposeOther/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRejectReasonInput('rejectReason');
    expect(await this.getRejectReasonInput()).to.match(/rejectReason/);
    await waitUntilDisplayed(this.saveButton);
    await this.setApprovedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getApprovedDateInput()).to.contain('2001-01-01T02:30');
    await this.visaApplicationStaySelectLastOption();
    await this.applicationFeeSelectLastOption();
    await this.electronicVisaSelectLastOption();
    await this.approvedBySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
