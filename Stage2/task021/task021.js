window.onload = function() {
  $ = function(ele) {
    return document.querySelector(ele);
  };
  //使用构造函数模式创建Item对象
  function Item(input,data,display) {
    this.input = input;
    this.data = data;
    this.display = display;
    this.displayOringinColor = "#93D1FF";
  }
  //使用原型模式定义方法
  Item.prototype = {
    constructor: Item,
    //生成保存数据的数组
    initData : function () {
      var inputValue = this.input.value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(d) {
        return d !== '';
      });
      this.input.value = "";
      for (var i = 0; i < inputValue.length; i++) {
          var flag = false;
          for (var j = 0; j < this.data.length; j++) {
            if (inputValue[i] === this.data[j] ) {
              flag = true;
            }
          }
          if (!flag) {
            if (this.data.length >= 10) {
              this.data.shift();
            }
            this.data.push(inputValue[i]);
          }
      }
    },
    //将数组中的数据添加到DOM中
    addEle : function () {
      this.display.innerHTML = this.data.map(function(d) {
        return "<div>" + d + "</div>";
      }).join('');
    },
    //封装保存与添加操作
    output : function () {
      this.initData();
      this.addEle();
    },
    //获取点击或悬停事件目标的索引
    getIndex : function (e) {
      var target = e.target || window.target;
      var index = [].indexOf.call(target.parentNode.children, target);
      return index;
    },
    //鼠标悬停
    mouseIn : function (e) {
      var div = this.display.children;
      this.displayOringinColor = div[this.getIndex(e)].style.backgroundColor;
      div[this.getIndex(e)].innerHTML = "点击确认删除 " + div[this.getIndex(e)].innerHTML;
      div[this.getIndex(e)].style.backgroundColor = "red";
      div[this.getIndex(e)].style.color = "#fff";
    },
    //鼠标移出
    mouseOut : function (e) {
      var div = this.display.children;
      div[this.getIndex(e)].innerHTML = this.data[this.getIndex(e)];
      div[this.getIndex(e)].style.backgroundColor = this.displayOringinColor;
    },
    //删除元素
    remove : function (e) {
      this.data.splice(this.getIndex(e), 1);
      this.addEle();
    },
    getTags : function (e) {
      var str = tagsInput.value;
      console.log(str);
      if(/(,| |\，)$/.test(str)||e.keyCode===13){
        this.output();
      }
    }
  };

  var tagsInput = $('input');
  var hoobiesInput = $('textarea');
  var tagsDisplay = $('.tagsDisplay');
  var hobsDisplay = $('.hobsDisplay');
  var tagsData = [];
  var hobsData = [];

  var tags = new Item(tagsInput,tagsData,tagsDisplay);
  var hobbies = new Item(hoobiesInput,hobsData,hobsDisplay);

  tagsInput.onkeyup = function (e) {
    tags.getTags(e);
  };
  $("#confirm").onclick = function () {
    hobbies.output();
  };
  tagsDisplay.onclick = function (e) {
    tags.remove(e);
  };
  hobsDisplay.onclick = function (e) {
    hobbies.remove(e);
  };
  tagsDisplay.onmouseover = function (e) {
    tags.mouseIn(e);
    e.stopPropagation();
  };
  tagsDisplay.onmouseout = function (e) {
    tags.mouseOut(e);
    e.stopPropagation();
  };
};
