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
var pagination = function(easel) {
    
    this.main = easel;
    var global = window.sanspapier.cible;
    var books_ids;
    var results_length;
    var books_number = global.number_of_books - 1;  
    var mainBook;
    var that = this;
    this.number_of_pages;
    this.offset = 1;
    
    $('#result_pagination .next_page').click(function(e) {
        e.preventDefault();
        AjaxController.logAction('NextPage');
        that.nextpage();
    });
    
    $('#result_pagination .previous_page').click(function(e) {
        e.preventDefault();
        AjaxController.logAction('PreviousPage');
        that.previouspage();
    });
    
    this.setResults = function(results) {
        books_ids = results;
        mainBook = results[0];
        results_length = results.length;
        that.calculate_page_number();
        that.offset = 1;
        that.getPageResultArray();       
    }
    
    this.calculate_page_number = function() {
        that.number_of_pages = Math.floor((results_length - 1)/books_number) + 1;
    }
    
    this.getPageResultArray = function() {
        if (typeof books_ids.length == 'undefined' || typeof mainBook == 'undefined') {
            
        } else {
            var page_result = [];
            page_result.push(mainBook);
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
            that.main.createBooks(page_result);
        }
    }
    
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
}

var globalField = this;

var easel = function(){
    var that = this;
    var easel = this;
    var results = $('#search_result .hover_content');
    var sp = window.sanspapier.cible;   ///// global container reference
    var stage;
    var ellipse;
    var scrollerRight;
    var scrollerLeft;
    this.mybooks = null;
    var old_value;
    var ok = false;
    var mouse_sensibility = 3;
    var tomove = 0;
    var turn = false;
    var counterclock = true;
    var sensibility = 0.06;
    var dragCursor;
    var pages = new pagination(this);
    this.touchSupport = false;
    this.curBrowser = BrowserDetect.browser;
    // IE doesn't support co-ordinates
    this.cursCoords = (this.curBrowser == "Explorer") ? "" : " 4 4";
    
    this.result_callback = function() {
        var results = $('#search_result .hover_content');
        ///////////////////////////////////////////get results id
        var idArr = [];
        results.each(function(){
            var ids = [];
            var product_id = $(this).attr('id');
            var id = product_id.split('_'); 
            ids.push(id[1],id[2]); 
            idArr.push(ids);
        });
        that.initeasel();
        pages.setResults(idArr);
    }
    
    this.initeasel = function() {
        stage = new createjs.Stage(document.getElementById("canvas"));
        that.touchSupport = createjs.Touch.isSupported();
        
        createjs.Touch.enable(stage);
        stage.enableMouseOver(55);
        document.onselectstart = function(){ return false; }
        ellipse = new createjs.Shape();
        ellipse.graphics.beginLinearGradientFill(["#E9E8E0", "#FEFEFE"], [0,0.9],-20,80,0 , -160 ).drawEllipse(-sp.main_ellipse_coef, -sp.main_ellipse_coef*sp.ellipse_ratio, sp.main_ellipse_coef*2, sp.main_ellipse_coef*sp.ellipse_ratio*2);
        ellipse.x = sp.centerX;
        ellipse.y = sp.centerY;
        ellipse.onPress = pressHandler;
        ellipse.onMouseOver = function() {
            dragCursor = (easel.curBrowser == "Firefox") ? "-moz-grab" : "url(images/icons/openhand.png)" + easel.cursCoords + ", move";
            // Opera doesn't support url cursors and doesn't fall back well...
            if (easel.curBrowser == "Opera") dragCursor = "move";
                document.body.style.cursor = dragCursor;
        }
        
        ellipse.onMouseOut = function() {
            document.body.style.cursor = 'default';
        }
        
        ellipse.cache(-sp.main_ellipse_coef, -sp.main_ellipse_coef*sp.ellipse_ratio, sp.main_ellipse_coef*2, sp.main_ellipse_coef*sp.ellipse_ratio*2);
        
        var drop_area = new createjs.Shape();
        var drop_area_size = 160;
        drop_area.graphics.beginFill("rgba(255,0,0,0.4)").drawEllipse(-drop_area_size, -drop_area_size*sp.ellipse_ratio, drop_area_size*2, drop_area_size*sp.ellipse_ratio*2);
        drop_area.x = sp.centerX;
        drop_area.y = sp.centerY;
        drop_area.visible = false;
        drop_area.cache(-drop_area_size, -drop_area_size*sp.ellipse_ratio, drop_area_size*2, drop_area_size*sp.ellipse_ratio*2);
        
        this.dropAreaHitTest = function(x,y) {
            var testPoint = new createjs.Point(x,y);
            var localPoint = drop_area.globalToLocal(testPoint.x,testPoint.y);
            if (drop_area.hitTest(localPoint.x, localPoint.y)) {
//                drop_area.visible = true;
                return true;
            } else {
//                drop_area.visible = false;
                return false;
            }
        }
        
        this.show_area = function() {
            drop_area.visible = true;
        }
        
        this.hide_area = function() {
            drop_area.visible = false;
        }
        
        var scrollerLeftSource = new Image();     
        //scrollerLeftSource.crossOrigin = "Anonymous"; 
        scrollerLeftSource.src = "images/fleche_cible_gauche.png";
        scrollerLeftSource.onload = function() {
            scrollerLeft = new createjs.Bitmap(scrollerLeftSource);     
            scrollerLeft.regX = 40;
            scrollerLeft.regY = 25;
            scrollerLeft.x = sp.centerX-423;
            scrollerLeft.y = sp.centerY + sp.main_ellipse_coef*sp.ellipse_ratio - 76;   
            scrollerLeft.scaleX = 0.8;
            scrollerLeft.scaleY = 0.8;
                
            scrollerLeft.onPress = function(ev) {
                easel.mybooks.enablehoover = false;
                mytutorial.turning = true;
                counterclock = true;
                turn = true;
                //counter = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                var that = this;
                ev.onMouseUp = function() {
                    that.scaleX = 0.8;
                    that.scaleY = 0.8;
                    turn = false;
                    easel.mybooks.enablehoover = true;
                    mytutorial.turning = false;
                }
            }
            
            scrollerLeft.onMouseOver = function() {
                document.body.style.cursor='pointer';
            }
            
            scrollerLeft.onMouseOut = function() {
                document.body.style.cursor='default';
            }
                
            scrollerRight = new createjs.Bitmap(scrollerLeftSource);     
            scrollerRight.regX = 40;
            scrollerRight.regY = 25;
            scrollerRight.x = sp.centerX + 423;
            scrollerRight.y = sp.centerY + sp.main_ellipse_coef*sp.ellipse_ratio - 76;   
            scrollerRight.scaleX = -0.8;
            scrollerRight.scaleY = 0.8;
                
            scrollerRight.onPress = function(ev) {
                easel.mybooks.enablehoover = false;
                mytutorial.turning = true;
                counterclock = false;
                turn = true;
                this.scaleX = -1;
                this.scaleY = 1;
                var that = this;
   
                ev.onMouseUp = function() {
                    that.scaleX = -0.8;
                    that.scaleY = 0.8;
                    turn = false;
                    easel.mybooks.enablehoover = true;
                    mytutorial.turning = false;
                }
            }

            scrollerRight.onMouseOver = function() {
                document.body.style.cursor='pointer';
            }
            
            scrollerRight.onMouseOut = function() {
                document.body.style.cursor='default';
            }
                
            stage.addChild(scrollerLeft,scrollerRight);
            stage.update();
        };     
        
        stage.addChild(ellipse,drop_area);
        
        //draw to the canvas
        stage.update(); 
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addListener(stage,true);
        createjs.Ticker.addListener(window);
    }
    
    globalField.tick = function() { 
        if (turn) {
            if (counterclock) {
                that.mybooks.turn(sensibility);
                that.mybooks.setRadius(0.1);
            } else {
                that.mybooks.turn(-sensibility);
                that.mybooks.setRadius(-sensibility);
            }
            stage.update();
        }
    }
   
    function pressHandler(e){
        that.mybooks.closeOpenenedBooks();
        that.mybooks.open = false;
        e.onMouseMove = function(ev){
            dragCursor = (easel.curBrowser == "Firefox") ? "-moz-grabbing" : "url(images/icons/closedhand.png)" + easel.cursCoords + ", move";
            // Opera doesn't support url cursors and doesn't fall back well...
            if (easel.curBrowser == "Opera") dragCursor = "move";
            document.body.style.cursor = dragCursor;
            that.mybooks.enablehoover = false;   ///// avoid hoover when turning the target
            var amount = 0;
            if (ok) {
                if (ev.stageY > sp.centerY) {
                    amount = (old_value - ev.stageX)/100;
                } else {
                    amount = (ev.stageX - old_value)/100;
                }
            }           
            old_value = ev.stageX
            ok = true;
            tomove += amount/mouse_sensibility;  
            that.mybooks.turn(tomove);
            stage.update();
        }
        e.onMouseUp = function(ev) {
            dragCursor = (easel.curBrowser == "Firefox") ? "-moz-grab" : "url(images/icons/openhand.png)" + easel.cursCoords + ", move";
            document.body.style.cursor = dragCursor;
            that.mybooks.enablehoover = true;
            that.mybooks.setRadius(tomove);
            ok = false;
            old_value = 0;
            tomove = 0;
        }
    }
    
    this.createBooks = function(data) {
        var book_ids = data; 
        stage.removeChild(that.mybooks);
        
        if (that.mybooks == null) {
            that.mybooks = new BookContainer(that,book_ids);
        } else {
            that.mybooks.removeAllChildren();
            that.mybooks = null;
            that.mybooks = new BookContainer(that,book_ids);   
        }
        stage.addChild(that.mybooks);
        stage.update(); 
    }
    
    this.freezeCible = function(state) {
        if(state) {
            mytutorial.release();
            mytutorial.state = false;  
            createjs.Ticker.setPaused(state);
        } else {
            mytutorial.state = true;  
            createjs.Ticker.setPaused(state);
            
            if (that.mybooks != null) {
                that.mybooks.hideHtml();
            }
        }
    }
}