window.onload = function() {
  $ = function(ele) {
    return document.querySelector(ele);
  };
  var input = $('input');
  var display = $('.display');
  var data = [];

  function initData(mood) {
    var inputValue = input.value;
    var test = /^\d+$/.test(inputValue);
    if (test && (inputValue > 10) && (inputValue < 100)) {
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
    } else {
      alert("请输入10到100之间的数字");
      input.value = "";
    }

  }

  function addEle(data) {
    display.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      var newDiv = document.createElement('div');
      newDiv.style.height = data[i] * 4 + 'px';
      display.appendChild(newDiv);
    }
  }

  function output(mood) {
    console.log(mood);
    if ((data.length < 60) || (mood === 'pop') || (mood === 'shift')) {
      initData(mood);
      addEle(data);
    } else {
      alert("队列元素已超过限制！");
    }

  }

  function remove(e) {
    var target = e.target || window.target;
    //获取点击元素的下标
    var index = [].indexOf.call(target.parentNode.children, target);
    data.splice(index, 1);
    addEle(data);
  }

  function randomNum(count) {
    data = [];
    for (var i = 0; i < count; i++) {
      var num = Math.floor(Math.random() * 90 + 10);
      data.push(num);
    }
    addEle(data);
  }



  function BubbleSort(el) {
  	var len = data.length,
  		div = el.children,
  		i = 0,
  		j = 0,
  		temp,
  		timer = null;
      clearInterval(timer);
  	  timer = setInterval(swap,15);

  	function swap() {
  		if(i < len ){
  			if(j < len - i -1) {
  				if(data[j] > data[j+1]) {
  					temp = data[j];
  					data[j] = data[j+1];
  					data[j+1] = temp;
  					div[j].style.height = data[j] * 4 + 'px';
  					div[j+1].style.height = data[j+1] * 4 + 'px';
  				}
  				j++;
  				return;
  			} else {
  				j = 0;
  			}
  			i++;
  		} else {
  			clearInterval(timer);
  		}

  	}
  }

  function clear() {
    data = [];
    addEle(data);
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
  $('#randomNumber').onclick = function() {
    randomNum(50);
  };
  $('#sort').onclick = function() {
    BubbleSort(display);
  };
  $('#clear').onclick = function() {
    clear();
  };
};
