
var parent = document.getElementById("slider");
var s = new MainBanner(parent);

function MainBanner(parent)
{
	var that= this;
	this.slide =  new SlideShow;
	this.parent = parent;
	this.ul = parent.children[0];
	this.width = 1008;
	this.height = 190;
	this.arrayOfImage = [];	
	this.labelSlide =  new SlideShow;
	this.labelWidth = this.width;
	this.labelHeight = 100;
	this.arrayOfImageText = [];	
	this.currentIndex = 0;
	this.animStatus = false;
	this.autoAnimId;	
	this.animSpeed = 900;	
	
		
		that.ul.style.display= "none";
		for(var i=0;i<that.ul.childElementCount;i++)
		{
			var imgs = that.ul.children[i].children[0];
                        var span = that.ul.children[i].children[1];
			that.arrayOfImage.push(imgs);
                        that.arrayOfImageText.push(span);
		}
	
	
	this.slide.initialize(this.parent,this.width,this.height,this.arrayOfImage[0]);
	this.labelSlide.initialize(this.parent,this.width,this.height,this.arrayOfImageText[0]);
	
	this.initClick = function()
	{
		var left = document.createElement("img");
		left.setAttribute("src","images/slider-nav-left-active.png");
		left.className = "moveLeft";
		that.parent.appendChild(left);
		that.left_nav = left;
		
		left.onclick=(function (elem)
		{
			return function(){
				clearInterval(that.autoAnimId);
				if(that.currentIndex>0 && that.animStatus == false)
				{
					that.slide.transition(that.arrayOfImage[that.currentIndex-1],that.animSpeed,2,
					function()
					{
					that.animStatus =false;	
					});
					that.labelSlide.transition(that.arrayOfImageText[that.currentIndex-1],that.animSpeed,1,function(){});
					
					that.animStatus =true;
					that.currentIndex -= 1;
				}
					that.checkNavBarriers();
			}
		})();
		
		var right = document.createElement("img");
		right.setAttribute("src","images/slider-nav-right-active.png");
		right.className = "moveRight";
		that.parent.appendChild(right);
		that.right_nav = right;
		
		right.onclick=(function (elem)
		{
			return function(){
				clearInterval(that.autoAnimId);
				if(that.currentIndex<(that.arrayOfImage.length-1)  && that.animStatus ==false)
				{
					that.slide.transition(that.arrayOfImage[that.currentIndex+1],that.animSpeed,1,
					function()
					{
					that.animStatus = false;	
					});
					that.labelSlide.transition(that.arrayOfImageText[that.currentIndex+1],that.animSpeed,2,function(){});
					
					that.animStatus = true;
					that.currentIndex += 1;
				}
					that.checkNavBarriers();
			}
		})();
		
		
	}();
	
	this.checkNavBarriers = function()
	{
		if(that.currentIndex == 0)
		{
			that.left_nav.setAttribute("src","images/slider-nav-left-inactive.png");
		}
		else
		{
			that.left_nav.setAttribute("src","images/slider-nav-left-active.png");
		}
		
		if(that.currentIndex == (that.arrayOfImage.length-1))
		{
			that.right_nav.setAttribute("src","images/slider-nav-right-inactive.png");
		}
		else
		{
			that.right_nav.setAttribute("src","images/slider-nav-right-active.png");
		}
	}
	
	this.autoAnimate = function()
	{
		var dir =-1 ;
//		that.checkNavBarriers();
		
		that.autoAnimId = setInterval(autoLoop,3000);
		function autoLoop()
		{
			if(dir==1 && that.animStatus == false)
			{
				if(that.currentIndex>0 )
				{
					that.slide.transition(that.arrayOfImage[that.currentIndex-1],that.animSpeed,2,
					function()
					{
					that.animStatus =false;	
					});
					that.labelSlide.transition(that.arrayOfImageText[that.currentIndex-1],that.animSpeed,1,function(){});
					that.animStatus =true;
					that.currentIndex -= 1;
				}
				else
				{
					dir = -1;
				}
			}
			if(dir == -1   && that.animStatus ==false) 
			{
				if(that.currentIndex<(that.arrayOfImage.length-1))
				{
				  that.slide.transition(that.arrayOfImage[that.currentIndex+1],that.animSpeed,1,
				  function()
				  {
				  that.animStatus = false;	
				  });
				  that.labelSlide.transition(that.arrayOfImageText[that.currentIndex+1],that.animSpeed,2,function(){});
				  that.animStatus = true;
				  that.currentIndex += 1;
				}
				else
				{
					dir = 1;
				}
			}
//					that.checkNavBarriers();
						console.log(dir);
		}
	
	}();
	
	
}

