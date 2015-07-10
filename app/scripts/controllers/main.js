'use strict';


angular.module('angularNotesApp')
  .controller('MainCtrl', function (localStorageService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
