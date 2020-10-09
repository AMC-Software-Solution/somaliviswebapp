import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VisaApplicationComponentsPage from './visa-application.page-object';
import VisaApplicationUpdatePage from './visa-application-update.page-object';
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

describe('VisaApplication e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let visaApplicationComponentsPage: VisaApplicationComponentsPage;
  let visaApplicationUpdatePage: VisaApplicationUpdatePage;

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
    visaApplicationComponentsPage = new VisaApplicationComponentsPage();
    visaApplicationComponentsPage = await visaApplicationComponentsPage.goToPage(navBarPage);
  });

  it('should load VisaApplications', async () => {
    expect(await visaApplicationComponentsPage.title.getText()).to.match(/Visa Applications/);
    expect(await visaApplicationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VisaApplications', async () => {
    const beforeRecordsCount = (await isVisible(visaApplicationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(visaApplicationComponentsPage.table);
    visaApplicationUpdatePage = await visaApplicationComponentsPage.goToCreateVisaApplication();
    await visaApplicationUpdatePage.enterData();

    expect(await visaApplicationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(visaApplicationComponentsPage.table);
    await waitUntilCount(visaApplicationComponentsPage.records, beforeRecordsCount + 1);
    expect(await visaApplicationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await visaApplicationComponentsPage.deleteVisaApplication();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(visaApplicationComponentsPage.records, beforeRecordsCount);
      expect(await visaApplicationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(visaApplicationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
