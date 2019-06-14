angular.module("math").controller("matrix", display);
display.$inject = ["$scope", "$http"];
function display($scope) {
    "use strict";
    var vm = this;
    var check = (function () {
        var oldValue = [];
        return function (matrixStr) {
            if ((typeof matrixStr) !== "undefined" && matrixStr !== null && matrixStr !== "") {
                try {
                    var newVal = JSON.parse(matrixStr);
                    if (Array.isArray(newVal) && newVal.length !== oldValue.length &&
                        !oldValue.some(function (v, i) {
                            return v === newVal[i];
                        })) {
                        oldValue = newVal;
                        return newVal;
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            return null;
        };
    })();
    var calculate = function (matrix) {
        vm.result = JSON.stringify(matrix);
    };
    $scope.$watch("m.matrix", function (newVal, oldVal) {
        var matrix = check(newVal, oldVal);
        if (matrix) {
            calculate(matrix);
        }
    });
}
