$(function() {
  var btns = document.getElementsByTagName('button');
  var $btns = $(btns);
  var divs = [];
  var imgs = [];
  for (var i = 1; i <= 6; i++) {
    var img = new Image();
    img.src = 'img/img' + i + '.JPG';
    imgs.push(img);
  }
  //清除上一布局的DOM结构
  function clear() {
    $(".gallery").html("");
    divs = [];
  }
  //创建Div并添加背景图片
  function createDiv(number,displayDivs) {
    for (var i = 0; i < number; i++) {
      var $newdiv = $("<div/>");
      divs.push($newdiv);
      divs[i].css("background", "url" + "(" + imgs[Math.floor((Math.random()*(imgs.length)))].src + ")");
      divs[i].css("background-size", "cover");
    }
    if (displayDivs === 3) {
      divs[0].css("background", "");
    }
    if (displayDivs > 4) {
      divs[0].css("background", "");
      divs[1].css("background", "");
      divs[3].css("background", "");
    }
  }
  //将Div添加到DOM中
  function addDiv(rootDivs) {
    for (var i = 0; i < rootDivs; i++) {
      $(".gallery").append(divs[i]);
    }
  }
  //根据不同图片数量生成不同布局
  function layoutOnePhoto() {
    createDiv(1,1);
    divs[0].addClass("onePhoto");
    addDiv(1);
  }

  function layoutTwoPhoto() {
    createDiv(2,2);
    divs[0].addClass("twoPhoto-left");
    divs[1].addClass("twoPhoto-right");
    addDiv(2);
  }

  function layoutThreePhoto() {
    createDiv(4,3);
    divs[1].addClass("threePhoto-left");
    divs[0].addClass("threePhoto-right");
    divs[2].addClass("threePhoto-right-top");
    divs[3].addClass("threePhoto-right-bottom");
    divs[0].append(divs[2]);
    divs[0].append(divs[3]);
    addDiv(2);
  }

  function layoutFourPhoto() {
    createDiv(4,4);
    for (var i = 0; i < divs.length; i++) {
      divs[i].addClass("fourPhoto");
    }
    addDiv(4);
  }

  function layoutFivePhoto() {
    createDiv(8,5);
    divs[1].addClass("fivePhoto-left");
    divs[0].addClass("fivePhoto-right");
    divs[2].addClass("fivePhoto-left-top");
    divs[3].addClass("fivePhoto-left-bottom");
    divs[4].addClass("fivePhoto-left-bottom-left");
    divs[5].addClass("fivePhoto-left-bottom-right");
    divs[6].addClass("fivePhoto-right-top");
    divs[7].addClass("fivePhoto-right-bottom");
    divs[3].append(divs[4]);
    divs[3].append(divs[5]);
    divs[1].append(divs[2]);
    divs[1].append(divs[3]);
    divs[0].append(divs[6]);
    divs[0].append(divs[7]);
    addDiv(2);
  }

  function layoutSixPhoto() {
    createDiv(9,6);
    divs[1].addClass("sixPhoto-left");
    divs[0].addClass("sixPhoto-right");
    divs[2].addClass("sixPhoto-left-top");
    divs[3].addClass("sixPhoto-left-bottom");
    divs[4].addClass("sixPhoto-left-bottom-left");
    divs[5].addClass("sixPhoto-left-bottom-right");
    divs[6].addClass("sixPhoto-right-top");
    divs[7].addClass("sixPhoto-right-bottom");
    divs[8].addClass("sixPhoto-right-bottom");
    divs[3].append(divs[4]);
    divs[3].append(divs[5]);
    divs[1].append(divs[2]);
    divs[1].append(divs[3]);
    divs[0].append(divs[7]);
    divs[0].append(divs[8]);
    divs[0].append(divs[6]);
    addDiv(2);
  }
  //按钮点击事件
  for (var i = 1; i <= $btns.length; i++) {
    $("#btn" + i).click(function() {
      clear();
      var imageNumber = parseInt(this.name);
      console.log(imageNumber);
      switch (imageNumber) {
        case 1:
          layoutOnePhoto();
          break;
        case 2:
          layoutTwoPhoto();
          break;
        case 3:
          layoutThreePhoto();
          break;
        case 4:
          layoutFourPhoto();
          break;
        case 5:
          layoutFivePhoto();
          break;
        case 6:
          layoutSixPhoto();
          break;
        default:
          layoutTwoPhoto();
      }
    });
  }
  console.log(imgs);
  //默认显示两张图片布局
  layoutTwoPhoto();

});
