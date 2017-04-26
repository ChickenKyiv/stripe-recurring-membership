
'use strict';

const ActionTypes = {
  navigation: {
    SELECT_RECIPE: 'SELECT_RECIPE'
  },
  recipeSuggestionResults: {
    SUGGEST_RECIPES_REQUEST: 'SUGGEST_RECIPES_REQUEST',
    SUGGEST_RECIPES_SUCCESS: 'SUGGEST_RECIPES_SUCCESS',
    SUGGEST_RECIPES_FAILURE: 'SUGGEST_RECIPES_FAILURE'
  },
}

module.exports = ActionTypes;