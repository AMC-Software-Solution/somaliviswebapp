import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ApplicationCommentUpdatePage {
  pageTitle: ElementFinder = element(by.id('somaliviswebappApp.applicationComment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#application-comment-title'));
  commentInput: ElementFinder = element(by.css('input#application-comment-comment'));
  commentDateInput: ElementFinder = element(by.css('input#application-comment-commentDate'));
  commenterTypeSelect: ElementFinder = element(by.css('select#application-comment-commenterType'));
  visaApplicationSelect: ElementFinder = element(by.css('select#application-comment-visaApplication'));
  commentedBySelect: ElementFinder = element(by.css('select#application-comment-commentedBy'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return this.commentInput.getAttribute('value');
  }

  async setCommentDateInput(commentDate) {
    await this.commentDateInput.sendKeys(commentDate);
  }

  async getCommentDateInput() {
    return this.commentDateInput.getAttribute('value');
  }

  async setCommenterTypeSelect(commenterType) {
    await this.commenterTypeSelect.sendKeys(commenterType);
  }

  async getCommenterTypeSelect() {
    return this.commenterTypeSelect.element(by.css('option:checked')).getText();
  }

  async commenterTypeSelectLastOption() {
    await this.commenterTypeSelect.all(by.tagName('option')).last().click();
  }
  async visaApplicationSelectLastOption() {
    await this.visaApplicationSelect.all(by.tagName('option')).last().click();
  }

  async visaApplicationSelectOption(option) {
    await this.visaApplicationSelect.sendKeys(option);
  }

  getVisaApplicationSelect() {
    return this.visaApplicationSelect;
  }

  async getVisaApplicationSelectedOption() {
    return this.visaApplicationSelect.element(by.css('option:checked')).getText();
  }

  async commentedBySelectLastOption() {
    await this.commentedBySelect.all(by.tagName('option')).last().click();
  }

  async commentedBySelectOption(option) {
    await this.commentedBySelect.sendKeys(option);
  }

  getCommentedBySelect() {
    return this.commentedBySelect;
  }

  async getCommentedBySelectedOption() {
    return this.commentedBySelect.element(by.css('option:checked')).getText();
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
    await this.setTitleInput('title');
    expect(await this.getTitleInput()).to.match(/title/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentInput('comment');
    expect(await this.getCommentInput()).to.match(/comment/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCommentDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.commenterTypeSelectLastOption();
    await this.visaApplicationSelectLastOption();
    await this.commentedBySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
