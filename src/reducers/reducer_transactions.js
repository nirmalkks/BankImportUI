import {
  FETCH_TRANSACTIONS,
  SAVE_TRANSACTIONS,
  DATA_PARSE_COMPLETED,
  DATA_MAPPING_COMPLETED
} from "../actions/index";

const INITIAL_STATE = {
  savedTransactions: [],
  rawInputData: "",
  parsedInputData: [],
  columnDataMappings: {},
  mappedInputData: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      if (action.payload.data) {
        const payloadData = action.payload.data.map(function(item, index) {
          let dataObject = { ...item };
          dataObject["key"] = `${item.date}-${item.text}-${item.amount}-${index}`;
          dataObject["dateString"] = item.date.split("T")[0];
          return dataObject;
        });
        return { ...state, savedTransactions: payloadData };
      }
      return state;
    case DATA_PARSE_COMPLETED:
      return {
        ...state,
        rawInputData: action.payload.rawInputData,
        parsedInputData: action.payload.parsedInputData
      };
      case DATA_MAPPING_COMPLETED:
      return {
        ...state,
        columnDataMappings: action.payload.columnDataMappings,
        mappedInputData: action.payload.mappedInputData
      };
    default:
      return state;
  }
}
