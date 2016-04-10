window.onload = function() {
  $ = function(ele) {
    return document.querySelector(ele);
  };
  var root = $('.div1');
  var result = [];

  function Tree() {}
  Tree.prototype = {
    constructor: Tree,
    preorder: function(node) {
      if (!node.firstElementChild) {
        result.push(node);
      } else {
        result.push(node);
        this.preorder(node.firstElementChild);
        this.preorder(node.lastElementChild);
      }
    },
    inorder: function(node) {
      if (!node.firstElementChild) {
        result.push(node);
      } else {
        this.inorder(node.firstElementChild);
        result.push(node);
        this.inorder(node.lastElementChild);
      }
    },
    postorder: function(node) {
      if (!node.firstElementChild) {
        result.push(node);
      } else {
        this.postorder(node.firstElementChild);
        this.postorder(node.lastElementChild);
        result.push(node);
      }
    },
  };

  var count = 0;
  var flag = true;

  function animate(tree) {
    flag = false;
      if (count < result.length) {
        flag = false;
        if (count > 0) {
          result[count-1].style.background = "#fff";
        }
        result[count].style.background = "#71D2FF";
        count++;
        setTimeout(animate, 500);
      }else{
        result[count-1].style.background = "#fff";
        result = [];
        count = 0;
        flag = true;
        alert("遍历结束");
      }
  }

  var tree = new Tree();

  $("#preorder").onclick = function () {
    if (!flag) {
      alert("请等待上一动画执行结束");
      return false;
    }
    tree.preorder(root);
    console.log(result);
    animate(tree);
  };
  $("#inorder").onclick = function () {
    if (!flag) {
      alert("请等待上一动画执行结束");
      return false;
    }
    tree.inorder(root);
    console.log(result);
    animate(tree);
  };
  $("#postorder").onclick = function () {
    if (!flag) {
      alert("请等待上一动画执行结束");
      return false;
    }
    tree.postorder(root);
    console.log(result);
    animate(tree);
  };

};
