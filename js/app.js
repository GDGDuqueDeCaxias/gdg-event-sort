var app = angular.module('plunker', []);

// controller
app.controller('MainCtrl', function ($scope) {
  $scope.raffled = 'GDG Sort System';

  // function de conversão csv2json
  $scope.convertCsv = function () {
    $scope.json = $scope.csv2json($scope.fileContent);
    var sortedNum = Math.floor(Math.random() * $scope.json.length);
    var result = $scope.json[sortedNum];
    $scope.raffled = result.nome;
  };

  $scope.csv2json = function csvTojs(csv) {
    var lines=csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for(var i=1; i<lines.length; i++) {
      var obj = {};

      var row = lines[i],
      queryIdx = 0,
      startValueIdx = 0,
      idx = 0;

      if (row.trim() === '') { continue; }

      while (idx < row.length) {
        /* if we meet a double quote we skip until the next one */
        var c = row[idx];

        if (c === '"') {
          do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
        }

        if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
          /* we've got a value */
          var value = row.substr(startValueIdx, idx - startValueIdx).trim();

          /* skip first double quote */
          if (value[0] === '"') { value = value.substr(1); }
          /* skip last comma */
          if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
          /* skip last double quote */
          if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }

          var key = headers[queryIdx++];
          obj[key] = value;
          startValueIdx = idx + 1;
        }

        ++idx;
      }

      result.push(obj);
    }
    return result;
  }

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
