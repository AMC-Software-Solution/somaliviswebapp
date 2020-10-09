import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicantContactInfoComponentsPage from './applicant-contact-info.page-object';
import ApplicantContactInfoUpdatePage from './applicant-contact-info-update.page-object';
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

describe('ApplicantContactInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicantContactInfoComponentsPage: ApplicantContactInfoComponentsPage;
  let applicantContactInfoUpdatePage: ApplicantContactInfoUpdatePage;

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
    applicantContactInfoComponentsPage = new ApplicantContactInfoComponentsPage();
    applicantContactInfoComponentsPage = await applicantContactInfoComponentsPage.goToPage(navBarPage);
  });

  it('should load ApplicantContactInfos', async () => {
    expect(await applicantContactInfoComponentsPage.title.getText()).to.match(/Applicant Contact Infos/);
    expect(await applicantContactInfoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ApplicantContactInfos', async () => {
    const beforeRecordsCount = (await isVisible(applicantContactInfoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicantContactInfoComponentsPage.table);
    applicantContactInfoUpdatePage = await applicantContactInfoComponentsPage.goToCreateApplicantContactInfo();
    await applicantContactInfoUpdatePage.enterData();

    expect(await applicantContactInfoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(applicantContactInfoComponentsPage.table);
    await waitUntilCount(applicantContactInfoComponentsPage.records, beforeRecordsCount + 1);
    expect(await applicantContactInfoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await applicantContactInfoComponentsPage.deleteApplicantContactInfo();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(applicantContactInfoComponentsPage.records, beforeRecordsCount);
      expect(await applicantContactInfoComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(applicantContactInfoComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
