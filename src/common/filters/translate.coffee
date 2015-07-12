angular.module '%module%.common'
.filter 'translate', ->
  (key, lang = 'fr') ->
    translations[lang][key]
