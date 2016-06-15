(function(window){
  /**
   * carousel operating script
   */
  var imageWidth = 77;
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
      _id:qe.attr('data-id'),
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

  function changeCurrentDay() {
    imageContainer.animate({left:'-'+(imageWidth*carouselPos)+'em'},'fast');
    days.removeClass('calendar-day-current');
    info[carouselPos].dayEl.addClass('calendar-day-current');
    title.attr('data-id',info[carouselPos]._id);
    title.html(info[carouselPos].title);
    abstract.html(info[carouselPos].abstract);
  }
  // search for match span element and store in 'info' array  
  days.each(function(){
    var i=0,date=0;
    for(;i<info.length;i++){
      date = this.getAttribute('data-date');
      if(info[i].date === date){
        // bind click event for calendar
        info[i].dayEl = $(this).attr('data-index',info[i].index).click(function(){
          carouselPos = this.getAttribute('data-index');
          changeCurrentDay();
        });
        // initialize calendar style
        if(i === 0){
          info[i].dayEl.addClass('calendar-day-current');
          title.attr('data-id',info[i]._id);
          title.html(info[i].title);
          abstract.html(info[i].abstract);
        }
      }
    }
  });
  // bind click event for arrows

  leftArrow.click(function(){
    if(carouselPos < info.length-1){
      carouselPos++;
      changeCurrentDay();
    }
  });
  rightArrow.click(function(){
    if(carouselPos > 0){
      carouselPos--;
      changeCurrentDay();
    }    
  });

  // carousel auto display
  setInterval(function(){
    carouselPos++;    
    days.removeClass('calendar-day-current');
    if(carouselPos < info.length){
      imageContainer.animate({left:'-'+imageWidth*carouselPos+'em'},'slow');
    }
    else{
      carouselPos=0;
      imageContainer.animate({left:'0'},'normal');
    }
    info[carouselPos].dayEl.addClass('calendar-day-current');
    title.attr('data-id',info[carouselPos]._id);
    title.html(info[carouselPos].title);
    abstract.html(info[carouselPos].abstract);
  },4000);
  // click and jump to the news
  function go(){    
    window.location.href = 'post?id='+this.getAttribute('data-id');
  }
  $('.news-container').click(go);
  // click image or title
  images.click(go);
  $('.carousel-title').click(go);
})(window);

