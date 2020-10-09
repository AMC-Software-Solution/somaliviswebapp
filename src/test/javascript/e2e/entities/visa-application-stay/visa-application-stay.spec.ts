import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VisaApplicationStayComponentsPage from './visa-application-stay.page-object';
import VisaApplicationStayUpdatePage from './visa-application-stay-update.page-object';
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

describe('VisaApplicationStay e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let visaApplicationStayComponentsPage: VisaApplicationStayComponentsPage;
  let visaApplicationStayUpdatePage: VisaApplicationStayUpdatePage;

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
    visaApplicationStayComponentsPage = new VisaApplicationStayComponentsPage();
    visaApplicationStayComponentsPage = await visaApplicationStayComponentsPage.goToPage(navBarPage);
  });

  it('should load VisaApplicationStays', async () => {
    expect(await visaApplicationStayComponentsPage.title.getText()).to.match(/Visa Application Stays/);
    expect(await visaApplicationStayComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VisaApplicationStays', async () => {
    const beforeRecordsCount = (await isVisible(visaApplicationStayComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(visaApplicationStayComponentsPage.table);
    visaApplicationStayUpdatePage = await visaApplicationStayComponentsPage.goToCreateVisaApplicationStay();
    await visaApplicationStayUpdatePage.enterData();

    expect(await visaApplicationStayComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(visaApplicationStayComponentsPage.table);
    await waitUntilCount(visaApplicationStayComponentsPage.records, beforeRecordsCount + 1);
    expect(await visaApplicationStayComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await visaApplicationStayComponentsPage.deleteVisaApplicationStay();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(visaApplicationStayComponentsPage.records, beforeRecordsCount);
      expect(await visaApplicationStayComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(visaApplicationStayComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
