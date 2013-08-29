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
var logRepartition = function (valuein,curving) {    
    var temp = (valuein - 1)*curving; 
    var nominateur = Math.exp(temp) - 1;
    var denominateur = Math.exp(-curving) -1; 
    var result = (nominateur/denominateur) *(-1) + 1 ; 
    return result;   
}

function getcosdata(value,table){
    var doublepi = 2*Math.PI;
    if (value < 0) value = - value;
    var entry = Math.floor(((value % doublepi)/doublepi) * 1000) ;
    return table[entry];
}
 
function getsindata(value,table){
    var doublepi = 2*Math.PI;
    var entry = 0;
    if (value<0) {   
        entry = 1000 - Math.floor((((-1*value) % doublepi)/doublepi) * 1000) ;
    } else {
        entry = Math.floor(((value % doublepi)/doublepi) * 1000) ; 
    }
    return table[entry];
}

(function (window) {
    function Book(image, book_id, rank, bookContainer)  {
        this.initialize(image, book_id, rank, bookContainer);
    }
 
    Book.prototype = new createjs.Container();
    Book.prototype.Container_initialize = Book.prototype.initialize;
    Book.prototype.Container_tick = Book.prototype._tick; 
    
    Book.prototype.enablehoover = true;
    Book.prototype.radius;
 
    Book.prototype.initialize = function (image, book_id, rank, bookContainer) {
        this.bookContainer = bookContainer;
        var dragCursorBook;
        // maths utils
        this.cosinus = [];
        this.sinus = []; 
        this.doublepi = Math.PI * 2;
        for( var i=0;i<1001;i++){
            this.cosinus[i]=Math.cos(i*this.doublepi/1000);
            this.sinus[i]=Math.sin(i*this.doublepi/1000);
        }
        
        this.Container_initialize();  
        var that = this;
        var global = window.sanspapier.cible;
        
        this.enablehoover = true;
        this.emplacementX;
        this.enplacementY;
        this.open = false;
        this.image = image;
        this.book_id = book_id;
        this.rank = rank;
        var utilRank = this.rank + 1;
        this.decorativeColor;
        var redcolor = "rgba(200,0,0,0.5)";
        var transparentcolor = "rgba(255,255,255,0.01)";
        var blackcolor = "rgba(0,0,0,0.15)";
        var whitecolor = "rgba(255,255,255,1)"
        var whitetranscolor = "rgba(255,255,255,0.7)"
        var dragNdropColor = "rgba(220,255,220,1)"
        //var tuto_livre_pivot;
        var heightContent = 224;
        
        if (rank == 0) {
            if(book_id[0] == 999999)
                this.decorativeColor = transparentcolor;
            else
                this.decorativeColor = redcolor;
            //tuto_livre_pivot = mytutorial.pushEvents("tuto_livre_pivot");
            heightContent = 204;
        } else {
            heightContent = 224;
            this.decorativeColor = blackcolor;
        }
        
        this.ellipseCoef = (1 - logRepartition(1-rank/global.number_of_books,5))*global.main_ellipse_coef*0.85;
        this.radius = (utilRank/35 - utilRank/4)*2*Math.PI ;

        var html = document.getElementById('target_'+book_id[0]+'_'+book_id[1]);
        var html2 = document.getElementById('advertiseDrag_'+book_id[0]);
        this.html = html;
        this.html2 = html2;

        var bitmap = new createjs.Bitmap(this.image); 
        bitmap.x = 5;
        bitmap.y = 5;
        bitmap.regY = 199;
        bitmap.regX = 69;
        bitmap.mouseEnabled = false;

        var hooverTestSurface = new createjs.Shape();
        this.hooverSurface = hooverTestSurface;
        hooverTestSurface.graphics.beginFill(this.decorativeColor).rect(0,0,138,heightContent);     
        hooverTestSurface.regY = 199;
        hooverTestSurface.regX = 69;
        hooverTestSurface.cache(0,0,138,204);
        
        this.scaleX = 0.6;
        this.scaleY = 0.6;
        this.turn(0);
        
        var stoptween = false;
        
        if (!this.bookContainer.main.touchSupport) {

            this.onMouseOver = function() {
                if (that.bookContainer.enablehoover && !that.bookContainer.dragNdrop) {
                    if (rank == 0) {
                        //tuto_livre_pivot.displayTuto();
                    } else {
                        dragCursorBook = (this.bookContainer.main.curBrowser == "Firefox") ? "-moz-grab" : "url(images/icons/openhand.png)" + this.bookContainer.main.cursCoords + ", move";
                        document.body.style.cursor = dragCursorBook;
                    }
                    
                    var extremY = this.y;
                    this.originalY = this.y;
                    
                    that.open = true;
                    
                    if (extremY < global.centerY - 50) {
                        this.tween = createjs.Tween.get(this, {
                            override: true
                        })
                        .to({
                            scaleX:1,
                            scaleY:1,
                            y: this.y + 76
                        },150,createjs.Ease.cubicIn).call(function() {
                            
                            if (!stoptween) {
                                that.bookContainer.push(that);
                                hooverTestSurface.uncache();
                                var extremX = this.x + 69 + 270;
                                if (extremX <= 960) {
                                    //Case of a no pivot table
                                    if(book_id[0] == 999999) {
                                        html.style.display = 'inline';
                                        html.style.left = 69 + this.x + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    } else {
                                        html.style.display = 'inline';
                                        html.style.left = 69 + this.x + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    }
                                    if(rank != 0) {
                                        html2.style.display = 'inline';
                                        html2.style.left = this.x - 68 + 'px';
                                        html2.style.top = this.y + 3 +'px';
                                    }
                                    if(book_id[0] == 999999) {
                                        hooverTestSurface.graphics.clear();
                                        hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,0.01)").
                                        beginFill(transparentcolor).rect(0,0,128,heightContent); /// original width
                                    } else {
                                        hooverTestSurface.graphics.clear();
                                        hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,1)").
                                        beginFill(whitecolor).rect(0,0,403,heightContent); /// 388 + 15 
                                    }
                                } else {
                                    //Case of a no pivot table
                                    if(book_id[0] == 999999) {
                                        html.style.display = 'inline';
                                        html.style.left = this.x - 329 + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    } else {
                                        html.style.display = 'inline';
                                        html.style.left = this.x - 329 + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    }
                                    if(rank != 0) {
                                        html2.style.display = 'inline';
                                        html2.style.left = this.x - 333 + 'px';
                                        html2.style.top = this.y + 3 + 'px';
                                    }
                                    hooverTestSurface.graphics.clear();
                                    hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,1)").
                                    beginFill(whitecolor).rect(-265,0,403,heightContent);
                                }
                            }
                        });
                    }
                    else {
                        this.tween = createjs.Tween.get(this,  {
                            override: true
                        })
                        .to({
                            scaleX:1,
                            scaleY:1
                        },150,createjs.Ease.cubicIn).call(function() {
                            
                            if (!stoptween) {
                                that.bookContainer.push(that);
                                hooverTestSurface.uncache();
                                var extremX = this.x + 69 + 270;
                                if (extremX <= 960) {
                                    //Case of a no pivot table
                                    if(book_id[0] == 999999) {
                                        html.style.display = 'inline';
                                        html.style.left = 69 + this.x + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    } else {
                                        html.style.display = 'inline';
                                        html.style.left = 69 + this.x + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    }
                                    if(rank != 0) {
                                        html2.style.display = 'inline';
                                        html2.style.left = this.x - 68 + 'px';
                                        html2.style.top = this.y + 3 +'px';
                                    }
                                    if(book_id[0] == 999999) {
                                        hooverTestSurface.graphics.clear();
                                        hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,0.01)").
                                        beginFill(transparentcolor).rect(0,0,128,heightContent); /// original width
                                    } else {
                                        hooverTestSurface.graphics.clear();
                                        hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,1)").
                                        beginFill(whitecolor).rect(0,0,403,heightContent); /// 388 + 15 
                                    }
                                } else {
                                    //Case of a no pivot table
                                    if(book_id[0] == 999999) {
                                        html.style.display = 'inline';
                                        html.style.left = this.x - 329 + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    } else {
                                        html.style.display = 'inline';
                                        html.style.left = this.x - 329 + 'px';
                                        html.style.top = this.y + 5 - 199 +'px';
                                    }
                                    if(rank != 0) {
                                        html2.style.display = 'inline';
                                        html2.style.left = this.x - 333 + 'px';
                                        html2.style.top = this.y + 3 + 'px';
                                    }
                                    hooverTestSurface.graphics.clear();
                                    hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,1)").
                                    beginFill(whitecolor).rect(-265,0,403,heightContent);
                                }
                            }
                        });
                    }
                }
            }
            this.onMouseOut = function() {
                document.body.style.cursor = 'default';
                if (that.bookContainer.enablehoover && !that.bookContainer.dragNdrop) {
                    if (rank == 0) {
                        //tuto_livre_pivot.release();
                    }
                    that.open = false;
                    
                    hooverTestSurface.graphics.clear();
                    hooverTestSurface.graphics.beginFill(this.decorativeColor).rect(0,0,138,204);     
                    hooverTestSurface.regY = 199;
                    hooverTestSurface.regX = 69;
                    hooverTestSurface.cache(0,0,138,204);
                    
                    if (!createjs.Ticker.getPaused()) {
                        html.style.display = 'none';
                        html2.style.display = 'none';
                    }
                    
                    createjs.Tween.get(this,  {
                        override: true
                    })
                    .to({
                        scaleX:0.6,
                        scaleY:0.6,
                        y: this.originalY
                    },20,createjs.Ease.cubicIn).call(function() {
                        this.bookContainer.sort();
                        createjs.Tween.get(hooverTestSurface,  {
                                override: true
                            })
                            .to({
                                regX: 69,
                                scaleX :  1
                            },20,createjs.Ease.cubicIn);        
                    });           
                }
            }
            
            this.onPress = function(ev) {
                stoptween = true;
                var offsetx = ev.stageX - this.x;
                var offsety = ev.stageY - this.y;
                var initialX = ev.stageX - offsetx;
                var initialY = ev.stageY - offsety;
                that.open = false;
                if (rank != 0) {
                    dragCursorBook = (this.bookContainer.main.curBrowser == "Firefox") ? "-moz-grabbing" : "url(images/icons/closedhand.png)" + this.bookContainer.main.cursCoords + ", move";
                    // Opera doesn't support url cursors and doesn't fall back well...
                    if (this.bookContainer.main.curBrowser == "Opera") dragCursorBook = "move";
                    document.body.style.cursor = dragCursorBook;
                    hooverTestSurface.uncache();
                    hooverTestSurface.graphics.clear();
                    hooverTestSurface.graphics.beginFill(dragNdropColor).rect(0,0,138,204);     
                    html.style.display = 'none';
                    html2.style.display = 'none';
                    this.scaleX = 1;
                    this.scaleY = 1;
                    ev.onMouseMove = function(e) {
                        that.bookContainer.dragNdrop = true;
                        that.x = e.stageX - offsetx;
                        that.y = e.stageY - offsety;
                        that.bookContainer.sort();
                        that.bookContainer.main.show_area();
                        that.bookContainer.main.dropAreaHitTest(that.x,that.y);
                    }
                    ev.onMouseUp = function(e){
                        document.body.style.cursor = 'default';
                        stoptween = false;
                        var test = that.bookContainer.main.dropAreaHitTest(that.x,that.y);
                        if (test && ((that.x > initialX+10) || (that.x < initialX-10) || (that.y > initialY+10) || (that.y < initialY-10))) {
                            AjaxController.logAction('DragNDrop_'+fixedEncodeURIComponent($('#linkTitleTarget_'+book_id[0]+'_target').text()));
                            that.bookContainer.removeAllChildren();
                            window.location = "#!search_"+fixedEncodeURIComponent($('#linkTitleTarget_'+book_id[0]+'_target').text())+"_0_"+book_id[0]+"_1";
                        } else {
                            that.open = false;
                            hooverTestSurface.graphics.clear();
                            hooverTestSurface.graphics.beginFill(that.decorativeColor).rect(0,0,138,204); 
                            hooverTestSurface.cache(0,0,138,204);
                            hooverTestSurface.regY = 199;
                            hooverTestSurface.regX = 69;
                            that.scaleX = 0.6;
                            that.scaleY = 0.6;
                            var tweenReturn = createjs.Tween.get(that,  {
                                override: true
                            });

                            tweenReturn.to({
                                x:that.emplacementX,
                                y:that.emplacementY
                            },300,createjs.Ease.elasticOut).call(function(){
                                that.bookContainer.sort();
                                that.bookContainer.dragNdrop = false ;
                            });
                            createjs.Tween.get(hooverTestSurface,  {
                                override: true
                            }).to({
                                regX: 69,
                                scaleX :  1,
                                scaleY :  1
                            },20,createjs.Ease.cubicIn);

                            tweenReturn.onChange = function() {
                                that.bookContainer.sort();
                            }
                        }
                        that.bookContainer.main.hide_area();
                    }
                } else {
                    ev.onMouseUp = function(e){
                        stoptween = false;
                    }   
                }
            }
        } else {
            /////////////////////////////////////////////////////////////////////////////////////////////  touch case 
            this.onPress = function(ev) {
                that.open = false;
                that.bookContainer.open = false;            
                var offsetx = ev.stageX - this.x;
                var offsety = ev.stageY - this.y;
                var initialX = ev.stageX - offsetx;
                var initialY = ev.stageY - offsety;
  
                html.style.display = 'none';
                html2.style.display = 'none';
                that.scaleX = 1;
                that.scaleY = 1;
                that.bookContainer.closeOpenenedBooks();
                
                var distance = 0;

                ev.onMouseMove = function(e) {
                    if (rank != 0) {
                        hooverTestSurface.uncache();
                        hooverTestSurface.graphics.clear();
                        hooverTestSurface.graphics.beginFill(dragNdropColor).rect(0,0,138,204);  
                        that.scaleX = 1;
                        that.scaleY = 1;
                        that.bookContainer.dragNdrop = true;
                        that.x = e.stageX - offsetx;
                        that.y = e.stageY - offsety;
                        distance = (that.x - that.emplacementX) * (that.x - that.emplacementX) + (that.y - that.emplacementY)*(that.y - that.emplacementY);
                        that.bookContainer.sort();
                        var test = that.bookContainer.main.dropAreaHitTest(that.x,that.y);
                    }
                }
                
                ev.onMouseUp = function(e){
                    if (rank != 0) {
                        var test = that.bookContainer.main.dropAreaHitTest(that.x,that.y);
                    } else {
                        test = false;                   
                    }

                    if (test && ((that.x > initialX+10) || (that.x < initialX-10) || (that.y > initialY+10) || (that.y < initialY-10))) {
                        AjaxController.logAction('DragNDrop_Mobile_'+fixedEncodeURIComponent($('#linkTitleTarget_'+book_id[0]+'_target').text()));
                        that.bookContainer.removeAllChildren();
                        window.location = "#!search_"+fixedEncodeURIComponent($('#linkTitleTarget_'+book_id[0]+'_target').text())+"_0_"+book_id[0]+"_1";
                    } else {
                        hooverTestSurface.graphics.clear();
                        hooverTestSurface.graphics.beginFill(this.decorativeColor).rect(0,0,138,204); 
                        hooverTestSurface.cache(0,0,138,204);  
                        
                        var tweenReturn = createjs.Tween.get(that,  {
                            override: true
                        });
                        
                        if (distance > 100) {
                            tweenReturn.to({
                                x:that.emplacementX,
                                y:that.emplacementY,
                                scaleX: 0.6,
                                scaleY: 0.6
                            },500,createjs.Ease.elasticOut
                            ).call(function(){
                                that.bookContainer.dragNdrop = false ; 

                                that.scaleX = 0.6;
                                that.scaleY = 0.6;
                                hooverTestSurface.uncache();
                                hooverTestSurface.graphics.clear();
                                hooverTestSurface.graphics.beginFill(this.decorativeColor).rect(0,0,138,204);     
                                hooverTestSurface.regY = 199;
                                hooverTestSurface.regX = 69;
                                hooverTestSurface.cache(0,0,138,204);                            
                                that.open = false;   
                            });
                        } else {
                            that.scaleX = 1;
                            that.scaleY = 1;
                            that.x = that.emplacementX;
                            that.y = that.emplacementY;
                            that.bookContainer.dragNdrop = false ;
                            hooverTestSurface.uncache();
                            var extremX = that.x + 69 + 270;

                            if (extremX <= 960) {
                                html.style.display = 'inline';
                                html.style.left = 69 + that.x + 'px';
                                html.style.top = that.y + 5 - 199 +'px';
                                if(rank != 0) {
                                    html2.style.display = 'inline';
                                    html2.style.left = that.x - 68 + 'px';
                                    html2.style.top = that.y + 3 +'px';
                                }
                                hooverTestSurface.graphics.clear();
                                hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,1)").
                                beginFill(whitecolor).rect(0,0,403,heightContent); /// 388 + 15 
                            } else {

                                html.style.display = 'inline';
                                html.style.left = that.x - 329 + 'px';
                                html.style.top = that.y + 5 - 199 +'px';
                                if(rank != 0) {
                                    html2.style.display = 'inline';
                                    html2.style.left = that.x - 333 + 'px';
                                    html2.style.top = that.y + 3 + 'px';
                                }
                                
                                hooverTestSurface.graphics.clear();
                                hooverTestSurface.graphics.setStrokeStyle(1,"square").beginStroke("rgba(0,0,0,1)").
                                beginFill(whitecolor).rect(-265,0,403,heightContent);
                            }    
                            that.open = true;
                            that.bookContainer.open = true;
                            that.bookContainer.push(that);
                        } 

                        tweenReturn.onChange = function() {
                            that.bookContainer.sort();
                        }
                    }
                }
            }
            
            this.close = function() {
                if (that.bookContainer.enablehoover && !that.bookContainer.dragNdrop /* && that.open*/) {
                    hooverTestSurface.graphics.clear();
                    hooverTestSurface.graphics.beginFill(this.decorativeColor).rect(0,0,138,204);     
                    hooverTestSurface.regY = 199;
                    hooverTestSurface.regX = 69;
                    hooverTestSurface.cache(0,0,138,204);
                    html.style.display = 'none';
                    html2.style.display = 'none';
                    createjs.Tween.get(this,  {
                        override: true
                    })
                    .to({
                        scaleX:0.6,
                        scaleY:0.6
                    },20,createjs.Ease.cubicIn).call(function() {
                        that.bookContainer.sort();             
                        createjs.Tween.get(hooverTestSurface,  {
                                override: true
                            })
                            .to({
                                regX: 69,
                                scaleX :  1
                            },20,createjs.Ease.cubicIn);        
                    });           
                }
            }
        }
        this.addChild(hooverTestSurface,bitmap);
    }
    
    Book.prototype._tick = function () {
        this.Container_tick();
    }
    
    Book.prototype.turn = function(rad) {
        this.x = getcosdata(rad + this.radius ,this.cosinus)*this.ellipseCoef + window.sanspapier.cible.centerX ;
        this.y = getsindata(rad + this.radius ,this.sinus)*this.ellipseCoef*window.sanspapier.cible.ellipse_ratio + window.sanspapier.cible.centerY;
        this.emplacementX = this.x;
        this.emplacementY = this.y;
    }
    
    Book.prototype.addRadius = function(rad) {
        this.radius += rad;
        this.originalY = this.y;  // to prevent bug when you turn the cible and you release the drag while mouseover on a book
    }
    
    Book.prototype.hideHtml = function() {
        this.html.style.display = 'none';
        this.html2.style.display = 'none';
        // i have to add those lines cause with touch-enabled devices closing booksheets 
        //doesn't unhoover properly the selected book on target 
        
        this.scaleX = 0.6;
        this.scaleY = 0.6;
        this.hooverSurface.uncache();
        this.hooverSurface.graphics.beginFill(this.decorativeColor).rect(0,0,138,204);     
        this.hooverSurface.regY = 199;
        this.hooverSurface.regX = 69;
        this.hooverSurface.cache(0,0,138,204);
        this.bookContainer.open = false;
        this.x = this.emplacementX;
        this.y = this.emplacementY;
        this.bookContainer.sort();       
    }
    
    window.Book = Book;
} (window));