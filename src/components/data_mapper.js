import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";

import { dataMappingCompleted } from "../actions/index";

class DataMapper extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { columnDataMappings: props.columnDataMappings };

    this.onDataMapperDropdownChange = this.onDataMapperDropdownChange.bind(
      this
    );
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
  }

  onDataMapperDropdownChange(event) {
    let newMappings = {};

    for (let [key, value] of Object.entries(this.state.columnDataMappings)) {
      if (value !== event.target.name) {
        newMappings[key] = value;
      }
    }
    newMappings[event.target.value] = event.target.name;
    this.setState({ columnDataMappings: newMappings });
  }

  getDataMapperDropdownValue(index) {
    let dropdownValue = "";

    for (let [key, value] of Object.entries(this.state.columnDataMappings)) {
      if (value === `data-map-select-${index}`) {
        dropdownValue = key;
      }
    }
    return dropdownValue;
  }

  renderDataMapperTableHead() {
    const parsedInputData = this.props.parsedInputData;

    if (parsedInputData.length > 0) {
      const firstRowData = parsedInputData[0];
      return (
        <tr>
          {firstRowData.map((item, index) => {
            return (
              <th key={`header-col-${index}`}>
                <select
                  name={`data-map-select-${index}`}
                  value={this.getDataMapperDropdownValue(index)}
                  className="data-mapper-dropdown"
                  onChange={this.onDataMapperDropdownChange}
                >
                  <option disabled hidden style={{ display: "none" }} value="">
                    No mapping
                  </option>
                  <option value="date">Date</option>
                  <option value="text">Description</option>
                  <option value="amount">Amount</option>
                </select>
              </th>
            );
          })}
        </tr>
      );
    }
  }

  renderDataMapperTableBody() {
    const parsedInputData = this.props.parsedInputData;

    if (parsedInputData.length > 0) {
      return parsedInputData.map((rowItem, rowIndex) => {
        return (
          <tr key={`row-${rowIndex}`}>
            {rowItem.map((colItem, colIndex) => {
              return <td key={`row-${rowIndex}-col-${colIndex}`}>{colItem}</td>;
            })}
          </tr>
        );
      });
    }
  }

  onBackButtonClick() {
    this.context.router.history.push("/import/paste");
  }

  onNextButtonClick() {
    const mappings = this.state.columnDataMappings;
    const parsedInputData = this.props.parsedInputData;

    if (mappings["date"] && mappings["text"] && mappings["amount"]) {
      const mappedInputData = parsedInputData.reduce((mappedData, dataItem) => {
        let lineItem = {};
        for (let [key, value] of Object.entries(mappings)) {
          lineItem[key] = dataItem[Number(value.split("data-map-select-")[1])];
        }
        mappedData.push(lineItem);
        return mappedData;
      }, []);

      this.context.router.history.push("/import/review");
      this.props.dataMappingCompleted(mappings, mappedInputData);
    } else {
      notify.show(
        "Please select mappings for all the 3 (date, description and amount) data entities",
        "error"
      );
    }
  }

  render() {
    return (
      <div className="data-mapper-container">
        <div className="data-mapper-table-container">
          <div className="data-mapper-helper-text">
            Please select appropriate mappings for transaction date, description
            and amount data
          </div>
          <table className="data-mapper-table">
            <thead>{this.renderDataMapperTableHead()}</thead>
            <tbody>{this.renderDataMapperTableBody()}</tbody>
          </table>
        </div>
        <a className="back-btn" onClick={this.onBackButtonClick}>
          &laquo; Back
        </a>
        <a className="next-btn" onClick={this.onNextButtonClick}>
          Next &raquo;
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parsedInputData: state.transactions.parsedInputData,
    columnDataMappings: state.transactions.columnDataMappings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dataMappingCompleted }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataMapper);
