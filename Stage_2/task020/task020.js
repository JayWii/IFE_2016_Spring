window.onload = function() {
  $ = function(ele) {
    return document.querySelector(ele);
  };
  var input = $('textarea');
  var display = $('.display');
  var data = [];

  function initData(mood) {
    var inputValue = input.value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(d) {
      return d !== '';
    });
    input.value = "";
    switch (mood) {
      case 'push':
        for (var i = 0; i < inputValue.length; i++) {
          data.push(inputValue[i]);
        }
        break;
      case 'pop':
        data.pop(inputValue);
        break;
      case 'shift':
        data.shift(inputValue);
        break;
      case 'unshift':
        for (var i = 0; i < inputValue.length; i++) {
          data.unshift(inputValue[i]);
        }
        break;
    }
  }

  function addEle() {
    display.innerHTML = data.map(function(d) {
      return "<div>" + d + "</div>";
    }).join('');
  }

  function search(text) {
    addEle();
    var flag = false;
    for (var i = 0; i < data.length; i++) {
      if (data[i].indexOf(text) >= 0) {
        flag = true;
        var div = display.children;
        div[i].style.backgroundColor = "blue";
        div[i].style.color = "#fff";
      }
    }
    if (!flag) {
      alert("不存在!");
    }
  }

  function output(mood) {
    console.log(mood);
    initData(mood);
    addEle();
  }

  function remove(e) {
    var target = e.target || window.target;
    //获取点击元素的下标
    var index = [].indexOf.call(target.parentNode.children, target);
    data.splice(index, 1);
    addEle();
  }

  $("#left-in").onclick = function() {
    output("unshift");
  };
  $("#right-in").onclick = function() {
    output("push");
  };
  $("#left-out").onclick = function() {
    output("shift");
  };
  $("#right-out").onclick = function() {
    output("pop");
  };
  display.onclick = function(e) {
    remove(e);
  };
  $("#search").onclick = function () {
    var searchValue =$('input').value;
    search(searchValue);
  };
};
