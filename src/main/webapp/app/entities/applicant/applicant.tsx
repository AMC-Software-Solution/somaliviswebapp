import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './applicant.reducer';
import { IApplicant } from 'app/shared/model/applicant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IApplicantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Applicant = (props: IApplicantProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { applicantList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="applicant-heading">
        <Translate contentKey="somaliviswebappApp.applicant.home.title">Applicants</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="somaliviswebappApp.applicant.home.createLabel">Create new Applicant</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {applicantList && applicantList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('title')}>
                  <Translate contentKey="somaliviswebappApp.applicant.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  <Translate contentKey="somaliviswebappApp.applicant.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('middleNames')}>
                  <Translate contentKey="somaliviswebappApp.applicant.middleNames">Middle Names</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  <Translate contentKey="somaliviswebappApp.applicant.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fullName')}>
                  <Translate contentKey="somaliviswebappApp.applicant.fullName">Full Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateOfBirth')}>
                  <Translate contentKey="somaliviswebappApp.applicant.dateOfBirth">Date Of Birth</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('placeOfBirth')}>
                  <Translate contentKey="somaliviswebappApp.applicant.placeOfBirth">Place Of Birth</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sex')}>
                  <Translate contentKey="somaliviswebappApp.applicant.sex">Sex</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('maritalStatus')}>
                  <Translate contentKey="somaliviswebappApp.applicant.maritalStatus">Marital Status</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('occupation')}>
                  <Translate contentKey="somaliviswebappApp.applicant.occupation">Occupation</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photo')}>
                  <Translate contentKey="somaliviswebappApp.applicant.photo">Photo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.applicant.applicantContactInfo">Applicant Contact Info</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.applicant.nationality">Nationality</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.applicant.countryOfBirth">Country Of Birth</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.applicant.nationalityAtBirth">Nationality At Birth</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {applicantList.map((applicant, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${applicant.id}`} color="link" size="sm">
                      {applicant.id}
                    </Button>
                  </td>
                  <td>{applicant.title}</td>
                  <td>{applicant.firstName}</td>
                  <td>{applicant.middleNames}</td>
                  <td>{applicant.lastName}</td>
                  <td>{applicant.fullName}</td>
                  <td>
                    {applicant.dateOfBirth ? <TextFormat type="date" value={applicant.dateOfBirth} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{applicant.placeOfBirth}</td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.Gender.${applicant.sex}`} />
                  </td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.MaritalStatus.${applicant.maritalStatus}`} />
                  </td>
                  <td>{applicant.occupation}</td>
                  <td>
                    {applicant.photo ? (
                      <div>
                        {applicant.photoContentType ? (
                          <a onClick={openFile(applicant.photoContentType, applicant.photo)}>
                            <img src={`data:${applicant.photoContentType};base64,${applicant.photo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {applicant.photoContentType}, {byteSize(applicant.photo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {applicant.applicantContactInfoEmail ? (
                      <Link to={`applicant-contact-info/${applicant.applicantContactInfoId}`}>{applicant.applicantContactInfoEmail}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {applicant.nationalityCountryName ? (
                      <Link to={`country/${applicant.nationalityId}`}>{applicant.nationalityCountryName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {applicant.countryOfBirthCountryName ? (
                      <Link to={`country/${applicant.countryOfBirthId}`}>{applicant.countryOfBirthCountryName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {applicant.nationalityAtBirthCountryName ? (
                      <Link to={`country/${applicant.nationalityAtBirthId}`}>{applicant.nationalityAtBirthCountryName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${applicant.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${applicant.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${applicant.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="somaliviswebappApp.applicant.home.notFound">No Applicants found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={applicantList && applicantList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ applicant }: IRootState) => ({
  applicantList: applicant.entities,
  loading: applicant.loading,
  totalItems: applicant.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Applicant);
