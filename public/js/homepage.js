(function(window){
  // click and jump to the news
  var news=document.querySelectorAll('.news-container');
  function go(){
    window.location.href = 'news?id='+this.getAttribute('data-id');
  }
  for(var i=0;i<news.length;i++){
    $(news[i]).bind('click',go);
  }

  /**
   * carousel operating script
   */
  var days = $('.calendar-day'),
      images = $('.carousel-image'),
      imageContainer = $('.carousel-image-container'),
      title = $('.carousel-title'),
      abstract = $('.carousel-abstract'),
      leftArrow = $('.calendar-left'),
      rightArrow = $('.calendar-right'),
      carouselPos = 0,
      info = [];
  // Get information from img tags
  images.each(function (index,el) {
    qe = $(el);
    info.push({
      index:qe.attr('data-index'),
      date:qe.attr('data-date'),
      title:qe.attr('data-title'),
      abstract:qe.attr('data-abstract'),
      dayEl:null
    });
  });
  // sort by index
  info.sort(function (a,b) {
    return a.index-b.index;
  });
  // search for match span element and store in 'info' array  
  days.each(function(){
    var i=0,date=0;
    for(;i<info.length;i++){
      date = this.getAttribute('data-date');
      if(info[i].date === date){
        // bind click event for calendar
        info[i].dayEl = $(this).attr('data-index',info[i].index).click(function(){
          carouselPos = this.getAttribute('data-index');
          imageContainer.animate({left:'-'+(86*carouselPos)+'em'},'fast');
          days.removeClass('calendar-day-current');
          $(this).addClass('calendar-day-current');
        });
        // initialize calendar style
        if(i === 0){
          info[i].dayEl.addClass('calendar-day-current');
        }
      }
    }
  });
  // bind click event for arrows
  function changeCurrentDay() {
    imageContainer.animate({left:'-'+(86*carouselPos)+'em'},'fast');
    days.removeClass('calendar-day-current');
    info[carouselPos].dayEl.addClass('calendar-day-current');
  }
  leftArrow.click(function(){
    if(carouselPos > 0){
      carouselPos --;
    }
    changeCurrentDay();
  });
  rightArrow.click(function(){
    if(carouselPos < info.length-1){
      carouselPos ++;
    }
    changeCurrentDay();
  });

  // carousel auto display
  setInterval(function(){
    carouselPos++;
    days.removeClass('calendar-day-current');
    if(carouselPos < info.length){
      imageContainer.animate({left:'-86em'},'slow');
    }
    else{
      carouselPos=0;
      imageContainer.animate({left:'0'},'normal');
    }
    info[carouselPos].dayEl.addClass('calendar-day-current');
    title.html(info[carouselPos].title);
    abstract.html(info[carouselPos].abstract);
  },3000); 
})(window);

