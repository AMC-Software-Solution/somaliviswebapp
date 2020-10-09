import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ApplicantTravelDocumentUpdatePage from './applicant-travel-document-update.page-object';

const expect = chai.expect;
export class ApplicantTravelDocumentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.applicantTravelDocument.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-applicantTravelDocument'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ApplicantTravelDocumentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('applicant-travel-document-heading'));
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
    await navBarPage.getEntityPage('applicant-travel-document');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateApplicantTravelDocument() {
    await this.createButton.click();
    return new ApplicantTravelDocumentUpdatePage();
  }

  async deleteApplicantTravelDocument() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const applicantTravelDocumentDeleteDialog = new ApplicantTravelDocumentDeleteDialog();
    await waitUntilDisplayed(applicantTravelDocumentDeleteDialog.deleteModal);
    expect(await applicantTravelDocumentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /somaliviswebappApp.applicantTravelDocument.delete.question/
    );
    await applicantTravelDocumentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(applicantTravelDocumentDeleteDialog.deleteModal);

    expect(await isVisible(applicantTravelDocumentDeleteDialog.deleteModal)).to.be.false;
  }
}
