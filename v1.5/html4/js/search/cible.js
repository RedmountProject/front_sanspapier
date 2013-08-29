/*  Copyright (C) 2013 GAYON Matthieu

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
var getcosdata = function(value){
    var doublepi = 2*Math.PI;
    
    if (value < 0)
        value = - value;
    
    var entry = Math.floor(((value % doublepi)/doublepi) * 1000) ;
    return window.sanspapier.cible.cos[entry];
}

var getsindata = function(value){
    var doublepi = 2*Math.PI;
    var entry = 0;
    if (value < 0) {   
        entry = 1000 - Math.floor((((-1*value) % doublepi)/doublepi) * 1000) ;
    }
    else {
        entry = Math.floor(((value % doublepi)/doublepi) * 1000) ; 
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
    
    var that = this;
    var animable = true;
    var onfront = false;
    
    this.state = false;
    this.activate = true;
    
    var tuto_livre_pivot = mytutorial.pushEvents("tuto_livre_pivot");
    var booktutorial = mytutorial.pushEvents("tuto_draganddrop");
        
    var displaytuto = function() {
        if(i == 1) {
            tuto_livre_pivot.displayTuto();
        }
        else booktutorial.displayTuto();
    }
        
    var releasetuto = function() {
        if(i == 1) {
            tuto_livre_pivot.release();
        }
        else booktutorial.release();
    }
       
    var animout = function(el){
        releasetuto();
        el.insertAfter(el.previousLayer);
        el.animate({
            zoom:1
        },'50'); 
    },
    animin = function(el){
        displaytuto();
        el.toFront();
        el.animate({
            zoom: sp.book_zoomed_ratio
        },'50');
    };
    this.hover = function() {
        if(!onfront){
            if (animable){      
                that.set.forEach(animin,1);    
            }
        }
        onfront = true;       
    }
    this.unhover = function(){
        onfront = false;
        if (animable){
            that.set.forEach(animout,1);
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

Raphael.fn.book = function(ellipse_coef,radius,i, id){
    
    var results = $('#search_result .hover_content');
    
    if (results.length == 0) return
    else {
        var sp = window.sanspapier.cible;   ///// global container reference
        var spConfig = window.sanspapier.config;
        var paper = this; 
    
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
        
        var src = spConfig.images_url+id[1]+'/'+id[0]+'/'+id[0]+'_fc_C.jpg';    

        var bookfront = paper.image(src,0,0, sp.book_width - 2*sp.book_margin,sp.book_height - 2*sp.book_margin)
        .data("coef",ellipse_coef)
        .data("margin",sp.book_margin)
        .attr({
            turn: radius
        });
    
        var bookback = null;
        
        if(i==0){
            
            bookback = paper.rect(0,0,sp.book_width,sp.book_height)
            .data("coef",ellipse_coef)
            .data("margin",0)
            .attr({
                turn: radius,
                stroke: "#AA0000",
                'stroke-opacity':'0.5',
                'stroke-width':10,
                fill: 'no-fill'
            }).insertBefore(bookfront);
            
        }
        else {
            bookback = paper.rect(0,0,sp.book_width,sp.book_height)
            .data("coef",ellipse_coef)
            .data("margin",0)
            .attr({
                turn: radius,
                stroke: sp.book_fill,
                'stroke-opacity':'0.2',
                'stroke-width':10,
                fill: 'no-fill'
            }).insertBefore(bookfront);
            
        }
    
        /////////////////////////////bind few fields to those elements
        bookback.place = i;
    
        bookfront.domId = "book_"+i;
        bookfront.node.setAttribute("class","targetImgBook");
        bookfront.node.setAttribute("id",bookfront.domId);
        $("#book_"+i).css({
            'opacity':0
        });
        $("#book_"+i).animate({
            'opacity':1
        },900);        
            
        //////////////////////////////////////create book group
        var thatgroup = new group(i+1,paper);
        thatgroup.addElement(bookback);
        thatgroup.addElement(bookfront);
        thatgroup.domRef = bookfront.domId;
        sp.groups.push(thatgroup);
    
        ////////////////////////////to bind/unbind hover functions for each elements
        bookback.group = thatgroup;
        bookfront.group = thatgroup;
    
        $("#"+bookfront.domId).qtip(
        {    
            content: $('#target_'+id[0]+'_'+id[1]),
            show: {
                event: "mouseover",
                delay: 400
            },
            hide: {
                fixed: true,
                event: "mouseleave"
            },
            position: {
                at: "top right",
                my: "top left"
            },
            style: {
                def: false,
                classes: 'windows_hover',
                'z-index': 10000,
                tip: {
                    corner: false
                }
            },
            events: {
                show: function() {
                    if($(window).scrollTop()<window.sanspapier.defFormats.scrollTopDetect)
                        $.fn.qtip.zindex = 20001;
                    else
                        $.fn.qtip.zindex = 300;
                    
                    $(this).hover(function(){
                        //thatgroup.setTrue();
                        },function() {
                            sp.groups[0].setTrue();
                        });
                        
                    update_addToCart_targets('#target_'+id[0]+'_'+id[1]);
                }
            }
        }
        );
 
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
}

///////////////SEARCH ACTION

///oject for tracking pagination
var pagination = function() {
    
    var global = window.sanspapier.cible;
    var books_number = global.number_of_books - 1;  
    var books_ids;
    var results_length;
    this.offset = 1;

    
    var that = this;
    
    this.calculate_page_number = function() {
        that.number_of_pages = Math.floor((results_length - 1)/books_number) + 1;
    }
    
    this.setResult = function(results) {
        books_ids = results;
        results_length = results.length;
        that.mainBook = results[0];
        that.calculate_page_number();
        that.offset = 1;
    }
    
    $('#result_pagination .next_page').click(function(e) {
        e.preventDefault();
        that.nextpage();
        zindexTargetBooks();
    });
    $('#result_pagination .previous_page').click(function(e) {
        e.preventDefault();
        that.previouspage();
        zindexTargetBooks();
    });
    
    this.nextpage = function() {
        
        if(that.offset < that.number_of_pages) { 
            that.offset ++;
            that.getPageResultArray();
        }   
    }
    this.previouspage = function() {
        if(that.offset > 1) { 
            that.offset --;
            that.getPageResultArray();
        }
        
    }
    this.feedback = function() {
        var todisplay = that.offset+"/"+that.number_of_pages;
        $('#result_pagination .pagination_feedback').html(todisplay);
    }
    
    this.getPageResultArray = function(results) {
        
        if (typeof books_ids.length == 'undefined' || typeof that.mainBook == 'undefined') {
            
        }
        else {
            var page_result = [];
            page_result.push(that.mainBook);
            var limit = books_number ;
            var resultsOffset = 1 + ((that.offset - 1) * books_number );
            if ((resultsOffset + books_number) > books_ids.length) {
                limit = books_ids.length - resultsOffset;
            }
        
            for(var i=0;i<limit;i++){
                var j = i + resultsOffset;
                page_result.push(books_ids[j]);
            } 
            
            that.feedback();  
            createBooks(page_result);
        }
    }
}

var search_rafael = function() {
    ////// hide existing rafael and internal content
    var global = window.sanspapier.cible;
    
    for(var i=0 ;i<global.bookElements.length;i++){
        global.bookElements[i].hide(); 
        global.imageElements[i].hide();
    }  
    global.loading_text.show();  
}

var result_callback = function() {
    var global = window.sanspapier.cible;
    var results = $('#search_result .hover_content');
    
    ///////////////////////////////////////////get results id
    var idArr = [];
    var idPublisher = [];

    results.each(function(){
        var ids = [];
        var product_id = $(this).attr('id');
        var id = product_id.split('_');    
        ids.push(id[1],id[2]); 
        idArr.push(ids);
    });
    
    if (idArr.length != 0 || idArr != null) {
        
        if ( global.pagination == null) {
            global.pagination = new pagination();
            global.pagination.setResult(idArr);
        }
        else {
            global.pagination.setResult(idArr);
        } 
        global.pagination.getPageResultArray();
    }
}

var createBooks = function(data) {
    var global = window.sanspapier.cible;
    var paper = global.paper;
    var book_ids = data;
    
    global.loaded = false;
    global.turnable = false;
    
    ///////////////////////////////////////////   destroy logic display content       
    ////// destroy raphael object
    for(var i=0 ;i<global.bookElements.length;i++){
        global.bookElements[i].remove(); 
        global.imageElements[i].remove();
    } 
        
    ////// destroy all bookelements and related data
    global.bookElements = [];
    global.imageElements = [];
        
    var staticgroup = global.groups[0];
    global.groups = [];
    global.groups.push(staticgroup);
    
    
    ///////////////////////////////////////////////recreate it 
    
    for(i=0;i<book_ids.length;i++){
        var ellipse_coef = (1 - logRepartition(1-i/global.number_of_books,4))*global.main_ellipse_coef*0.85;
        
        var radius = (i/35 - i/4)*2*Math.PI ;
        
        paper.book(ellipse_coef,radius,i,book_ids[i]);
    }
    global.loaded = true;
    global.turnable = true;
    sortDisplay3D();
    
    global.loading_text.hide();
}

////////////////////OUR RAFAEL RULES OF CREATION

var rafael = function(){
    
    //var results = $('#search_result .hover_content');
    
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
    
    var paper = Raphael("holder", 960, 600);
    sp.paper = paper;
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
    
    //////////////////////////////////////////// create the sprite group
    
    sp.groups = [];
    var staticgroup = new group(0,paper);
    
    staticgroup.addElement(ellipse);
    staticgroup.addElement(scape);
    staticgroup.disableAnim();
    sp.groups.push(staticgroup);
    
    ellipse.group = staticgroup;
    scape.group = staticgroup;
    
    ///////////////////////////////////////////create all books objects
    //createBooks();
    
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
        disable_qtip();
    },
    up = function(x,y) {
        
        ////// resactivate hover propagation on drag
        for(var i=0;i<sp.groups.length;i++){
            sp.groups[i].activate = true;
        } 
        
        previousX = 0;
        sp.set.forEach(setRealCoord,1);
        enable_qtip();
    },
    move = function(x,y) {
        
        var dis = x - previousX;
        previousX = x;      
        cursorX = cursorY*dis*sp.mouse_sensibility;
        sp.set.forEach(turn,1);
    }; 
    ellipse.drag(move,start,up);
    
        

    
    /////////////////////////////////////////// hover on ellipse modify cursor
    var ellipsetutorial = mytutorial.pushEvents("tuto_plateau");
    
    var inside = function() {
        ellipsetutorial.displayTuto();
        this.attr({
            "cursor": "pointer"
        });
    },
    outside = function() {
        ellipsetutorial.release();
        this.attr({
            "cursor": "default"
        })
    };
    ellipse.hover(inside,outside);
    
    /////////////scrolling arrows
    
    var scrollerRight = paper.image("images/fleche_cible_droite.png", sp.centerX+350, sp.centerY + sp.main_ellipse_coef*sp.ellipse_ratio - 80, 80, 50);
    var scrollerLeft = paper.image("images/fleche_cible_gauche.png", sp.centerX-423, sp.centerY + sp.main_ellipse_coef*sp.ellipse_ratio - 76, 80, 50);
        
    var linearturnRight = function(thisarg) {
        
        ////// desactivate hover propagation 
        for(var i=0;i<sp.groups.length;i++){
            sp.groups[i].activate = false;
        } 
        
        thisarg.animate({
            turn : thisarg.radius - Math.PI/2
        },'600','linear',function() {
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
        },'600','linear',function(){
            setRealCoord(thisarg); 
            ////// resactivate hover propagation 
            for(var i=0;i<sp.groups.length;i++){
                sp.groups[i].activate = true;
            } 
        });     
    };
    
    scrollerRight.hover(function(){
        this.attr({
            "cursor": "pointer"
        }); 
        this.translate(10,-5)
    }, function(){
        this.translate(-10,5)
    }).mousedown(function(){
        sp.set.forEach(linearturnRight,1); 
    });
    
    scrollerLeft.hover(function(){
        this.attr({
            "cursor": "pointer"
        }); 
        this.translate(-10,-5)
        
    }, function(){
        this.translate(10,5)
    }).mousedown(function(){
        sp.set.forEach(linearturnLeft,1); 
    });
    
    sp.loading_text = paper.text(sp.centerX,sp.centerY,"Chargement des résultats ...").hide();
}

var disable_qtip = function(){
    var images = window.sanspapier.cible.imageElements;   
    for(var i=0 ;i<images.length;i++){      
        $("#"+images[i].domId).qtip("disable")
    }
}

var enable_qtip = function(){
    var images = window.sanspapier.cible.imageElements;   
    for(var i=0 ;i<images.length;i++){      
        $("#"+images[i].domId).qtip("enable")
    }
}