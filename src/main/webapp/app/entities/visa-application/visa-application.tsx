import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './visa-application.reducer';
import { IVisaApplication } from 'app/shared/model/visa-application.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IVisaApplicationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VisaApplication = (props: IVisaApplicationProps) => {
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

  const { visaApplicationList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="visa-application-heading">
        <Translate contentKey="somaliviswebappApp.visaApplication.home.title">Visa Applications</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="somaliviswebappApp.visaApplication.home.createLabel">Create new Visa Application</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {visaApplicationList && visaApplicationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('applicationName')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationName">Application Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('applicationCode')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationCode">Application Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('applicationDate')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationDate">Application Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('applicationStatus')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationStatus">Application Status</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('travelPurpose')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.travelPurpose">Travel Purpose</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('visaType')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.visaType">Visa Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('travelMode')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.travelMode">Travel Mode</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('portOfEntry')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.portOfEntry">Port Of Entry</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numberOfEntriesRequested')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.numberOfEntriesRequested">
                    Number Of Entries Requested
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('intendedDateOfArrival')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.intendedDateOfArrival">Intended Date Of Arrival</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('intendedDateOfDeparture')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.intendedDateOfDeparture">Intended Date Of Departure</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('validUntil')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.validUntil">Valid Until</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('travelPurposeOther')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.travelPurposeOther">Travel Purpose Other</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('rejectReason')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.rejectReason">Reject Reason</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('approvedDate')}>
                  <Translate contentKey="somaliviswebappApp.visaApplication.approvedDate">Approved Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.visaApplication.visaApplicationStay">Visa Application Stay</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationFee">Application Fee</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.visaApplication.electronicVisa">Electronic Visa</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.visaApplication.approvedBy">Approved By</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visaApplicationList.map((visaApplication, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${visaApplication.id}`} color="link" size="sm">
                      {visaApplication.id}
                    </Button>
                  </td>
                  <td>{visaApplication.applicationName}</td>
                  <td>{visaApplication.applicationCode}</td>
                  <td>
                    {visaApplication.applicationDate ? (
                      <TextFormat type="date" value={visaApplication.applicationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.ApplicationStatus.${visaApplication.applicationStatus}`} />
                  </td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.TravelPurpose.${visaApplication.travelPurpose}`} />
                  </td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.VisaType.${visaApplication.visaType}`} />
                  </td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.TravelMode.${visaApplication.travelMode}`} />
                  </td>
                  <td>{visaApplication.portOfEntry}</td>
                  <td>{visaApplication.numberOfEntriesRequested}</td>
                  <td>
                    {visaApplication.intendedDateOfArrival ? (
                      <TextFormat type="date" value={visaApplication.intendedDateOfArrival} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {visaApplication.intendedDateOfDeparture ? (
                      <TextFormat type="date" value={visaApplication.intendedDateOfDeparture} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {visaApplication.validUntil ? (
                      <TextFormat type="date" value={visaApplication.validUntil} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{visaApplication.travelPurposeOther}</td>
                  <td>{visaApplication.rejectReason}</td>
                  <td>
                    {visaApplication.approvedDate ? (
                      <TextFormat type="date" value={visaApplication.approvedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {visaApplication.visaApplicationStayStayLocationFullAddress ? (
                      <Link to={`visa-application-stay/${visaApplication.visaApplicationStayId}`}>
                        {visaApplication.visaApplicationStayStayLocationFullAddress}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {visaApplication.applicationFeeDescription ? (
                      <Link to={`application-fee/${visaApplication.applicationFeeId}`}>{visaApplication.applicationFeeDescription}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {visaApplication.electronicVisaVisaNumber ? (
                      <Link to={`electronic-visa/${visaApplication.electronicVisaId}`}>{visaApplication.electronicVisaVisaNumber}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {visaApplication.approvedByEmployeeFullName ? (
                      <Link to={`employee/${visaApplication.approvedById}`}>{visaApplication.approvedByEmployeeFullName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${visaApplication.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${visaApplication.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${visaApplication.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="somaliviswebappApp.visaApplication.home.notFound">No Visa Applications found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={visaApplicationList && visaApplicationList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ visaApplication }: IRootState) => ({
  visaApplicationList: visaApplication.entities,
  loading: visaApplication.loading,
  totalItems: visaApplication.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisaApplication);
