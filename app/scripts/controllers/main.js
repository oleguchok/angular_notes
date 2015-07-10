'use strict';


var notesModule = angular.module('angularNotesApp');

notesModule.config(['markedProvider', function(markedProvider) {
      markedProvider.setOptions({gfm: true});
    }]);


notesModule
  .controller('MainCtrl', function ($scope, localStorageService, marked) {

    var notesInStore = localStorageService.get('notes');

    $scope.notes = notesInStore || [];
    $scope.visibleAddForm = true;
    $scope.selectedNoteIndex = -1;

    $scope.$watch('notes', function() {
      localStorageService.set('notes', $scope.notes);
    }, true);

    $scope.addNote = function() {
      var note = {
        titlemark : marked($scope.note.title),
        bodymark : marked($scope.note.body),
        title : $scope.note.title,
        body : $scope.note.body
      };
      $scope.notes.push(note);
      $scope.note.title = "";
      $scope.note.body = "";
    };

    $scope.edit = function () {
      var note = {
        titlemark : marked($scope.notes[$scope.selectedNoteIndex].title),
        bodymark : marked($scope.notes[$scope.selectedNoteIndex].body),
        title : $scope.notes[$scope.selectedNoteIndex].title,
        body : $scope.notes[$scope.selectedNoteIndex].body
      }
      $scope.notes.splice($scope.selectedNoteIndex, 1, note);
      $scope.selectedNoteIndex = -1;
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
