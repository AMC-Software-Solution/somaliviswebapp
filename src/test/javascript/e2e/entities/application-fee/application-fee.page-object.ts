import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ApplicationFeeUpdatePage from './application-fee-update.page-object';

const expect = chai.expect;
export class ApplicationFeeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.applicationFee.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-applicationFee'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ApplicationFeeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('application-fee-heading'));
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
    await navBarPage.getEntityPage('application-fee');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateApplicationFee() {
    await this.createButton.click();
    return new ApplicationFeeUpdatePage();
  }

  async deleteApplicationFee() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const applicationFeeDeleteDialog = new ApplicationFeeDeleteDialog();
    await waitUntilDisplayed(applicationFeeDeleteDialog.deleteModal);
    expect(await applicationFeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /somaliviswebappApp.applicationFee.delete.question/
    );
    await applicationFeeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(applicationFeeDeleteDialog.deleteModal);

    expect(await isVisible(applicationFeeDeleteDialog.deleteModal)).to.be.false;
  }
}
