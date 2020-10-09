import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payment-transaction.reducer';
import { IPaymentTransaction } from 'app/shared/model/payment-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IPaymentTransactionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaymentTransaction = (props: IPaymentTransactionProps) => {
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

  const { paymentTransactionList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="payment-transaction-heading">
        <Translate contentKey="somaliviswebappApp.paymentTransaction.home.title">Payment Transactions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="somaliviswebappApp.paymentTransaction.home.createLabel">Create new Payment Transaction</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {paymentTransactionList && paymentTransactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionAmount')}>
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.transactionAmount">Transaction Amount</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentType')}>
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentType">Payment Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentDescription')}>
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentDescription">Payment Description</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentStatus')}>
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentStatus">Payment Status</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionDate')}>
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.transactionDate">Transaction Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentProvider')}>
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentProvider">Payment Provider</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.visaApplication">Visa Application</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentTransactionList.map((paymentTransaction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paymentTransaction.id}`} color="link" size="sm">
                      {paymentTransaction.id}
                    </Button>
                  </td>
                  <td>{paymentTransaction.transactionAmount}</td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.PaymentType.${paymentTransaction.paymentType}`} />
                  </td>
                  <td>{paymentTransaction.paymentDescription}</td>
                  <td>
                    <Translate contentKey={`somaliviswebappApp.PaymentStatus.${paymentTransaction.paymentStatus}`} />
                  </td>
                  <td>
                    {paymentTransaction.transactionDate ? (
                      <TextFormat type="date" value={paymentTransaction.transactionDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{paymentTransaction.paymentProvider}</td>
                  <td>
                    {paymentTransaction.visaApplicationApplicationName ? (
                      <Link to={`visa-application/${paymentTransaction.visaApplicationId}`}>
                        {paymentTransaction.visaApplicationApplicationName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paymentTransaction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${paymentTransaction.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${paymentTransaction.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="somaliviswebappApp.paymentTransaction.home.notFound">No Payment Transactions found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={paymentTransactionList && paymentTransactionList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ paymentTransaction }: IRootState) => ({
  paymentTransactionList: paymentTransaction.entities,
  loading: paymentTransaction.loading,
  totalItems: paymentTransaction.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTransaction);
