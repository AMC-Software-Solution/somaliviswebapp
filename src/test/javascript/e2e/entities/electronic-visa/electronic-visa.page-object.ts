import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ElectronicVisaUpdatePage from './electronic-visa-update.page-object';

const expect = chai.expect;
export class ElectronicVisaDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.electronicVisa.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-electronicVisa'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ElectronicVisaComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('electronic-visa-heading'));
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
    await navBarPage.getEntityPage('electronic-visa');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateElectronicVisa() {
    await this.createButton.click();
    return new ElectronicVisaUpdatePage();
  }

  async deleteElectronicVisa() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const electronicVisaDeleteDialog = new ElectronicVisaDeleteDialog();
    await waitUntilDisplayed(electronicVisaDeleteDialog.deleteModal);
    expect(await electronicVisaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /somaliviswebappApp.electronicVisa.delete.question/
    );
    await electronicVisaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(electronicVisaDeleteDialog.deleteModal);

    expect(await isVisible(electronicVisaDeleteDialog.deleteModal)).to.be.false;
  }
}
