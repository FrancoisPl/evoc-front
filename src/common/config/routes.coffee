angular.module '%module%.common'
.config ($stateProvider) ->
  $stateProvider
  .state 'app',
    abstract: true
    data:
      role: 'ADMIN'
    template: "<div ui-view></div>"
