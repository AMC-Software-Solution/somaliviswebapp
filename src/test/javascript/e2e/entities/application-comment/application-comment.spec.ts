import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicationCommentComponentsPage from './application-comment.page-object';
import ApplicationCommentUpdatePage from './application-comment-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('ApplicationComment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicationCommentComponentsPage: ApplicationCommentComponentsPage;
  let applicationCommentUpdatePage: ApplicationCommentUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    applicationCommentComponentsPage = new ApplicationCommentComponentsPage();
    applicationCommentComponentsPage = await applicationCommentComponentsPage.goToPage(navBarPage);
  });

  it('should load ApplicationComments', async () => {
    expect(await applicationCommentComponentsPage.title.getText()).to.match(/Application Comments/);
    expect(await applicationCommentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ApplicationComments', async () => {
    const beforeRecordsCount = (await isVisible(applicationCommentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicationCommentComponentsPage.table);
    applicationCommentUpdatePage = await applicationCommentComponentsPage.goToCreateApplicationComment();
    await applicationCommentUpdatePage.enterData();

    expect(await applicationCommentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(applicationCommentComponentsPage.table);
    await waitUntilCount(applicationCommentComponentsPage.records, beforeRecordsCount + 1);
    expect(await applicationCommentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await applicationCommentComponentsPage.deleteApplicationComment();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(applicationCommentComponentsPage.records, beforeRecordsCount);
      expect(await applicationCommentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(applicationCommentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
