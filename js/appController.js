'use strict';

angular.module('adminPanel.home', [
  'ngMaterial',
  'pascalprecht.translate',
])
.controller('adminCtrl',
    function($scope, $mdDialog, $translate, $http) {

  $scope.albumcount = 0;
  $scope.songcount = 0;
  $scope.songLoadCount = 0;
  $scope.data = [];
  $scope.song;
  $scope.language = 'en';

  /* Change locale. */
  $scope.changeLanguage = function () {
    $translate.use($scope.language);
  };

  /* Get Number of songs and albums */
  $http.get('http://localhost:3000/api').
      success(function(data, status, headers, config) {
        $scope.albumcount = data.album;
        $scope.songcount = data.songs;
      }).
      error(function(data, status, headers, config) {
        window.console.log('error');
      });


  // Timer and values for dashboard grid.
  setTimeout(function(){
    document.getElementById('box1').innerHTML = $scope.albumcount;
  }, 1000);

  setTimeout(function(){
    document.getElementById('box2').innerHTML = $scope.songcount;
  }, 1000);

  /* Loads songs. 50 in one go */
  $scope.loadSongs = function() {
    $http.get('http://localhost:3000/api/songs/'+$scope.songLoadCount).
      success(function(data, status, headers, config) {
        for (var i=0; i<data.length; i++) {
          $scope.data.push(data[i]);
        }
        $scope.songLoadCount = $scope.songLoadCount+50;
    }).
    error(function(data, status, headers, config) {
      window.console.log('error');
    });
  };

  /* Opens dialog to edit song */
  $scope.editSong = function(ev, song) {
    $scope.song = song;
    $mdDialog.show({
      templateUrl: 'dialog.tmpl.html',
      targetEvent: ev,
      locals: {
        song: $scope.song,
        language: $scope.language
      },
      controller: 'DialogController'
    });
  };

  /* Loads songs on page load */
  $scope.loadSongs();
});


