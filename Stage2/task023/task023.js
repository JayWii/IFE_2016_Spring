window.onload = function() {
  $ = function(ele) {
    return document.querySelector(ele);
  };
  var root = $('#root');
  var result = [];
  var index = 0;
  var input = $("input");

  function Tree() {}
  Tree.prototype = {
    constructor: Tree,
    // 深度优先遍历
    traverseDF: function(node) {
      if (node) {
        result.push(node);
        for (var i = 0; i < node.children.length; i++) {
          this.traverseDF(node.children[i]);
        }
      }
    },

    //广度优先遍历
    traverseBF: function(node) {
      if (node) {
        result.push(node);
        this.traverseBF(node.nextElementSibling);
        node = result[index++];
        this.traverseBF(node.firstElementChild);
      }
    }
  };

  var count = 0;
  var flag = true;

  function animate() {
    flag = false;
    if (count < result.length) {
      flag = false;
      if (count > 0) {
        result[count - 1].style.background = "#fff";
      }
      var nodeContent = result[count].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
      result[count].style.background = "#71D2FF";
      if (nodeContent === input.value) {
        alert("找到了！");
        clear();
        return;
      }
      count++;
      setTimeout(animate, 500);
    } else {
      clear();
      alert("搜索结束");
    }
  }

  function clear() {
    for (var i = 0; i < result.length; i++) {
      result[i].style.background = "#fff";
    }
    result = [];
    count = 0;
    flag = true;
    input.value = "";
  }

  var tree = new Tree();

  $("#df").onclick = function() {
    if (!flag) {
      alert("请等待上一遍历执行结束");
      return false;
    }
    tree.traverseDF(root);
    animate(tree);
  };
  $("#bf").onclick = function() {
    if (!flag) {
      alert("请等待上一遍历执行结束");
      return false;
    }
    tree.traverseBF(root);
    animate(tree);
    index = 0;
  };
};
