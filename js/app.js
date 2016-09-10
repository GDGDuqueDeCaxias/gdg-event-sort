var app = angular.module('plunker', []);

app.controller('MainCtrl', function ($scope) {
  $scope.raffled = 'GDG Sort System';
  $scope.convertCsv = function () {
    $scope.json = Papa.parse($scope.fileContent);
    var numId = Math.floor(Math.random() * $scope.json.data.length);
    var result = $scope.json.data[numId];
    $scope.raffled = result;
  };
});

app.directive('fileReader', function () {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function (changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function (e) {
              var contents = e.target.result;
              scope.$apply(function () {
                scope.fileReader = contents;
              });
          };

          r.readAsText(files[0]);
        }
      });
    }
  };
});
