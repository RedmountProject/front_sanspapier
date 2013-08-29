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
(function (window) {
    function BookContainer(main,result)  {
        this.initialize(main,result);
    }
 
    BookContainer.prototype = new createjs.Container();
    BookContainer.prototype.Container_initialize = BookContainer.prototype.initialize;
    BookContainer.prototype.Container_tick = BookContainer.prototype._tick; 
    BookContainer.prototype.initialize = function (main,result) {
        this.Container_initialize(); 
        this.main = main;
        var that = this;
        this.enablehoover = true;
        this._length = result.length;
        var book_ids = result;
        this.dragNdrop = false;
        this.open;
        
        this.imgsources = [];//// images url
        for (var i = 0; i<this._length;i++) {
            var imgSrc = '';
            if(book_ids[i][0] == 999999)
                imgSrc = window.sanspapier.config.images_url+book_ids[i][0]+'/'+book_ids[i][0]+'/'+book_ids[i][0]+'_fc_C.png';
            else
                imgSrc = window.sanspapier.config.images_url+book_ids[i][1]+'/'+book_ids[i][0]+'/'+book_ids[i][0]+'_fc_C.jpg';
            this.imgsources.push(imgSrc);
        }
 
        function loadImages(sources, callback) {
            var images = {};
            var loadedImages = 0;
            // get num of sources
            var numImages = sources.length;
            
            for(var src in sources) {
                images[src] = new Image();
                images[src].onload = function() {
                    if(++loadedImages >= numImages) {
                        callback();
                    }
                };
                images[src].src = sources[src];
            }
        }
        
        this.buildBook = function() {
            for (var img in that.imgsources) { 
                var bouquin = new Book(that.imgsources[img],book_ids[img],img, that);
                that.addChild(bouquin);
            }
            that.sort();
        }
        loadImages(this.imgsources, this.buildBook);
    }
 
    BookContainer.prototype._tick = function () {
        this.Container_tick();
    }
    
    BookContainer.prototype.turn = function(angle) {
        if (!this.dragNdrop) { 
            for (var child in this.children) {
                this.children[child].turn(angle);
            }
            this.sortChildren(function (obj1, obj2) {
                return obj1.y - obj2.y;
            });
        }
    }
    
    BookContainer.prototype.setRadius = function(angle) { 
        if (!this.dragNdrop) { 
            for (var child in this.children) {
                this.children[child].addRadius(angle);
            }
        }
    }
    
    BookContainer.prototype.sort = function() {
        if(!this.open) {
            this.sortChildren(function (obj1, obj2) {
                return obj1.y - obj2.y;
            });
        }
    }
    
    BookContainer.prototype.push = function(object) {
        this.setChildIndex(object,this.getNumChildren() - 1);
    }
    
    BookContainer.prototype.closeOpenenedBooks = function () {
        if (this.main.touchSupport) {
            for (var child in this.children) {
                this.children[child].close();
            }
        }
    }
    
    BookContainer.prototype.hideHtml = function () {
        for (var child in this.children) {
            this.children[child].hideHtml();
        }
    }
    
    BookContainer.prototype.enableEvents = function (state) {  
        for (var child in this.children) {
            this.children[child].mouseEnable = state;
        }    
    }
    
    window.BookContainer = BookContainer;
} (window));


