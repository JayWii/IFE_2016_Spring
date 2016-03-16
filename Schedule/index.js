$(function () {
  $(".task").mouseenter(function () {
    $(this).animate({width:"200px",marginLeft:"-100px",height:"130px"},200);
  })
  $(".task").mouseleave(function () {
    $(this).animate({width:"100px",marginLeft:"-50px",height:"45px"},200);
  })
})
