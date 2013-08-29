var spSlider = function(id, speed, width, numberItems) {
    
    this.id = id;
    
    var that = this;
    
    var current_place = 0;
    
    this.width = width;
    this.speed = speed;
    this.numberItems = numberItems;
    
    this.domNext = $(this.id+" .next");
    this.domPrev = $(this.id+" .prev");
    
    if(numberItems<=3) {
        this.domNext.hide();
        this.domPrev.hide();
    }
    
    this.domNext.click(function(){
        that.next();
    });
    
    this.domPrev.click(function(){
        that.prev();
    });
    
    this.domSlider = $(this.id+" .slider_cont");
    
    this.next = function() {
        current_place +=3;
        if(current_place>=numberItems) {
            current_place=0;
            that.move();
        }
        else
            that.move();
    }
    
    this.prev = function() {
        current_place -=3;
        if(current_place<=-1)
            current_place=0;
        else
            that.move();
    }
        
    this.move = function() {
        console.log(current_place);
        that.domSlider.animate(
        {
            marginLeft: -1.0*current_place*that.width
            }, that.speed
        )
        }
}

