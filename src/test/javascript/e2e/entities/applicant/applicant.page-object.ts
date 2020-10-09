import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ApplicantUpdatePage from './applicant-update.page-object';

const expect = chai.expect;
export class ApplicantDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.applicant.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-applicant'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ApplicantComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('applicant-heading'));
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
    await navBarPage.getEntityPage('applicant');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateApplicant() {
    await this.createButton.click();
    return new ApplicantUpdatePage();
  }

  async deleteApplicant() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const applicantDeleteDialog = new ApplicantDeleteDialog();
    await waitUntilDisplayed(applicantDeleteDialog.deleteModal);
    expect(await applicantDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/somaliviswebappApp.applicant.delete.question/);
    await applicantDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(applicantDeleteDialog.deleteModal);

    expect(await isVisible(applicantDeleteDialog.deleteModal)).to.be.false;
  }
}
