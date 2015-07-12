angular.module '%module%.common'
.service 'Authentication', ($http, AUTHENTICATOR_URL, localStorageService, $modal, $q) ->
  openLoginModal: =>
    $modal.open
      templateUrl: 'common/views/login-modal.html',
      controller: 'LoginModalCtrl',

  login: (email, password) =>
    $http.post AUTHENTICATOR_URL+'/login',
      email: email
      password: password
    .catch (error) ->
      $q.reject error.data.error_code
    .then (response) ->
      token = response.data.token
      req =
        method: 'GET'
        url: AUTHENTICATOR_URL+'/me'
        headers:
          'Content-Type': 'application/json'
          Authorization: 'Bearer ' + token
      $http req
      .then (response) ->
        response.data
      .then (data) ->
        if data.role is 'ADMIN'
          localStorageService.set 'token', token
        else
          $q.reject 'NOT_ADMIN'
