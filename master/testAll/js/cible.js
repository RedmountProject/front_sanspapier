
var getcosdata = function(value){
    var doublepi = 2*Math.PI;
    
    if (value<0) value = - value;
    
    var entry = Math.floor(((value % doublepi)/doublepi) * 1000) ;
    return window.sanspapier.cible.cos[entry];
}

var getsindata = function(value){
    //console.log(value);
    var doublepi = 2*Math.PI;
    if (value<0) {   
    var entry = 1000 - Math.floor((((-1*value) % doublepi)/doublepi) * 1000) ;
    }
    else {
       var entry = Math.floor(((value % doublepi)/doublepi) * 1000) ; 
    }
    return window.sanspapier.cible.sin[entry];
}

var logRepartition = function (valuein,curving) {    
    var temp = (valuein - 1)*curving; 
    var nominateur = Math.exp(temp) - 1;
    var denominateur = Math.exp(-curving) -1; 
    var result = (nominateur/denominateur) *(-1) + 1 ; 
    return result;   
}


var sortDisplay3D = function() {
    
    var global = window.sanspapier.cible;
    
    if (global.turnable) {
        var elements = global.bookElements;
        var images = global.imageElements;
        var length = elements.length;
    
        var yComparator = function(a,b) {
            return (a.attr("y")+a.attr("height")) - (b.attr("y")+b.attr("height"));
        }
        elements.sort(yComparator);
        
        
        global.ellipseRef.toBack();
        global.scapeRef.toBack();
    
        elements[0].insertAfter(global.ellipseRef); 
        elements[0].previousLayer = elements[0].prev;
        elements[0].child.insertAfter(elements[0]);
        elements[0].child.previousLayer= elements[0];
        
        for(var i=1;i<length;i++){
            elements[i].insertAfter(elements[i-1].child);
            elements[i].previousLayer = elements[i-1].child;
            elements[i].child.insertAfter(elements[i]);
            elements[i].child.previousLayer = elements[i];            
        }
    }
}




var group = function (i,paper) {
    var sp = window.sanspapier.cible;   ///// global container reference
    
    this.index = i;
    this.set = paper.set();
    this.domRef;
    
    var that = this;
    var animable = true;
    var onfront = false;
    
    this.state = false;
    this.activate = true;
       
    var animout = function(el){
        el.insertAfter(el.previousLayer);
        el.animate({
            zoom:1
        },'50'); 
    },
    animin = function(el){
        el.toFront();
        el.animate({
            zoom: sp.book_zoomed_ratio
        },'50'); 
    };
    this.hover = function() {
        if(!onfront){
            if (animable){      
                that.set.forEach(animin,1);
                $("#"+that.domRef).trigger('customHover');     
            }
        }
        onfront = true;       
    }
    this.unhover = function(){
        onfront = false;
        if (animable){
            that.set.forEach(animout,1);
            $("#"+that.domRef).trigger('customUnHover'); 
        }
    }
    
    this.setTrue = function(){
        if(that.activate){
            if(!that.state){
                that.state = true;

                for(var i=0;i<window.sanspapier.cible.groups.length;i++){
                    if(i!=that.index){
                        window.sanspapier.cible.groups[i].setFalse();
                    }
                }
                that.hover();
            }
        }
    }
    this.setFalse = function(){
        if(that.state){
            that.state = false;
            that.unhover();
        }
    }
    this.doNothing = function(){}
    this.addElement = function(el) {
        that.set.push(el);
        el.hover(
            function() {
                that.setTrue();
            },
            that.doNothing());
    }
    
    this.disableAnim = function(){
        animable = false;
    }
}



