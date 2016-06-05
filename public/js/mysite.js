// click and jump to the news

(function(window){
  var news=document.querySelectorAll('.news-container');
  function go(){
    window.location.href = 'news?id='+this.getAttribute('data-id');
  }
  for(var i=0;i<news.length;i++){
    if(news[i].addEventListener){
      news[i].addEventListener('click',go);
    }
    else if(news[i].attachEvent){
      news[i].attachEvent('onclick',go);
    }
    else news[i].onclick = go;
  }
})(window);