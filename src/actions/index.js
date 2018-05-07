import axios from "axios";

const API_KEY = "testkey_1";
const API_URL = `https://bokiotestbankapi.azurewebsites.net/api/${API_KEY}/Transactions`;

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const SAVE_TRANSACTIONS = "SAVE_TRANSACTIONS";
export const DATA_PARSE_COMPLETED = "DATA_PARSE_COMPLETED";
export const DATA_MAPPING_COMPLETED = "DATA_MAPPING_COMPLETED";

export function fetchTransactions() {
  const request = axios(API_URL);

  return {
    type: FETCH_TRANSACTIONS,
    payload: request
  };
}

export function saveTransactions(data) {
  const request = axios({
    method: "post",
    url: API_URL,
    data: data
  });

  return {
    type: SAVE_TRANSACTIONS,
    payload: request
  };
}

export function dataParseCompleted(rawInputData, parsedInputData) {
  return {
    type: DATA_PARSE_COMPLETED,
    payload: { rawInputData, parsedInputData }
  };
}

export function dataMappingCompleted(columnDataMappings, mappedInputData) {
  return {
    type: DATA_MAPPING_COMPLETED,
    payload: { columnDataMappings, mappedInputData }
  };
}
