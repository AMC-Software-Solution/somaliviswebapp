import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AppSettingComponentsPage from './app-setting.page-object';
import AppSettingUpdatePage from './app-setting-update.page-object';
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

describe('AppSetting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appSettingComponentsPage: AppSettingComponentsPage;
  let appSettingUpdatePage: AppSettingUpdatePage;

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
    appSettingComponentsPage = new AppSettingComponentsPage();
    appSettingComponentsPage = await appSettingComponentsPage.goToPage(navBarPage);
  });

  it('should load AppSettings', async () => {
    expect(await appSettingComponentsPage.title.getText()).to.match(/App Settings/);
    expect(await appSettingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete AppSettings', async () => {
    const beforeRecordsCount = (await isVisible(appSettingComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(appSettingComponentsPage.table);
    appSettingUpdatePage = await appSettingComponentsPage.goToCreateAppSetting();
    await appSettingUpdatePage.enterData();

    expect(await appSettingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(appSettingComponentsPage.table);
    await waitUntilCount(appSettingComponentsPage.records, beforeRecordsCount + 1);
    expect(await appSettingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await appSettingComponentsPage.deleteAppSetting();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(appSettingComponentsPage.records, beforeRecordsCount);
      expect(await appSettingComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(appSettingComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
