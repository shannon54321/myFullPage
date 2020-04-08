
$.fn.extend({

	myFullPage: function(confit){

		var colorsArray = confit.colorsArray;

		var $W = $(this);
		var $Section = $W.find('.section');

		var commonStyle = {
			width:'100%',
			height:'100%',
		}
		var clientWidth = $(window).outerWidth();
		var clientHeight = $(window).outerHeight();

		var curIndex = 0;
		var lock = true;

		//初始化样式

		$('html')
			.add('body').css({
					position:'relative',
					overflow:'hidden',
					margin:0
			})
				.add($W)
					.add($Section)
						.css(commonStyle);




		$W.css({
			position:'absolute',
			left: 0,
			top: 0,
		}).find('.section')
			.each(function(index,ele){
				$(ele).css({
					backgroundColor: colorsArray[index],
					position: 'relative',
				}).find('.slide')
						.css({
							float: 'left',
							width: clientWidth,
							height: clientHeight,
							position: 'relative'
						})
							.wrapAll('<div class="sliderWrapper"></div>')	
			
			});

			$Section.find('.sliderWrapper').each(function(index,ele){
				
				$(ele).css({width: $(ele).find('.slide').length * clientWidth,height:clientHeight})
			});


+
		//js移动样式


		$Section.eq(0)
			.addClass('active')
				.end().find('.sliderWrapper')
					.css({position: 'absolute', top: 0, left: 0})
						.each(function(index,ele){
						$(ele).find('.slide').eq(0).addClass('innerActive');
					});

		$(document).on('keydown',function(e){

			// top 38 bottom 40
			

			if (e.which == 38 || e.which == 40) {
				
				if (lock) {
					lock = false;
					var newTop = $W.offset().top;
					

					if (e.which == 38 && curIndex != 0) {

						curIndex --;
						newTop += clientHeight;
					

					}else if (e.which == 40 && curIndex != $Section.size() - 1) {

						curIndex ++;
						newTop -= clientHeight;
					

					}
					$W.animate({
						top:newTop,
					},350,'swing',function(){
						lock = true;

						$('.active').removeClass('active');
						$Section.eq(curIndex).addClass('active');



					});
				}
			}


			// left 37 right 39


			if (e.which == 37 || e.which == 39) {
				if($('.active').find('.sliderWrapper').length){
					if (lock) {
						lock = false;

						var $SW = $('.active').find('.sliderWrapper');
						var curShowDom = $SW.find('.innerActive');

						var newLeft = $SW.offset().left;
						var hisLeft = newLeft;
						

						if (e.which == 37 && curShowDom.index() != 0) {

						
							newLeft += clientWidth;
						

						}else if (e.which == 39 && curShowDom.index() != $SW.find('.slide').size() - 1) {
							newLeft -= clientWidth;
						
						}
						$SW.animate({
							left:newLeft,
						},350,'swing',function(){
							lock = true;
							
							curShowDom.removeClass('innerActive');
							if (hisLeft - newLeft < 0 ) {
								curShowDom.prev().addClass('innerActive');
							}else if (hisLeft - newLeft > 0 ) {
								curShowDom.next().addClass('innerActive');
							}else{
								curShowDom.addClass('innerActive');
							}
							console.log(hisLeft ,newLeft);

							// $Section.eq(curIndex).addClass('innerActive');



						});



					}
				}
				
				

			}





			
			
		})


	}


});