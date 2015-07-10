'use strict';


angular.module('angularNotesApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var notesInStore = localStorageService.get('notes');

    $scope.notes = notesInStore || [];
    $scope.visibleAddForm = true;

    $scope.$watch('notes', function() {
      localStorageService.set('notes', $scope.notes);
    }, true);

    $scope.addNote = function() {
      var note = {
        title : $scope.note.title,
        body : $scope.note.body
      };
      $scope.notes.push(note);
      $scope.note.title = "";
      $scope.note.body = "";
    };

    $scope.toggle = function() {
      $scope.visibleAddForm = !$scope.visibleAddForm;
      $scope.note.title = "";
      $scope.note.body = "";
    };

    $scope.clear = function() {
      $scope.note.body = "";
    };

  });
