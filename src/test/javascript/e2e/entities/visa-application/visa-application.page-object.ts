import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VisaApplicationUpdatePage from './visa-application-update.page-object';

const expect = chai.expect;
export class VisaApplicationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.visaApplication.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-visaApplication'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VisaApplicationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('visa-application-heading'));
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
    await navBarPage.getEntityPage('visa-application');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVisaApplication() {
    await this.createButton.click();
    return new VisaApplicationUpdatePage();
  }

  async deleteVisaApplication() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const visaApplicationDeleteDialog = new VisaApplicationDeleteDialog();
    await waitUntilDisplayed(visaApplicationDeleteDialog.deleteModal);
    expect(await visaApplicationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /somaliviswebappApp.visaApplication.delete.question/
    );
    await visaApplicationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(visaApplicationDeleteDialog.deleteModal);

    expect(await isVisible(visaApplicationDeleteDialog.deleteModal)).to.be.false;
  }
}
