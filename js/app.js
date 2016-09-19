
(function (angular, window, undefined) {

  'use strict'

  // Plunker module
  // ==============
  angular.module('plunker', [])

  // Controller
  // =========
  .controller('MainCtrl', ['$scope', '$interval', function ($scope, $interval) {

    // Will appear when raffled
    $scope.raffled = 'GDG Sort System'

    // Convert
    $scope.convert = function () {
      var i = 0
      var names = getNames($scope.fileContent)
      var sorted = Math.floor(Math.random() * names.length)

      var sound = new Audio('mah-oee.mp3')
      sound.play()

      var turn = $interval(function () {
        if (i > names.length) i = 0
        $scope.raffled = names[i]
        i++
      }, 100)

      sound.addEventListener('ended', function () {
        $interval.cancel(turn)
        $scope.raffled = names[sorted]
        $scope.$digest()
      }, false)
    }
  }])

  // FileReader directive
  // ====================
  .directive('fileReader', function () {
    return {

      scope: {
        fileReader: '='
      },

      link: function (scope, element) {
        element.bind('change', function (evt) {

          // Get files
          var files = evt.target.files

          if (!files.length) return

          // Read CSV
          var r = new FileReader()

          // Assigns the value to scope
          r.onload = function (e) {
            scope.$apply(function () {
              scope.fileReader = e.target.result
            })
          }

          r.readAsText(files[0])
        })

      }
    }
  })


  // Get names
  // =========
  function getNames (csv) {
    var lines = csv.split('\n')
    var names = []

    lines.forEach(function (name) {
      if (name != '') names.push(name.split(/,\n?/)[1])
    })

    return names
  }

})(angular, window)
