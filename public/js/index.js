$(document).ready(function () {
  $('.dropdown-trigger').dropdown({
    constrainWidth: false,
    coverTrigger: false,
    closeOnClick: false,
    hover: true,
  });
  $('.collapsible').collapsible();
  $('.modal').modal({
    dismissible: false
  });
  $('select').formSelect();
  $('.tabs').tabs();
  // CKEDITOR.replace( 'customerNotes' )
  $('.sidenav').sidenav({
    edge: 'right',
    draggable: true
  });

});