/*areaDom 轮播图区域 options 轮播图配置*/
function createBannerArea(areaDom,options){
	//areaDom 分为 imgArea  和  numberArea 两个区域
	var imgArea = document.createElement("div");//1.一个区域，用于显示图片
	var numberArea = document.createElement("div");	//2.一个区域，用于显示角标，滑动的点点
	var curIndex = 1;//当前显示第几张图片
	var changTimer = null;//自动切换的计时器
	var changeDuration = 1000;//切换的时间间隔
	var tiemr = null;//动画计时器
	//1.
	initImgs();
	//2.
	initNumber();
	//3.
	setStatus();
	//4.
	autoChange();
	//5.
	function initImgs(){//放图片的函数
		imgArea.style.width = "100%";//设置放图片的盒子撑满所放区域
		imgArea.style.height= "100%";
		imgArea.style.display = "flex";//让盒子内的内容横向排列
		imgArea.style.overflow = "hidden"; //超出部分隐藏
		for(let  i = 0;i < options.length;i++){//循环遍历每个对象
			var  obj = options[i]; //把数组中的每一个对象给obj
			var img = document.createElement("img");//创建图片节点
			img.src = obj.imgUrl;//设置图片的src
			imgArea.appendChild(img);//给区域加图片
			img.style.height = "100%"//设置放图片的撑满他的盒子
			img.style.width = "100%";
			img.style.marginLeft = "0";//默认 auto NaN
			img.style.cursor = "pointer";
			img.addEventListener("click",function(){
				location.href = options[i].link;
			})
		}
		imgArea.addEventListener("mouseenter",function(){//当鼠标移入时，清除轮播
			clearInterval(changTimer);
		})
		imgArea.addEventListener("mouseleave",function(){//鼠标移除时，清楚
			autoChange();
		})
		
		areaDom.appendChild(imgArea);//把图片区域放进大区域
		
	}
	
	function initNumber(){
		for ( let i = 0;i<options.length;i++){
			numberArea.style.textAlign = "center"
			numberArea.style.marginTop = "-28px";
			var sp = document.createElement('span');
			sp.style.width = "12px";
			sp.style.height = "12px";
			sp.style.backgroundColor = "lightslategray";
			sp.style.display = "inline-block";//改成块元素 行内元素不能设置宽高
			sp.style.margin = "0 7px";
			sp.style.borderRadius = "50%";
			sp.style.cursor = "pointer";//小手
			sp.addEventListener("click",function(){//点击圆角切到他的那一页
				curIndex = i;
				 setStatus();
			})
			
			numberArea.appendChild(sp);
		}
		areaDom.appendChild(numberArea);//把角标放入区域	
	}
	function  setStatus(){//设置状态
		//1.设置圆圈的背景颜色
		for(let i = 0 ; i<options.length;i++){
			if(i === curIndex){
				//当前显示图片 设置圆圈的背景色为特殊色
				numberArea.children[i].style.backgroundColor = "lightslategray";
			}else{
				//当前显示图片 设置圆圈的背景色为特殊色
				numberArea.children[i].style.backgroundColor = "white";
			}
		}
		/* //1.显示图片
		var targetMarginLeft = curIndex * -100;//第零张-0 第一张-100% 第二张-200%
		imgArea.children[0].style.marginLeft = targetMarginLeft+"%" */
		var start = parseInt(imgArea.children[0].style.marginLeft)
		var end = curIndex * -100;
		var dis = end -start;
		var duration = 500;
		var speed = dis/duration;
		if(tiemr){
			clearInterval(tiemr);
		}
		
		tiemr = setInterval(function(){
			start += speed*20;
			imgArea.children[0].style.marginLeft = start + '%';
			if(Math.abs(end - start) < 1){
				imgArea.children[0].style.marginLeft = start + '%';
				clearInterval(tiemr);
			}
			
		},20)
			
	}
	function autoChange(){//自动切换
		changTimer = setInterval(function(){
			if(curIndex === options.length - 1){
				curIndex = 0;
			}
			else{
				curIndex++;
			}
			setStatus();
		},changeDuration)
	}
	
}