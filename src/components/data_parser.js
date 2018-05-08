import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";

import { dataParseCompleted } from "../actions/index";

class DataParser extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { bankData: props.rawInputData };

    this.onTextareaInputChange = this.onTextareaInputChange.bind(this);
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
  }

  onTextareaInputChange(event) {
    this.setState({ bankData: event.target.value });
  }

  onNextButtonClick() {
    const parsedInputData = this.parseData(this.state.bankData);

    if (parsedInputData.length > 0) {
      this.context.router.history.push("/import/mapping");
      this.props.dataParseCompleted(this.state.bankData, parsedInputData);
    } else {
      notify.show(
        "Please paste your bank data before clicking on next button",
        "error"
      );
    }
  }

  parseData(data) {
    const dataArray = data.split("\n");
    const transactionLineItemRegex = /(\d{4}-\d{2}-\d{2})(\s+)(\d{4}-\d{2}-\d{2})?(\s+)([\wåäöÅÄÖ\-.,:;\/]+\s?[a-zA-ZåäöÅÄÖ.,:;\/]*)(\s+)(-?\d{1,3}[,\s]+\d{3}[,.]+\d*|-?\d{3}[,.]+\d*)(\s+)(-?\d{1,3}[,\s]+\d{3}[,.]+\d*|-?\d{3}[,.]+\d*)/gm;
    let matchArray;

    return dataArray.reduce((parsedData, dataItem) => {
      while ((matchArray = transactionLineItemRegex.exec(dataItem)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (matchArray.index === transactionLineItemRegex.lastIndex) {
          transactionLineItemRegex.lastIndex++;
        }
        parsedData.push(
          matchArray.reduce((parsedLineItems, matchedItem, groupIndex) => {
            if (matchedItem && matchedItem.trim() !== "" && groupIndex !== 0) {
              parsedLineItems.push(matchedItem.trim());
            }
            return parsedLineItems;
          }, [])
        );
      }
      return parsedData;
    }, []);
  }

  render() {
    return (
      <div className="data-parser-container">
        <textarea
          placeholder="Paste your bank data here"
          value={this.state.bankData}
          onChange={this.onTextareaInputChange}
        />
        <a className="next-btn" onClick={this.onNextButtonClick}>
          Next &raquo;
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rawInputData: state.transactions.rawInputData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dataParseCompleted }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataParser);
