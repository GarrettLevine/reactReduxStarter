import reducer from './ducks/reducer';

import * as types from './ducks/types';
export { types as featureTypes };

import * as actions from './ducks/actions';
export { actions as featureActions };

import * as operations from './ducks/operations';
export { operations as featureOperations };

import * as selectors from './ducks/selectors';
export { selectors as featureSelectors };

export default reducer;
