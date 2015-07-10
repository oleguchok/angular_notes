'use strict';


angular.module('angularNotesApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var notesInStore = localStorageService.get('notes');

    $scope.notes = notesInStore || [];
    $scope.visibleAddForm = true;
    $scope.selectedNoteIndex = -1;

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

    $scope.removeNote = function (index) {
      $scope.notes.splice(index, 1);
    };

    $scope.cancel = function () {
      $scope.selectedNoteIndex = -1;
    };

    $scope.toggle = function() {
      $scope.visibleAddForm = !$scope.visibleAddForm;
      $scope.note.title = "";
      $scope.note.body = "";
    };

    $scope.enableEditor = function (index) {
      $scope.selectedNoteIndex = index;
    };

    $scope.isIndex = function (index) {
      return $scope.selectedNoteIndex == index;
    };

    $scope.clear = function() {
      $scope.note.body = "";
    };

  });
