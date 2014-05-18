

var findLast = function (current) {
  if ( current.children().length > 0 ) {
    if ( current.children().last().is('br, p, span, td, ul, ol, li, tr, table, a, img, video, div, section, article, footer, header') ) {
      current = $( current.children().last() );
      findLast(current);
    } else {
      current.children().last().remove();
      findLast(current);
    }
  } else {
    return current
  }
  return current
}



$(document).ready(function(){
  $fuckWith = $('#butterfly');
  yarg = findLast($fuckWith) 
});