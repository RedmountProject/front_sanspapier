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
//        var global = window.sanspapier.cible;       
        this.enablehoover = true;
        this._length = result.length;
        var book_ids = result;
        this.dragNdrop = false;
        this.open;
        
        this.imgsources = [];
        for (var i = 0; i<this._length;i++) { 
            var imgSrc = window.sanspapier.config.images_url+book_ids[i][1]+'/'+book_ids[i][0]+'/'+book_ids[i][0]+'_fc_C.jpg';//// images url
            this.imgsources.push(imgSrc);
        }
 
        function loadImages(sources, callback) {
            var images = {};
            var loadedImages = 0;
            // get num of sources
            var numImages = sources.length;
            
            for(var src in sources) {
                images[src] = new Image();
                //images[src].crossOrigin = "Anonymous"; 
                //images[src].ident = src;
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


