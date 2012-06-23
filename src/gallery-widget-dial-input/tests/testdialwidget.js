YUI({
    combine: false,
    debug: true,
    filter: 'raw'
}).use('gallery-widget-dial-input', function (Y) {

  Y.log(Y.MyApp);
  var myDial = new Y.MyApp.Dial({
      srcNode: '.yui3-dialwidget'
  });


  myDial.render();
});
