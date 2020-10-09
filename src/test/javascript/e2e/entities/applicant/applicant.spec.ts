import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicantComponentsPage from './applicant.page-object';
import ApplicantUpdatePage from './applicant-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Applicant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicantComponentsPage: ApplicantComponentsPage;
  let applicantUpdatePage: ApplicantUpdatePage;

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
    applicantComponentsPage = new ApplicantComponentsPage();
    applicantComponentsPage = await applicantComponentsPage.goToPage(navBarPage);
  });

  it('should load Applicants', async () => {
    expect(await applicantComponentsPage.title.getText()).to.match(/Applicants/);
    expect(await applicantComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Applicants', async () => {
    const beforeRecordsCount = (await isVisible(applicantComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicantComponentsPage.table);
    applicantUpdatePage = await applicantComponentsPage.goToCreateApplicant();
    await applicantUpdatePage.enterData();

    expect(await applicantComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(applicantComponentsPage.table);
    await waitUntilCount(applicantComponentsPage.records, beforeRecordsCount + 1);
    expect(await applicantComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await applicantComponentsPage.deleteApplicant();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(applicantComponentsPage.records, beforeRecordsCount);
      expect(await applicantComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(applicantComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
