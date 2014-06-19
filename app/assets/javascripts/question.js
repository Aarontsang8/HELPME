var QuestionApp = angular.module('question-app', ['ngResource', 'mm.foundation']).config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;

    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);


QuestionApp.factory('Question', ['$resource', function($resource) {
  return $resource('/questions/:id',
    {id: '@id'},
    {update: { method: 'PATCH'}});
}]);


QuestionApp.controller('QuestionCtrl', ['Question', '$scope', '$timeout', function(Question, $scope, $timeout) {
  $scope.questions= [];
  $scope.alerts= [];
  $scope.newQuestion = new Question();



  Question.query(function(questions) {
    $scope.questions = questions;
  });


   $scope.addAlert = function(index) {
      $scope.alerts.push({msg: "Thanks! An instructor will get back to you ASAP!!"});
 
    }

    $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  }


    $scope.saveQuestion = function (event) {
      event.preventDefault();
      $scope.newQuestion.$save(function(question) {
        $scope.questions.push(question)
        $scope.newQuestion = new Question();
      });
    }


$scope.deleteQuestion = function (question) {
      question.$delete(function() {
        position = $scope.questions.indexOf(question);
        $scope.questions.splice(position, 1);
      }, function(errors) {
        $scope.errors = errors.data
      });
    }

    $scope.showQuestion = function(question) {
      question.details = true;
      question.editing = false;
    }

    $scope.hideQuestion = function(question) {
      question.details = false;
    }

    $scope.editQuestion = function(question) {
      question.editing = true;
      question.details = false;
    }

    $scope.updateQuestion = function(question) {
      question.$update(function() {
        question.editing = false;
      }, function(errors) {
        $scope.errors = errors.data
      });
    }

    $scope.clearErrors = function() {
      $scope.errors = null;
    }
}])
