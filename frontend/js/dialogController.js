'use strict';

angular.module('adminPanel.dialog', [
  'ngMaterial',
  'pascalprecht.translate',
])
.controller('DialogController',
    function($scope, $mdDialog, $http, song, language) {
  $scope.song = song;

  /* Closes dialog. */
  $scope.closeDialog = function() {
    $mdDialog.hide();
  }

  /* Calls API to update song. */
  $scope.updateSong = function(){
    $http.post('http://localhost:3000/api/update', $scope.song).
      success(function(data, status, headers, config) {
        window.alert('Success');
        $scope.closeDialog();
      }).
      error(function(data, status, headers, config) {
        window.console.log('error');
      });
  }
});

