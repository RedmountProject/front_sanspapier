/*  Copyright (C) 2013 DELABY Benoit

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
var spSlider = function(id, speed, width, numberItems) {
    this.id = id;
    
    var that = this;
    
    var current_place = 0;
    var modulo = parseInt(numberItems/3);
    
    this.width = width;
    this.speed = speed;
    this.numberItems = numberItems;
    
    this.domNext = $("."+this.id+" .next");
    this.domPrev = $("."+this.id+" .prev");
    this.domNext.show();
    this.domPrev.hide();
    
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
    
    this.domSlider = $("."+this.id+" .slider_cont");
    
    if(numberItems==0) {
        this.domNext.hide();
        this.domPrev.hide();
        this.domSlider.html('<div class=\"sliderNoResult\" style="color: #999;">Aucun résultat</div>');
    }
    
    if(numberItems==1) {
        this.domSlider.css({
            'marginLeft':'100px'
        });
    }
    
    else if(numberItems==2) {
        this.domSlider.css({
            'marginLeft':'50px'
        });
    }
    
    else this.domSlider.animate({
        'marginLeft': '0px'
    }, 0);
    
    this.next = function() {
        current_place +=3;
        
        this.domPrev.show();
        if(current_place/3>=modulo || numberItems-current_place==3) {
            this.domNext.hide();
            that.move();
        }
        else
            this.domNext.show();
        that.move();
    }
    
    this.prev = function() {
        this.domNext.show();
        current_place -=3;
        if(current_place==0)
            this.domPrev.hide();
        else
            this.domPrev.show();
        that.move();
    }
        
    this.move = function() {
        that.domSlider.animate(
        {
            'marginLeft': -1.0*current_place*that.width
        }, that.speed
        )
    }
}

var horizontal_slider = function(slider_id, bar_id, id_feedback,action) {
    var myaction = action;
    var price;
    this.slider = slider_id;
    this.bar = bar_id;
    this.id_feedback = id_feedback;
    var that = this;
    
    
    var firstTime = true;
    var $constrain = $('#'+that.bar);
    var $button = $('#'+that.slider);
    var offset = 0;
    
    var width = $constrain.outerWidth() - $button.outerWidth();
    
    
    
    var mouseleave = false;
    var moving_value = 175;
    var firstcondition = false;
    
    var bar_offset = Math.ceil($constrain.position().left);
    
    $button.drag("start",function(ev,dd){
        if(firstTime){
            offset = dd.originalX - moving_value;
            firstTime = false;
        }    
        dd.limit = $constrain.offset();      
        dd.limit.left -= offset;  
        
        dd.limit.right = dd.limit.left + $constrain.outerWidth() - $(this).outerWidth() ;
        
    }).click(function(){
        myaction(price);
    }).drag(function( ev, dd ){
       
        firstcondition = true;
       
        moving_value = Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX - offset ) );

        if(moving_value <= dd.limit.right && moving_value >= dd.limit.left ) {  
            $( this ).css({
                left: moving_value
            });
            sendvalue();
        }
    },{
        click:true
    }).mouseleave(function(){
        mouseleave = true;
        firstTime = true;
    }).mouseover(function(){
        mouseleave = false;
    });
      
    $(document.body).mouseup(function(){
        
        
        if (firstcondition) {
            myaction(price);
        }
        mouseleave = false;
        firstcondition = false;
    });
      
    var sendvalue = function() {
         
        price = Math.ceil(((moving_value - bar_offset)/width)*30);
        
        if (price > 30) price = 30;
        switch (price) {
            
            case 0 :
                $('#'+that.id_feedback).html('Domaine public');
                break;
            case 30 :
                $('#'+that.id_feedback).html('Tous les prix'); 
                break;
            default:
                $('#'+that.id_feedback).html('Inférieur à '+price+' \u20ac');
                break;
        }

    } 
      
    sendvalue();
    
    this.setValue = function(session_price) {
        
        if (session_price > 30) session_price = 30;
        switch (session_price) {
            
            case 0 :
                $('#'+that.id_feedback).html('Domaine public');
                break;
            case 30 :
                $('#'+that.id_feedback).html('Tous les prix'); 
                break;
            default:
                $('#'+that.id_feedback).html('Inférieur à '+session_price+' \u20ac');
                break;
        }
        
        moving_value = 64 + Math.ceil(((170 - 64)/30)*session_price);
         
        $button.css({
            left: moving_value
        });
    }
        
}
      


var toggle = function(id,action){
    
    this.id = id;
    var state = true;
    var that = this;
    
    $('#'+this.id).click(function() {
        if (!state){
            $(this).css("background-color", '#000');
            state = true;
            action(1);
        }
        else {
            $(this).css("background-color", '#E2E2E2');
            state = false;
            action(0);
        }
    });
    
    this.setValue = function(sessionValue) {
        if (sessionValue == 1){
            $('#'+that.id).css("background-color", '#000');
            state = true;
        }
        else {
            $('#'+that.id).css("background-color", '#E2E2E2');
            state = false;
        }
    }
}



var gradienter = function(parent, child, ratio){
    var intStep = 0;
    var jDiv = null;
    
    var height= $(parent).height();
    var max = 15;
    
    var backColor = $(child).css("background-color");
    
    for (intStep = 0 ; intStep <= max; intStep++){

        jDiv = $( '<div></div>' );
 
        jDiv.css ({
            background: backColor,
            opacity: (intStep / max ),
            bottom: ((height/ratio - (intStep * height/(ratio*max)) ) + "px"),
            left: "0px",
            position: "absolute"
        }).width($(parent).width()).height((height/ratio)/max);
 

        $(parent).append( jDiv );
    }
}

var addBlank = function(parent){
    
    $(parent).append('</br></br></br></br></br></br></br></br>');
    
}