import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ApplicantContactInfoUpdatePage from './applicant-contact-info-update.page-object';

const expect = chai.expect;
export class ApplicantContactInfoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.applicantContactInfo.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-applicantContactInfo'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ApplicantContactInfoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('applicant-contact-info-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('applicant-contact-info');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateApplicantContactInfo() {
    await this.createButton.click();
    return new ApplicantContactInfoUpdatePage();
  }

  async deleteApplicantContactInfo() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const applicantContactInfoDeleteDialog = new ApplicantContactInfoDeleteDialog();
    await waitUntilDisplayed(applicantContactInfoDeleteDialog.deleteModal);
    expect(await applicantContactInfoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /somaliviswebappApp.applicantContactInfo.delete.question/
    );
    await applicantContactInfoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(applicantContactInfoDeleteDialog.deleteModal);

    expect(await isVisible(applicantContactInfoDeleteDialog.deleteModal)).to.be.false;
  }
}
