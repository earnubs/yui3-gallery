YUI({
    combine: false,
    debug: true,
    filter: 'raw'
}).use('gallery-widget-dial-input', function (Y) {

  Y.log(Y.MyApp);
  var myDial = new Y.MyApp.Dial({
      srcNode: '.yui3-dialwidget',
      rotation: 0,
      width: 300,
      height: 300
  });


  myDial.render();
  Y.log(myDial);
});
