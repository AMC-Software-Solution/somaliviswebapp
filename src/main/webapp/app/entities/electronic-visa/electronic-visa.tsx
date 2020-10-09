import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './electronic-visa.reducer';
import { IElectronicVisa } from 'app/shared/model/electronic-visa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IElectronicVisaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ElectronicVisa = (props: IElectronicVisaProps) => {
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

  const { electronicVisaList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="electronic-visa-heading">
        <Translate contentKey="somaliviswebappApp.electronicVisa.home.title">Electronic Visas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="somaliviswebappApp.electronicVisa.home.createLabel">Create new Electronic Visa</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {electronicVisaList && electronicVisaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('visaNumber')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaNumber">Visa Number</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('barcode')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.barcode">Barcode</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nationality')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.nationality">Nationality</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('placeOfBirth')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.placeOfBirth">Place Of Birth</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('travelDocument')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocument">Travel Document</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('travelDocumentIssueDate')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocumentIssueDate">Travel Document Issue Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('travelDocumentExpiryDate')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocumentExpiryDate">Travel Document Expiry Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('travelPurpose')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelPurpose">Travel Purpose</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('visaValidFrom')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidFrom">Visa Valid From</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('visaValidUntil')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidUntil">Visa Valid Until</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('visaValidityType')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidityType">Visa Validity Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('visaType')}>
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaType">Visa Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {electronicVisaList.map((electronicVisa, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${electronicVisa.id}`} color="link" size="sm">
                      {electronicVisa.id}
                    </Button>
                  </td>
                  <td>{electronicVisa.firstName}</td>
                  <td>{electronicVisa.lastName}</td>
                  <td>{electronicVisa.visaNumber}</td>
                  <td>{electronicVisa.barcode}</td>
                  <td>{electronicVisa.nationality}</td>
                  <td>{electronicVisa.placeOfBirth}</td>
                  <td>{electronicVisa.travelDocument}</td>
                  <td>
                    {electronicVisa.travelDocumentIssueDate ? (
                      <TextFormat type="date" value={electronicVisa.travelDocumentIssueDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {electronicVisa.travelDocumentExpiryDate ? (
                      <TextFormat type="date" value={electronicVisa.travelDocumentExpiryDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{electronicVisa.travelPurpose}</td>
                  <td>
                    {electronicVisa.visaValidFrom ? (
                      <TextFormat type="date" value={electronicVisa.visaValidFrom} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {electronicVisa.visaValidUntil ? (
                      <TextFormat type="date" value={electronicVisa.visaValidUntil} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{electronicVisa.visaValidityType}</td>
                  <td>{electronicVisa.visaType}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${electronicVisa.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${electronicVisa.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${electronicVisa.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="somaliviswebappApp.electronicVisa.home.notFound">No Electronic Visas found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={electronicVisaList && electronicVisaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ electronicVisa }: IRootState) => ({
  electronicVisaList: electronicVisa.entities,
  loading: electronicVisa.loading,
  totalItems: electronicVisa.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ElectronicVisa);