Raphael.fn.book = function(ellipse_coef,radius,i){ 
    
    var sp = window.sanspapier.cible;   ///// global container reference
    var paper = this; 
    
    //////////////////////////
    
    
    //////////////////////////custom attributes for manipulating attributes as functions of variables
    
    paper.customAttributes.turn = function(rad) {     
        var attr = {
            x: getcosdata(rad)*this.data("coef") + sp.centerX - sp.book_width/2 + this.data("margin"),
            y: getsindata(rad)*this.data("coef")*sp.ellipse_ratio + sp.centerY - sp.book_height + this.data("margin")
        }
        this.radius = rad;
        this.realX = this.attr("x") - this.data("margin");
        this.realY = this.attr("y")- this.data("margin");
        sortDisplay3D();
        return attr;     
    }
    
    paper.customAttributes.zoom = function(zoom) {
        var attr = {
            x: this.realX - (zoom*sp.book_width/2 - sp.book_width) - sp.book_width/2 + this.data("margin") ,
            y: this.realY - (sp.book_height*zoom - sp.book_height ) + this.data("margin"),
            width: sp.book_width * zoom  - this.data("margin")*2 ,
            height: sp.book_height * zoom - this.data("margin")*2 
        }
        return attr;
    }
       
    //////////////// create elements 
    var src = "/front_sanspapier/cible_dev/images/"+(i+1)+"_fc.jpg";
    var bookfront = paper.image(src,0,0, sp.book_width - 2*sp.book_margin,sp.book_height - 2*sp.book_margin)
    .data("coef",ellipse_coef)
    .data("margin",sp.book_margin)
    .attr({
        turn: radius,
        fill: sp.white,
        stroke: 'no-stroke'
    });
    var bookback = paper.rect(0,0,sp.book_width,sp.book_height)
    .data("coef",ellipse_coef)
    .data("margin",0)
    .attr({
        turn: radius,
        fill: sp.book_fill,
        'fill-opacity':'0.2',
        stroke: sp.book_stroke
    }).insertBefore(bookfront);
    
    /////////////////////////////bind few fields to those elements
    bookback.place = i;
    bookback.domId = "book_"+i;
    bookback.node.setAttribute("id",bookback.domId);
    
    //////////////////////////////////////create book group
    var thatgroup = new group(i,paper);
    thatgroup.addElement(bookback);
    thatgroup.addElement(bookfront);
    thatgroup.domRef = bookback.domId;
    sp.groups.push(thatgroup);
    
    ////////////////////////////to bind/unbind hover functions for each elements
    bookback.group = thatgroup;
    bookfront.group = thatgroup;
    
    
    
    ///// attach custom event and tooltip
    $("#"+bookback.domId).bind('customHover',function(){
        //console.log("#"+bookback.domId);
        });
    $("#"+bookback.domId).bind('customUnHover',function(){
        //console.log("#"+bookback.domId);
        });
    $("#"+bookback.domId).qtip({
        content: $("#content")
        ,
        show: {
            when: {
                event: 'customHover'
            },
            effect: {
                type:'grow'
            },
            delay: 200     
        },
        hide: {
            fixed : true,
            when: {
                event: 'customUnHover'
            }
        },
        position: {
            corner: {
                target: 'topLeft',
                tooltip: 'topLeft'
                
            },
            adjust: {
                x: sp.book_zoomed_ratio*sp.book_width,
                y: 5
            }
        },
        style: {
            /*width: sp.book_zoomed_ratio*sp.book_width*1.5,*/
            height: sp.book_height*sp.book_zoomed_ratio - 20
            
        },
        api: {
            onRender: function() {
                $(this.elements.tooltip).hover(function(){
                    //thatgroup.setTrue();
                    },function() {
                        sp.groups[15].setTrue();
                    });
            }
        }
    });
 
    bookback.radius = radius;
    bookback.realX = bookback.attr("x");
    bookback.realY = bookback.attr("y");
    
    
    bookfront.place = i;
    bookfront.radius = radius;
    bookfront.realX = bookback.attr("x");
    bookfront.realY = bookback.attr("y");
    
    /////////////////////////////initialize zoom custom attribute
    bookfront.attr({
        zoom : 1
    });
    bookback.attr({
        zoom : 1
    });
    
    bookback.child = bookfront;
    
    
    ///////////////push dem in arrays
    sp.bookElements.push(bookback);    ///// bookElements is for sortDisplay method
    sp.imageElements.push(bookfront);    ///// bookElements is for sortDisplay method
    sp.set.push(bookback,bookfront);   ///// for convenience we push all book in a raphael set for applying general transformations   
}



