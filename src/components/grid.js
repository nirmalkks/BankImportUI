import React, { Component } from "react";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  getHeaderCheckboxValue(colDataIndex, rowData) {
    const hasUncheckedRowItems = rowData.some(function(data) {
      return data[colDataIndex] === false;
    });

    return !hasUncheckedRowItems;
  }

  renderHeader(columnData) {
    return columnData.text === "$CheckboxColumn" ? (
      <th key={columnData.dataIndex} className="checkbox-container">
        <input
          type="checkbox"
          onChange={e => this.props.onHeaderCheckboxChange(e)}
          checked={this.getHeaderCheckboxValue(
            columnData.dataIndex,
            this.props.data.rows
          )}
        />
      </th>
    ) : (
      <th key={columnData.dataIndex}>{columnData.text}</th>
    );
  }

  renderRow(rowData) {
    return (
      <tr key={rowData.key}>
        {this.props.data.columns.map(columnData => {
          return columnData.text === "$CheckboxColumn" ? (
            <td
              key={rowData.key + "-" + columnData.dataIndex}
              className="checkbox-container"
            >
              <input
                type="checkbox"
                checked={rowData[columnData.dataIndex]}
                onChange={e => this.props.onRowCheckboxChange(e, rowData)}
              />
            </td>
          ) : (
            <td key={rowData.key + "-" + columnData.dataIndex}>
              {rowData[columnData.dataIndex]}
            </td>
          );
        })}
      </tr>
    );
  }

  renderNoDataText() {
    return (
      <tr>
        <td>No data available</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="tWrap">
        <div className="tWrap-head">
          <table>
            <thead>
              <tr>{this.props.data.columns.map(this.renderHeader)}</tr>
            </thead>
          </table>
        </div>
        <div className="tWrap-body">
          <table>
            <tbody>
              {this.props.data.rows.length > 0
                ? this.props.data.rows.map(this.renderRow)
                : this.renderNoDataText()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
