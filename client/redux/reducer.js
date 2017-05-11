import axios from 'axios';
import config from '../config.json';

const UPADTE_MAP = 'UPADTE_MAP';
const UPADTE_MAP_INDEX = 'UPADTE_MAP_INDEX';
const UPADTE_MAP_ERROR = 'UPADTE_MAP_ERROR';

const initState = {
  mapData: null,
  mapIndex: null,
  error: null,
}

export default function reducer(state = initState, action) {
  const payload = action.payload;
  switch (action.type) {
    case UPADTE_MAP:
      return Object.assign({}, state, { mapData: payload.mapData } );
    case UPADTE_MAP_INDEX:
      return Object.assign({}, state, { mapIndex: payload.mapIndex } );
    case UPADTE_MAP_ERROR:
      return Object.assign({}, state, { error: payload.error } );
    default:
      return state;
  }
}

function updateMap(mapData) {
  return {
    type: UPADTE_MAP,
    payload: { mapData: mapData },
  }
}

function updateMapIndex(mapIndex) {
  return {
    type: UPADTE_MAP_INDEX,
    payload: { mapIndex: mapIndex },
  }
}

function updateMapError(mapError) {
  return {
    type: UPADTE_MAP_ERROR,
    payload: { error: mapError },
  }
}

export function fetchMapIndex() {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${config.data_index}`,
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(res);
      }
    })
    .then( (data) => {
      dispatch(updateMapIndex(data));
    })
    .catch((err) => {
      console.error("failed to fetch a map index", err);

      dispatch(updateMapError({
        type: "map_index",
        message: err.message,
      }));
    });
  }  
}