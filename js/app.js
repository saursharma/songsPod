angular.module('adminPanel', [
  'ngMaterial',
  'pascalprecht.translate',
  'adminPanel.home',
  'adminPanel.dialog']).
  config(function($translateProvider) {
    // Translations for different locales.
    $translateProvider.translations('en', {
      title: 'Admin Panel',
      welcome: 'Welcome !!! You can switch language by using select list located at top right corner.',
      grid1: 'Albums',
      grid2: 'Songs',
      col1: 'Song',
      col2: 'Link',
      col3: 'Number of Downloads',
      col4: 'Edit',
      play: 'Play',
      dialogHeading: 'Edit song',
      dialogRow1: 'Song title',
      dialogRow2: 'Link',
      dialogRow3: 'Album ID',
      dialogRow4: 'Number of Downloads',
      dialogButton: 'Save'
    })
    .translations('de', {
      title: 'Panel de administrador',
      welcome: 'Bienvenidos !!! Puede cambiar el idioma mediante el uso de lista de selección situada en la esquina superior derecha .',
      grid1: 'álbumes',
      grid2: 'Canciones',
      col1: 'Canción',
      col2: 'Enlace',
      col3: 'Número de descargas',
      col4: 'Editar',
      play: 'Jugar',
      dialogHeading: 'Edición de canciones',
      dialogRow1: 'Título de la canción',
      dialogRow2: 'Enlace',
      dialogRow3: 'Identificación del álbum',
      dialogRow4: 'Número de descargas',
      dialogButton: 'Guardar'
    });
    $translateProvider.preferredLanguage('en');
  });