function SlideShow()
{
	var that = this;
	
	this.current_div;	this.current_div_attributes = {};
	this.new_div;	this.new_div_attributes = {};
	this.anim_id;	
	this.slideParent;
	
	this.total_width;
	this.total_height;
	
	this.initialize = function(parent,w,h,parentSrc)
	{
		that.total_width = w;
		that.total_height = h;
		
		var sParent = document.createElement("div");
		parent.appendChild(sParent); 
		sParent.style.height=h+"px";
		sParent.style.width=w+"px";
		sParent.style.position="absolute";
		
		that.slideParent = sParent;
	
		that.current_div = document.createElement("div");
		that.slideParent.appendChild(that.current_div);
		that.current_div.style.position = "absolute";
		that.current_div.style.width = that.total_width+"px"; 
		that.current_div.style.height = that.total_height+"px";
		that.current_div.style.bottom = "0px";	that.current_div.style.left = "0px";           
		that.current_div.appendChild(parentSrc);
		
		that.new_div = document.createElement("div");
		that.slideParent.appendChild(that.new_div);
		that.new_div.style.position = "absolute";
		that.new_div.style.width = that.total_width+"px"; that.new_div.style.height = that.total_height+"px";
		that.new_div.style.top = "0px"; that.new_div.style.left = that.total_width+"px";
	}
	
	this.transition = function(new_imgSrc,duration,type,cb)
	{
		that.new_div.appendChild(new_imgSrc);
		switch(type)
		{
			case 1: that.new_div_attributes['left'] = that.total_width;
					that.anim_id = setInterval(move1,50);
					break;
					
			case 2: that.new_div_attributes['left'] = -that.total_width;
					that.anim_id = setInterval(move2,50);
					break;
					
		}
		
		function move1() //works on left attribute only
		{	
			if(that.new_div_attributes.left>=0)
			{
			that.new_div.style.left = that.new_div_attributes.left+"px";
			that.new_div_attributes.left = that.new_div_attributes.left - (that.total_width/(duration/50));
																		//(distance/(duration/rate)
			}
			else
			{
				clearInterval(that.anim_id);
				that.new_div_attributes['left'] = that.total_width;
				that.resetNew(new_imgSrc,cb);
				
			}
			
		}
		
		function move2() //works on left attribute only
		{
			if(that.new_div_attributes.left<=0)
			{
			that.new_div.style.left = that.new_div_attributes.left+"px";
			that.new_div_attributes.left = that.new_div_attributes.left + (that.total_width/(duration/50));
																		//(distance/(duration/rate)
			}
			else
			{
				clearInterval(that.anim_id);
				that.new_div_attributes['left'] = that.total_width;
				that.resetNew(new_imgSrc,cb);
			}
		}
	}
	
	this.resetNew = function(new_imgSrc,cb)
		{
		  that.current_div.removeChild(that.current_div.firstChild);
		  that.current_div.appendChild(new_imgSrc);
		  that.new_div.style.top = "0px"; that.new_div.style.left = that.total_width+"px";
		  that.new_div.style.width = that.total_width+"px"; that.new_div.style.height = that.total_height+"px";
		  cb();
		  return (that.parent);
		}
	
	
	
	this.finish = function()
	{
		clearInterval(that.anim_id);
	}
	
}

