var imgs = [];
var page = 0;

//初始化，预先加载30张图片

function getImage() {
  $.get("http://test.facelending.com:3000/?source=500px&page=" + page).done(function (data) {
    for (var item in data) {
        var img = new Image();
        img.src = data[item].image.small;
        imgs.push(img);
    }
    addPicture(30,data);
    waterfall("wrap","box");
  });
}
function addPicture(number,photos) {
  console.log("addPic");
  var wrap = document.getElementsByClassName('wrap')[0];
  var imgW = 350;
  for (var i = 0; i < number; i++) {
    var newBox = document.createElement("div");
    var newImage = document.createElement("div");
    var img = new Image();
    img.src = imgs[i].src;
    img.style.height = (imgW / photos[i].aspect_ratio) + "px";
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
      console.log(boxs[i].offsetHeight);
    }else {
      var minColH = Math.min.apply(null,colHeight);
      var minColHIndex = getIndex(colHeight,minColH);
      boxs[i].style.position = "absolute";
      boxs[i].style.top = minColH + "px";
      boxs[i].style.left = boxW * minColHIndex +"px";
      colHeight[minColHIndex] += boxs[i].offsetHeight;
    }
  }
  flag = true;
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
  startMove(mask.children[0],{opacity:100});
}
var flag = true;//判断是否加载完成

window.onload = function () {
  var loader = document.getElementsByClassName('loading')[0];
  var wrap = document.getElementsByClassName('wrap')[0];
  loader.style.display = "none";
  wrap.style.display = "block";
  getImage();
  window.onscroll = function () {
    if (isNeedLoad()&&flag) {
      flag = false;
      ++page;
      imgs = [];
      getImage();
    }
  }
  wrap.addEventListener("click",function (e) {
    e.stopPropagation();
    fullScreen(e);
  },false);
  document.onclick = function () {
    var mask = document.getElementsByClassName('mask')[0];
    startMove(mask.children[0],{opacity:0},function () {
      mask.style.display = "none";
    });
  };
};
