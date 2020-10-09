import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VisaApplicationStayUpdatePage from './visa-application-stay-update.page-object';

const expect = chai.expect;
export class VisaApplicationStayDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.visaApplicationStay.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-visaApplicationStay'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VisaApplicationStayComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('visa-application-stay-heading'));
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
    await navBarPage.getEntityPage('visa-application-stay');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVisaApplicationStay() {
    await this.createButton.click();
    return new VisaApplicationStayUpdatePage();
  }

  async deleteVisaApplicationStay() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const visaApplicationStayDeleteDialog = new VisaApplicationStayDeleteDialog();
    await waitUntilDisplayed(visaApplicationStayDeleteDialog.deleteModal);
    expect(await visaApplicationStayDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /somaliviswebappApp.visaApplicationStay.delete.question/
    );
    await visaApplicationStayDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(visaApplicationStayDeleteDialog.deleteModal);

    expect(await isVisible(visaApplicationStayDeleteDialog.deleteModal)).to.be.false;
  }
}
