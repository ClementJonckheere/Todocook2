(function(){
  const BASE_URL = '/api/v1';

  function request(path, options) {
    return fetch(BASE_URL + path, Object.assign({
      headers: { 'Content-Type': 'application/json' }
    }, options)).then(function(res){
      if(!res.ok) { throw new Error('API request failed'); }
      return res.json();
    });
  }

  window.api = {
    listRecipes: function() {
      return request('/recipes');
    },
    createRecipe: function(data) {
      return request('/recipes', { method: 'POST', body: JSON.stringify(data) });
    },
    getPantry: function(userId) {
      return request('/users/' + userId + '/pantry');
    }
  };
})();
