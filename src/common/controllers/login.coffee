angular.module '%module%.common'
.controller 'loginCtrl',($scope, Authentication, $state) ->
  $scope.message = 'LOGIN_PROMPT'
  $scope.status = 'warning'
  $scope.submit = (email, password) ->
    Authentication.login email, password
    .then ->
      $state.go 'landing'
    .catch (error) ->
      $scope.message = error
      $scope.status = 'danger'
