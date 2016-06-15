(function (window) {
  var btn = document.getElementById('search-button');
  var input = document.getElementById('search-input');
  function gotoSearchResult() {
    var query = input.value.trim().split(/[^\u4e00-\u9fa5a-zA-Z0-9]+|\s+/),
        i=0;
    // remove empty keys
    for(;i<query.length;i++){
      if(query[i].length === 0) query.splice(i,1);
    }
    if(query.length === 0) alert('请输入搜索关键字');
    else if(query.length === 1 && query[0].length < 2) alert('搜索关键字过短：请至少输入两个字');
    else{
      window.location.href = 'search?keys=' + encodeURIComponent(query.join('|'));
    }
  }
  if(btn.addEventListener){
    btn.addEventListener('click',gotoSearchResult);
  }
  else{
    btn.attachEvent('onclick',gotoSearchResult);
  }
})(window);