import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";

import Grid from "./grid";
import { saveTransactions } from "../actions/index";

class DataReviewer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      mappedInputData: props.mappedInputData,
      gridData: []
    };

    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.handleHeaderCheckboxChange = this.handleHeaderCheckboxChange.bind(
      this
    );
    this.handleRowCheckboxChange = this.handleRowCheckboxChange.bind(this);
  }

  componentWillMount() {
    const mappedInputData = this.props.mappedInputData;
    let rowItemKey;
    let uniqueDataArray = [];
    let isItemChecked;
    let transactionAmount;
    const gridData = {
      columns: [
        { text: "$CheckboxColumn", dataIndex: "isChecked" },
        { text: "Date", dataIndex: "date" },
        { text: "Description", dataIndex: "text" },
        { text: "Amount", dataIndex: "amount" }
      ],
      rows: mappedInputData
        ? mappedInputData.map((dataItem, index) => {
            isItemChecked = false;
            transactionAmount = Number(
              dataItem["amount"].replace(/[, ]+/g, "").trim()
            );
            rowItemKey = `${dataItem["date"]}-${
              dataItem["text"]
            }-${transactionAmount}`;

            if (uniqueDataArray.indexOf(rowItemKey) === -1) {
              uniqueDataArray.push(rowItemKey);
              isItemChecked = true;
            }
            return {
              isChecked: isItemChecked,
              date: dataItem["date"],
              text: dataItem["text"],
              amount: transactionAmount,
              key: `${rowItemKey}-${index}`
            };
          })
        : []
    };
    const isHeaderCheckboxChecked =
      gridData.rows.length > 0
        ? gridData.rows.length === uniqueDataArray.length
        : false;

    this.setState({
      gridData: gridData
    });
  }

  renderDataReviewerGrid() {
    return (
      <Grid
        data={this.state.gridData}
        onHeaderCheckboxChange={this.handleHeaderCheckboxChange}
        onRowCheckboxChange={this.handleRowCheckboxChange}
      />
    );
  }

  handleHeaderCheckboxChange(event) {
    const currentGridData = this.state.gridData;
    const newGridRowData = currentGridData.rows.map(rowItem => {
      rowItem.isChecked = event.target.checked;
      return rowItem;
    });

    this.setState({
      gridData: { ...currentGridData, rows: newGridRowData }
    });
  }

  handleRowCheckboxChange(event, rowData) {
    const currentGridData = this.state.gridData;
    const newGridRowData = [...currentGridData.rows];
    const targetRow = newGridRowData.find(rowItem => {
      return rowItem.key === rowData.key;
    });

    if (targetRow) {
      targetRow.isChecked = event.target.checked;
    }
    this.setState({
      gridData: { ...currentGridData, rows: newGridRowData }
    });
  }

  onBackButtonClick() {
    this.context.router.history.push("/import/mapping");
  }

  onSaveButtonClick() {
    const gridRowData = this.state.gridData.rows;
    const finalTransactionData = gridRowData.reduce((finalData, dataItem) => {
      if (dataItem.isChecked) {
        finalData.push(dataItem);
      }
      return finalData;
    }, []);

    if (finalTransactionData.length > 0) {
      this.props.saveTransactions(finalTransactionData).then(() => {
        this.context.router.history.push("/");
      });
    } else {
      notify.show(
        "No data to save",
        "error"
      );
    }
  }

  render() {
    return (
      <div className="data-reviewer-container">
        <div className="data-reviewer-table-container">
          <div className="data-reviewer-helper-text">
            Please select records that should be saved for bookkeeping.
            Duplicate data will be deselected by default.
          </div>
          {this.renderDataReviewerGrid()}
        </div>
        <a className="back-btn" onClick={this.onBackButtonClick}>
          &laquo; Back
        </a>
        <a className="next-btn" onClick={this.onSaveButtonClick}>
          Save
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mappedInputData: state.transactions.mappedInputData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveTransactions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataReviewer);
