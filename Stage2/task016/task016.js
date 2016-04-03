/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city = document.getElementById('aqi-city-input');
var aqi = document.getElementById('aqi-value-input');
var table = document.getElementById('aqi-table');
var btn = document.getElementById('add-btn');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var strCity = city.value.trim();
  var strAqi = aqi.value.trim();
  var cityTag  = true;
  var qiTag = true;
  if (!strCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
		alert("城市名必须为中英文字符！");
    cityTag = false;
	}
	if (!strAqi.match(/^\d+$/)) {
		alert("空气质量指数必须为整数！");
    qiTag = false;
	}
  if (cityTag && qiTag) {
    aqiData[strCity] = strAqi;
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  table.innerHTML = '';
  for (var item in aqiData) {
    if (table.children.length === 0) {
      var firstTr = document.createElement('tr');
      firstTr.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
      table.appendChild(firstTr);
    }
    var newTr = document.createElement('tr');
    var newTd1 = document.createElement('td');
    var newTd2 = document.createElement('td');
    var newTd3 = document.createElement('td');
    newTd1.innerHTML = item;
    newTd2.innerHTML = aqiData[item];
    newTd3.innerHTML = "<button class='del-btn'>删除</button>";
    newTr.appendChild(newTd1);
    newTr.appendChild(newTd2);
    newTr.appendChild(newTd3);
    table.appendChild(newTr);
  }
}
//点击按确认后清楚输入框内的数据
function clear() {
  city.value = '';
  aqi.value = '';
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
  clear();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  var temp = e.target.parentNode.parentNode;
  var city = temp.children[0].innerHTML;
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  btn.addEventListener('click',addBtnHandle,false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  table.addEventListener('click',delBtnHandle,false);
}

init();
