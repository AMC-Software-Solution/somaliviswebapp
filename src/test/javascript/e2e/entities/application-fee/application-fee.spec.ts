import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicationFeeComponentsPage from './application-fee.page-object';
import ApplicationFeeUpdatePage from './application-fee-update.page-object';
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

describe('ApplicationFee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicationFeeComponentsPage: ApplicationFeeComponentsPage;
  let applicationFeeUpdatePage: ApplicationFeeUpdatePage;

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
    applicationFeeComponentsPage = new ApplicationFeeComponentsPage();
    applicationFeeComponentsPage = await applicationFeeComponentsPage.goToPage(navBarPage);
  });

  it('should load ApplicationFees', async () => {
    expect(await applicationFeeComponentsPage.title.getText()).to.match(/Application Fees/);
    expect(await applicationFeeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ApplicationFees', async () => {
    const beforeRecordsCount = (await isVisible(applicationFeeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicationFeeComponentsPage.table);
    applicationFeeUpdatePage = await applicationFeeComponentsPage.goToCreateApplicationFee();
    await applicationFeeUpdatePage.enterData();

    expect(await applicationFeeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(applicationFeeComponentsPage.table);
    await waitUntilCount(applicationFeeComponentsPage.records, beforeRecordsCount + 1);
    expect(await applicationFeeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await applicationFeeComponentsPage.deleteApplicationFee();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(applicationFeeComponentsPage.records, beforeRecordsCount);
      expect(await applicationFeeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(applicationFeeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
