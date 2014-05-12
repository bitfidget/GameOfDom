javascript:
  // set variables
  var i,
  s,
  ss=['http://modelcitizen.com.au/GOD/js/god.js','//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js'];
  // append both scripts as new elements within the target document
  for(i=0;i!=ss.length;i++){
    s=document.createElement('script');
    s.src=ss[i];document.body.appendChild(s);
  }
  void(0);