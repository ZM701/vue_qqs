$(function () {
  var str = window.location.href;
  if(str.indexOf("index")!=-1||str.indexOf("one")!=-1){
    $(".find").show();
    $(".display").hide();
  }else{
    $(".find").hide();
    $(".display").show();
  }
  $("a").click(function () {
    var href = window.location.href;
    if(href.indexOf("index")!=-1){
      $(".find").show();
      $(".display").hide();
    }else{
      $(".find").hide();
      $(".display").show();
    }
  });
});
