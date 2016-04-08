window.onload = function() {
  $ = function(ele) {
    return document.querySelector(ele);
  };
  var input = $('textarea');
  var display = $('.display');
  var data = [];

  function initData(mood) {
    var inputValue = input.value;
    var test = /^\d+$/.test(inputValue);
    if (test || mood === 'pop' || mood === 'shift') {
      switch (mood) {
        case 'push':
          data.push(inputValue);
          break;
        case 'pop':
          data.pop(inputValue);
          break;
        case 'shift':
          data.shift(inputValue);
          break;
        case 'unshift':
          data.unshift(inputValue);
          break;
      }
    }else{
      alert("请输入数字");
      input.value = "";
    }

  }

  function addEle() {
    display.innerHTML = data.map(function(d) {
      return "<div>" + d + "</div>";
    }).join('');
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
};