var rafael = function(){
    
    var sp = window.sanspapier.cible;   ///// global container reference
    
    
    var cosinus = [];
    var sinus = []; 
    var doublepi = Math.PI * 2;
    for( var i=0;i<1001;i++){
            cosinus[i]=Math.cos(i*doublepi/1000);
            sinus[i]=Math.sin(i*doublepi/1000);
    }
    sp.cos = cosinus;
    sp.sin = sinus;
    
    
    
    var paper = Raphael("holder", 960, 800);
    sp.set = paper.set();
    
    
    var scape = paper.rect(0,0,sp.width,sp.height).attr({
        fill: sp.backgroundcolor,
        stroke: 'no-stroke'
    }).toBack();
    var ellipse = paper.ellipse(sp.centerX, sp.centerY, sp.main_ellipse_coef, sp.main_ellipse_coef*sp.ellipse_ratio).attr({
        fill: sp.ellipse_fill, 
        stroke: 'no-stroke'
    });
    sp.ellipseRef = ellipse;
    sp.scapeRef = scape;
    
    
    ///////////////////////////////////////////create all books objects
    for(var i=0;i<sp.number_of_books;i++){
        var ellipse_coef = (1 - logRepartition(1-i/sp.number_of_books,4))*sp.main_ellipse_coef*0.85;
        
        var radius = (i/35 + i/5)*2*Math.PI ;
        paper.book(ellipse_coef,radius,i);
    }
    sp.loaded = true;
    
    var staticgroup = new group(15,paper);
    staticgroup.addElement(ellipse);
    staticgroup.addElement(scape);
    staticgroup.disableAnim();
    sp.groups.push(staticgroup);
    
    ellipse.group = staticgroup;
    scape.group = staticgroup;
    
    sp.turnable = true;
    
    //////////////////////////////////////////create 3D illusion
    sortDisplay3D();
    
    ////////////////////////////////////////// for drag ellipse
    
    var cursorY;
    var cursorX;
    var previousX = 0;
    
    var setRealCoord = function(thisarg) {
        thisarg.realX = thisarg.attr("x") - thisarg.data("margin");
        thisarg.realY = thisarg.attr("y")- thisarg.data("margin");
    }

    var turn = function(thisarg) {
        thisarg.attr({
            turn : thisarg.radius + cursorX
        });
        //thisarg.radius = thisarg.radius + cursorX;
        setRealCoord(thisarg);     
    }
    var start = function(x,y,dx,dy) { 
        
        ////// desactivate hover propagation on drag
        for(var i=0;i<sp.groups.length;i++){
            sp.groups[i].activate = false;
        }       
        
        if(y>sp.height/2) {
            cursorY = -1;
        }
        else cursorY = 1;
    },
    up = function(x,y) {
        
        ////// resactivate hover propagation on drag
        for(var i=0;i<sp.groups.length;i++){
            sp.groups[i].activate = true;
        } 
        
        previousX = 0;
        sp.set.forEach(setRealCoord,1);
    },
    move = function(x,y) {
        
        var dis = x - previousX;
        previousX = x;      
        cursorX = cursorY*dis*sp.mouse_sensibility;
        sp.set.forEach(turn,1);
    }; 
    ellipse.drag(move,start,up);
    
    
    /////////////////////////////////////////// hover on ellipse modify cursor
    
    var inside = function() {
        this.attr({
            "cursor": "pointer"
        });
    },
    outside = function() {
        this.attr({
            "cursor": "default"
        })
    };
    ellipse.hover(inside,outside);
    
    /////////////scrolling arrows
    
    var scrollerRight = paper.path("M "+(sp.centerX+5)+" "+
        (sp.centerY + sp.main_ellipse_coef*sp.ellipse_ratio + 4)
        +" l 15 7 l -15 7 l 0 -14 M 0 0").attr({
        fill:"#EEEEEE",
        stroke: 'no-stroke'
    });
        
    var scrollerLeft = paper.path("M "+(sp.centerX - 5)+" "+
        (sp.centerY + sp.main_ellipse_coef*sp.ellipse_ratio + 32)
        +" l 0 -14 l -15 -7 l 15 -7 ").attr({
        fill:"#EEEEEE",
        stroke: 'no-stroke'
    });    
    
    var linearturnRight = function(thisarg) {
        
        ////// desactivate hover propagation 
        for(var i=0;i<sp.groups.length;i++){
            sp.groups[i].activate = false;
        } 
        
        thisarg.animate({
            turn : thisarg.radius - Math.PI/2
        },'800','bounce',function() {
            setRealCoord(thisarg);
            ////// resactivate hover propagation 
            for(var i=0;i<sp.groups.length;i++){
                sp.groups[i].activate = true;
            } 
        });       
    },
    linearturnLeft = function(thisarg) {
        ////// desactivate hover propagation 
        for(var i=0;i<sp.groups.length;i++){
            sp.groups[i].activate = false;
        } 
        thisarg.animate({
            turn : thisarg.radius + Math.PI/2
        },'800','bounce',function(){
            setRealCoord(thisarg); 
            ////// resactivate hover propagation 
            for(var i=0;i<sp.groups.length;i++){
                sp.groups[i].activate = true;
            } 
        });     
    };
    
    scrollerRight.hover(function(){
        this.attr({
            fill:"#CACACA",
            "cursor": "pointer"
        }); 
    }, function(){
        this.attr({
            fill:"#EEEEEE"
        });
    }).mousedown(function(){
        sp.set.forEach(linearturnRight,1); 
    });
    
    scrollerLeft.hover(function(){
        this.attr({
            fill:"#CACACA",
            "cursor": "pointer"
        }); 
    }, function(){
        this.attr({
            fill:"#EEEEEE"
        });
    }).mousedown(function(){
        sp.set.forEach(linearturnLeft,1); 
    });
    
    
    
    

    
    
    //////////////////////////////////////////Modal tooltip : fiche libre
    $("#content").hide();
    $("#booksheet").hide();
    $("#booksheet").bind("open",function(){});
    $("#booksheet").qtip(
    {
        content: {
            text: $("#booksheet .content")
        },
        position: {
            target: $(document.body), // Position it via the document body...
            corner: 'center' // ...at the center of the viewport*/
               
        },
        show: {
            when: 'open', // Show it on click
            solo: true // And hide all other tooltips
        },
        hide: {
            when:{
                event: 'unfocus'
            }
        },
        style: {
            width: 930,
            border: {
                width: 5,
                radius: 5,
                color: '#666666'
            }
        },
        api: {
            beforeShow: function()
            {
                // Fade in the modal "blanket" using the defined show speed
                $('#qtip-blanket').fadeIn(this.options.show.effect.length);
            },
            beforeHide: function()
            {
                // Fade out the modal "blanket" using the defined hide speed
                $('#qtip-blanket').fadeOut(this.options.hide.effect.length);
            },
            onShow: function(){
                sp.groups[15].setTrue();
                var slider_editions = new spSlider('#editions_sliders', 500, 100, 3);
                var slider_auteur = new spSlider('#auteur_sliders', 500, 100, 8);
                console.log(this.elements.target);
                
            }
        }
    });
   
    $('<div id="qtip-blanket">')
    .css({
        position: 'absolute',
        top: $(document).scrollTop(), // Use document scrollTop so it's on-screen even if the window is scrolled
        left: 0,
        height: $(document).height(), // Span the full document height...
        width: '100%', // ...and full width

        opacity: 0.7, // Make it slightly transparent
        backgroundColor: 'black',
        zIndex: 5000  // Make sure the zIndex is below 6000 to keep it below tooltips!
    })
    .appendTo(document.body) // Append to the document body
    .hide(); // Hide it initially
    
   
 
    

    $(".link").click(function(){
        $("#booksheet").trigger("open");
    });

    
}


