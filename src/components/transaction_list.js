import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from './grid';
import { fetchTransactions } from '../actions/index';

class TransactionList extends Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }

  renderTransactionGrid() {
    const gridData = {
      columns: [
        { "text": "Date", "dataIndex": "dateString" },
        { "text": "Description", "dataIndex": "text" },
        { "text": "Amount", "dataIndex": "amount" }
      ],
      rows: this.props.savedTransactions
    }
    return (
      <Grid data={gridData} />
    );
  }

  render() {
    return (
      <div className="transaction-table-container">
        {this.renderTransactionGrid()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedTransactions: state.transactions.savedTransactions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTransactions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);