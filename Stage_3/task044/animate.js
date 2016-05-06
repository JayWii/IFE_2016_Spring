//动画，支持单元素连续动画或多元素连续/同时动画
function startMove(obj, json, fn) {
  clearInterval(obj.timer);
  var icur = 0;
  obj.timer = setInterval(function() {
    //flag判断是否所有运动都已经结束
    var flag = true;
    for (var attr in json) {
      //取当前值
      if (attr == 'opacity') {
        icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        icur = parseInt(getStyle(obj, attr));
      }
      //计算速度
      var speed = (json[attr] - icur) / 6;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      //判断是否所有的元素都到达;如果不是则把flag设为false；
      if (icur != json[attr]) {
        flag = false;
      }else {
        flag = true;
      }
      if (attr == "opacity") {
        obj.style.filter = "alpha(opacity:" + (icur + speed) + ")";
        obj.style.opacity = (icur + speed) / 100;
      }else{
        obj.style[attr] = icur + speed + "px";
      }
    }
    //当同一时间内的所有动画结束时关闭定时器
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, 20);
}
//获取样式
function getStyle(obj,attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];//针对IE浏览器
    } else {
      return getComputedStyle(obj,false)[attr];//针对非IE浏览器
    }
}
