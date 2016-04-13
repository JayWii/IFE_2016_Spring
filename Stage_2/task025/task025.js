window.onload = function() {
  $ = function(ele) {
    return document.querySelector(ele);
  };
  var root = $('.root');
  var result = [];
  var index = 0;
  var input = $("input");
  var selectedNode; //记录选中的节点

  function Tree(root) {}
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
  var timer;

  function animate() {
    timer = setInterval(function() {
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
          input.value = "";
          return;
        }
        count++;
      } else {
        clear();
        alert("搜索结束");
      }
    }, 500);
  }

  function clear() {
    var divs = root.parentNode.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
      divs[i].style.background = "#fff";
    }
    clearInterval(timer);
    result = [];
    count = 0;
    flag = true;
  }

  var nodes = root.parentNode.getElementsByTagName('div');
  // for (var i = 0; i < nodes.length; i++) {
  //   nodes[i].onclick = function(e) {
  //     var target = e.target;
  //     clear();
  //     target.style.backgroundColor = '#71D2FF';
  //     e.stopPropagation(); //阻止事件冒泡
  //     selectedNode = target;
  //   };
  // }
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].className = "iconfont icon-fold";
    var btns = document.createElement("div");
    var addbtn = document.createElement("i");
    var removebtn = document.createElement("i");
    addbtn.innerHTML = "&#xe664;";
    removebtn.innerHTML = "&#xe616;";
    addbtn.setAttribute('class','iconfont');
    removebtn.setAttribute('class','iconfont');
    btns.appendChild(addbtn);
    btns.appendChild(removebtn);
    // nodes[i].appendChild(btns);
  }

  function removeNode() {
    if (selectedNode.className === "root") {
      alert("不能删除根节点");
      return;
    }
    var parent = selectedNode.parentNode;
    parent.removeChild(selectedNode);
  }

  function addNode() {
    if (input.value) {
      var newdiv = document.createElement("div");
      newdiv.innerHTML = input.value;
      selectedNode.appendChild(newdiv);
      //更新节点
      nodes = root.getElementsByTagName('div');
    } else {
      alert("请输入要增加的节点内容");
    }

  }

  var tree = new Tree();

  $("#remove").onclick = function() {
    removeNode();
  };
  $("#add").onclick = function() {
    addNode();
  };
  $("#df").onclick = function() {
    clear();
    tree.traverseDF(root);
    animate(tree);
  };
  $("#bf").onclick = function() {
    clear();
    tree.traverseBF(root);
    animate(tree);
    index = 0;
  };
};
