import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AppSettingUpdatePage from './app-setting-update.page-object';

const expect = chai.expect;
export class AppSettingDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('somaliviswebappApp.appSetting.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-appSetting'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AppSettingComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('app-setting-heading'));
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
    await navBarPage.getEntityPage('app-setting');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAppSetting() {
    await this.createButton.click();
    return new AppSettingUpdatePage();
  }

  async deleteAppSetting() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const appSettingDeleteDialog = new AppSettingDeleteDialog();
    await waitUntilDisplayed(appSettingDeleteDialog.deleteModal);
    expect(await appSettingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/somaliviswebappApp.appSetting.delete.question/);
    await appSettingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(appSettingDeleteDialog.deleteModal);

    expect(await isVisible(appSettingDeleteDialog.deleteModal)).to.be.false;
  }
}
