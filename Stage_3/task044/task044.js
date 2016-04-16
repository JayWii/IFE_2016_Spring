//预加载图片
var imgs = [];
for (var i = 0; i < 30; i++) {
  var img = new Image();
  img.src = 'img/img' + i + '.JPG';
  imgs.push(img);
}
//初始化，预先加载30张图片
function initData() {
  addPicture(30);
}
//添加图片进入DOM
function addPicture(number) {
  var wrap = document.getElementsByClassName('wrap')[0];
  for (var i = 0; i < number; i++) {
    var newBox = document.createElement("div");
    var newImage = document.createElement("div");
    var img = new Image();
    img.src = 'img/img' + i + '.JPG';
    newImage.appendChild(img);
    newImage.className = "image";
    newBox.appendChild(newImage);
    newBox.className = "box";
    wrap.appendChild(newBox);
  }
}
//将添加到DOM中的图片按照瀑布流布局
function waterfall(parent,box) {
  //获取全部box
  var wrap = document.getElementsByClassName(parent)[0];
  var boxs = document.getElementsByClassName(box);
  var screenW = document.documentElement.clientWidth;
  var boxW = boxs[0].offsetWidth;
  var cols = Math.floor(screenW / boxW);
  wrap.style.width = boxW * cols + "px";
  wrap.style.margin = "0 auto";
  var colHeight = [];
  for (var i = 0; i < boxs.length; i++) {
    if (i < cols) {
      colHeight.push(boxs[i].offsetHeight);
    }else {
      var minColH = Math.min.apply(null,colHeight);
      var minColHIndex = getIndex(colHeight,minColH);
      boxs[i].style.position = "absolute";
      boxs[i].style.top = minColH + "px";
      boxs[i].style.left = boxW * minColHIndex +"px";
      colHeight[minColHIndex] += boxs[i].offsetHeight;
    }
  }
}
//获取高度最小的列号索引
function getIndex(arr,data) {
  for (var i in arr) {
    if (arr[i] == data) {
      return i;
    }
  }
}
//判断是否需要加载图片
function isNeedLoad() {
  var boxs = document.getElementsByClassName("box");
  var lastPicHeight = boxs[boxs.length - 1].offsetTop;
  var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
  var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
  var nowHeight = scrollHeight + screenHeight;
  return (lastPicHeight > nowHeight)? false : true;
}
//图片全屏
function fullScreen(e) {
  var target = e.target;
  var mask = document.getElementsByClassName('mask')[0];
  // console.log(target.src);
  var img = new Image();
  img.src = target.src;
  mask.innerHTML = "";
  mask.appendChild(img);
  mask.style.display = "flex";
}
window.onload = function () {
  var wrap = document.getElementsByClassName('wrap')[0];
  initData();
  waterfall("wrap","box");
  window.onscroll = function () {
    if (isNeedLoad()) {
      addPicture(10);
      waterfall("wrap","box");
    }
  }
  wrap.addEventListener("click",function (e) {
    e.stopPropagation();
    fullScreen(e);
  },false);
  document.onclick = function () {
    var mask = document.getElementsByClassName('mask')[0];
    mask.style.display = "none";
  };
};
