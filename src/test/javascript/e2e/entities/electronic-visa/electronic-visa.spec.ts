import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ElectronicVisaComponentsPage from './electronic-visa.page-object';
import ElectronicVisaUpdatePage from './electronic-visa-update.page-object';
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

describe('ElectronicVisa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let electronicVisaComponentsPage: ElectronicVisaComponentsPage;
  let electronicVisaUpdatePage: ElectronicVisaUpdatePage;

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
    electronicVisaComponentsPage = new ElectronicVisaComponentsPage();
    electronicVisaComponentsPage = await electronicVisaComponentsPage.goToPage(navBarPage);
  });

  it('should load ElectronicVisas', async () => {
    expect(await electronicVisaComponentsPage.title.getText()).to.match(/Electronic Visas/);
    expect(await electronicVisaComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ElectronicVisas', async () => {
    const beforeRecordsCount = (await isVisible(electronicVisaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(electronicVisaComponentsPage.table);
    electronicVisaUpdatePage = await electronicVisaComponentsPage.goToCreateElectronicVisa();
    await electronicVisaUpdatePage.enterData();

    expect(await electronicVisaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(electronicVisaComponentsPage.table);
    await waitUntilCount(electronicVisaComponentsPage.records, beforeRecordsCount + 1);
    expect(await electronicVisaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await electronicVisaComponentsPage.deleteElectronicVisa();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(electronicVisaComponentsPage.records, beforeRecordsCount);
      expect(await electronicVisaComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(electronicVisaComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
