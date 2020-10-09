import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicantTravelDocumentComponentsPage from './applicant-travel-document.page-object';
import ApplicantTravelDocumentUpdatePage from './applicant-travel-document-update.page-object';
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

describe('ApplicantTravelDocument e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicantTravelDocumentComponentsPage: ApplicantTravelDocumentComponentsPage;
  let applicantTravelDocumentUpdatePage: ApplicantTravelDocumentUpdatePage;

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
    applicantTravelDocumentComponentsPage = new ApplicantTravelDocumentComponentsPage();
    applicantTravelDocumentComponentsPage = await applicantTravelDocumentComponentsPage.goToPage(navBarPage);
  });

  it('should load ApplicantTravelDocuments', async () => {
    expect(await applicantTravelDocumentComponentsPage.title.getText()).to.match(/Applicant Travel Documents/);
    expect(await applicantTravelDocumentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ApplicantTravelDocuments', async () => {
    const beforeRecordsCount = (await isVisible(applicantTravelDocumentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicantTravelDocumentComponentsPage.table);
    applicantTravelDocumentUpdatePage = await applicantTravelDocumentComponentsPage.goToCreateApplicantTravelDocument();
    await applicantTravelDocumentUpdatePage.enterData();

    expect(await applicantTravelDocumentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(applicantTravelDocumentComponentsPage.table);
    await waitUntilCount(applicantTravelDocumentComponentsPage.records, beforeRecordsCount + 1);
    expect(await applicantTravelDocumentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await applicantTravelDocumentComponentsPage.deleteApplicantTravelDocument();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(applicantTravelDocumentComponentsPage.records, beforeRecordsCount);
      expect(await applicantTravelDocumentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(applicantTravelDocumentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
