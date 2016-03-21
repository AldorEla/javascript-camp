$(document).ready(function() {

	/**
	 * Set the height of the Slider Carousel images; asign the maximum height value of the heighest image to all of the contained images
	 * 
	 * @param: 1st - object, all img tags contained in the given carousel; In this call: $('.gallery-preview > img')
	 * @param: 2nd - object, left and right navigation button for the gallery preview; In this call: $('.gallery-container .preview-control-arrow')
	 **/
	setSliderCarouselMaxHeight($('.gallery-preview > img'), $('.gallery-container .preview-control-arrow'));

	/**
	 * Show Thumbnails
	 **/
	showThumbnails();

	/**
	 * Initialize the Control Panel functions
	 **/
	controlPanel();
});

$(window).on('resize', function() {

	/**
	 * Set the height of the Slider Carousel images; asign the maximum height value of the heighest image to all of the contained images
	 * 
	 * @param: 1st - object, all img tags contained in the given carousel; In this call: $('.gallery-preview > img')
	 * @param: 2nd - object, left and right navigation button for the gallery preview; In this call: $('.gallery-container .preview-control-arrow')
	 **/
	setSliderCarouselMaxHeight($('.gallery-preview > img'), $('.gallery-container .preview-control-arrow'));

});



/**
 * Set the height of the Slider Carousel images; asign the maximum height value of the heighest image to all of the contained images
 * 
 * @param: carouselImgs - object, all img tags contained in the given carousel; Can be: $('.gallery-preview > img')
 **/
function setSliderCarouselMaxHeight(carouselImgs, previewControlArrow) {
	var carouselImgs 	 	= $(carouselImgs);
	var previewControlArrow = previewControlArrow;
	var maxHeight    	 	= 0;
	var topSpace 			= 0;

	carouselImgs.each(function() {
		if($(this).height() > maxHeight) {
			maxHeight = $(this).height();
			var topSpace = Math.round((maxHeight - $(this).height())/2);
			$(this).css('margin-top', topSpace);
		}
	});
	carouselImgs.each(function() {
		var topSpace = Math.round((maxHeight - $(this).height())/2);
		$(this).css('margin-top', topSpace);
		
		if($(this).width() > $(window).width()) {
			var leftSpace = Math.round(parseInt($(this).width() - $(window).width())/2);
			$(this).css('height', maxHeight);
			$(this).css('width', 'auto');
			$(this).css('margin-left', -leftSpace);
		}
	});

	if(maxHeight > 0) {
		var previewControlArrowTopSpace = Math.round(parseInt(maxHeight)/2 - parseInt(previewControlArrow.height()));
		
		previewControlArrow.css('margin-top', previewControlArrowTopSpace);
		carouselImgs.parent().css('height', maxHeight);
	} else {
		carouselImgs.css('height', 'auto');
		carouselImgs.parent().css('height', 'auto');
	}
}


/**
 * Control Panel
 * 
 * This function contains the functions related to the Gallery Navigation
 **/
function controlPanel() {
	/**
	 * Define constants
	 **/
	const shownClass  		= 'image-shown',
	      hiddenClass 		= 'image-hidden',
		  galleryPreviewImg = $('.gallery-preview > img'),
		  effectStyle       = 'slideHorizontal';

	/**
	 * Init the Next Slider Navigation button
	 * 
	 * @param: 1st - object, represents the directional button, can be prev or next and represents the clicked element; In this call: $('.next, .prev')
	 * @param: 2nd - string, represents the currently visible image; In this call: $('.image-shown')
	 * @param: 3rd - string, represents the invisibility CSS class; In this call: 'image-hidden'
	 * @param: 4th - object, all img tags contained in the given carousel; In this call: $('.gallery-preview > img')
	 * @param: 5th - boolean, slide the images with a fadeIn/fadeOut effect; In this call: true
	 **/
	initSliderNavigation($('.next, .prev'), shownClass, hiddenClass, galleryPreviewImg, effectStyle); // Next button click event

	/**
	 * Init Swipe Slider Navigation
	 **/
	swipeLeftRight();

	/**
	 * Init Tumbnail Navigation
	 **/
	initThumbnailNavigation($('.thumbnail'), shownClass, hiddenClass, galleryPreviewImg, effectStyle);


	/** Function Definitions ***/


	/**
	 * Slider Navigation buttons
	 * 
	 * @param: button 		- object, represents the directional button, can be prev or next and represents the clicked element; Can be: $('.next') or $('.prev')
	 * @param: shown 		- string, represents the currently visible image; Can be: 'image-shown'
	 * @param: hidden 		- string, represents the invisibility CSS class; Can be: 'image-hidden'
	 * @param: carouselImgs - object, all img tags contained in the given carousel; Can be: $('.gallery-preview > img')
	 * @param: effect 	    - boolean, slide the images with a fadeIn/fadeOut effect is the default behaviour
	 **/
	function initSliderNavigation(button, shown, hidden, carouselImgs, effect) {
		var button 		 = $(button),
		    carouselImgs = $(carouselImgs);

		if($('.' + shown).prev().length == 0) {
			$('.prev').addClass('disabled');
		}

		if($('.' + shown).next().length == 0) {
			$('.next').addClass('disabled');
		}

		// Reset fadeIn Effect Style, if effect is slideHorizontal
		resetFadeInEffectStyle(effect, carouselImgs, hidden);

		button.on('click', function(e) {
			// Reset fadeIn Effect Style, if effect is slideHorizontal
			resetFadeInEffectStyle(effect, carouselImgs, hidden);

			var button 			   = $(this),
			    currentActiveImage = $('.'+shown);
			
			if($(this).hasClass('next')) {
				var nextActiveImage    = currentActiveImage.next(),
				    button 				   = $('.next');
			} else {
				var nextActiveImage    = currentActiveImage.prev(),
				    button 				   = $('.prev');
			}

			// button.removeClass('disabled');

			// SET THE RELATED PREVIEW
			setRelatedPreview(button, currentActiveImage, nextActiveImage, carouselImgs, shown, hidden, effect);

			// SET THE RELATED THUMBNAIL
			setRelatedThumbnail(shown, false);

			e.preventDefault();
		});
	}

	/**
	 * Slider Navigation Thumbnails
	 * 
	 * @param: thumbnail 	- object, represents the clicked thumbnail
	 * @param: shown 		- string, represents the currently visible image; Can be: 'image-shown'
	 * @param: hidden 		- string, represents the invisibility CSS class; Can be: 'image-hidden'
	 * @param: carouselImgs - object, all img tags contained in the given carousel; Can be: $('.gallery-preview > img')
	 * @param: effect 	    - boolean, slide the images with a fadeIn/fadeOut effect
	 **/
	function initThumbnailNavigation(thumbnail, shown, hidden, carouselImgs, effect) {
		var thumbnail    = $(thumbnail),
		    carouselImgs = $(carouselImgs);

		// Reset fadeIn Effect Style, if effect is slideHorizontal
		resetFadeInEffectStyle(effect, carouselImgs, hidden);
		
		thumbnail.on('click', function() {
			var thumbnail 		   = $(this),
			    currentActiveImage = $('.'+shown),
			    nextActiveImage    = $('#'+thumbnail.data('preview-image')),
			    button             = $('.preview-control-arrow');

			// SET THE RELATED PREVIEW
			setRelatedPreview(false, currentActiveImage, nextActiveImage, carouselImgs, shown, hidden, effect);

			// SET THE RELATED THUMBNAIL
			setRelatedThumbnail(shown, thumbnail);
		});
	}

	/**
	 * Swipe Left/Right Events
	 **/
	function swipeLeftRight() {
		$('.swipe').on('swipeleft', function(e) {
			if(!$('.next').hasClass('disabled')) {
				$('.next').trigger('click');
			}
			e.preventDefault();
		});
		$('.swipe').on('swiperight', function(e) {
			if(!$('.prev').hasClass('disabled')) {
				$('.prev').trigger('click');
			}
			e.preventDefault();
		});
	}

	/**
	 * Set the Related Preview
	 * 
	 * @param: button 			  - object, represents the directional button, can be prev or next and represents the clicked element; Can be: $('.next') or $('.prev')
	 * @param: currentActiveImage - object
	 * @param: nextActiveImage    - object
	 * @param: shown 			  - string, represents the currently visible image; Can be: 'image-shown'
	 * @param: hidden 			  - string, represents the invisibility CSS class; Can be: 'image-hidden'
	 * @param: carouselImgs 	  - object, all img tags contained in the given carousel; Can be: $('.gallery-preview > img')
	 * @param: effect 	    	  - boolean, slide the images with a fadeIn/fadeOut effect
	 **/
	function setRelatedPreview(button, currentActiveImage, nextActiveImage, carouselImgs, shown, hidden, effect) {
		// effect = 'fadeIn';
		if(effect == 'fadeIn') {
			currentActiveImage.animate({
			  	opacity: 0.5
			}, 500).removeClass(shown).addClass(hidden).css({'z-index': -10});

			nextActiveImage.animate({
			  	opacity: 1
			}, 500).addClass(shown).removeClass(hidden).css({'z-index': 20});

			carouselImgs.not([currentActiveImage,nextActiveImage]).css({'z-index': 1});
		} else if(effect == 'slideHorizontal') {
			var counter = 0;
			
			currentActiveImage.removeClass(shown);
			nextActiveImage.addClass(shown);
			
			counter = parseInt($('.'+shown).attr('id').match(/[0-9 -()+]+$/)[0])-1;
			
			carouselImgs.css('margin-left', 0);
			carouselImgs.parent().animate({
			  	marginLeft: '-'+$('.'+shown).outerWidth()*counter
			}, 500);
		} else {
			currentActiveImage.removeClass(shown).addClass(hidden).css({'z-index': -10});
			nextActiveImage.addClass(shown).removeClass(hidden).css({'z-index': 20});
			carouselImgs.not([currentActiveImage,nextActiveImage]).css({'z-index': 1});
		}

		// $('.swipe').animate({
		// 	opacity: 1
		// }, 500);

		if(button != false) {
			$('.preview-control-arrow').removeClass('disabled');
			if(nextActiveImage.length > 0) {
				var slideId = parseInt(nextActiveImage.attr('id').match(/[0-9 -()+]+$/)[0]);

				if(carouselImgs.length == slideId || slideId == 1) {
					button.addClass('disabled');
				}
			}
		}
	}

	/**
	 * Set the Related Thumbnail
	 * 
	 * @param: shownImage 		- object, represents the image element from preview
	 * @param: thumbnail 		- object, represents the clicked thumbnail
	 * @param: nextActiveImage	- object, represents the next image to be displayed
	 **/
	function setRelatedThumbnail(shownImage, thumbnail) {
		var shownImage = $('.' + shownImage);

		$('.thumbnail').removeClass('current');

		$('.thumbnail[data-preview-image="'+shownImage.attr('id')+'"]').addClass('current');

		var slideId = parseInt(shownImage.attr('id').match(/[0-9 -()+]+$/)[0]);
			
		$('.preview-control-arrow').removeClass('disabled');

		if(slideId) {	
			if($('.gallery-thumbnail-list .thumbnail').length == slideId) {
				$('.preview-control-arrow.next').addClass('disabled');
			} else if(slideId == 1) {
				$('.preview-control-arrow.prev').addClass('disabled');
			}
		}
	}

	/**
	 * Reset fadeIn Effect Style
	 **/
	function resetFadeInEffectStyle(effect, carouselImgs, hidden) {
		var effect 		 = effect,
		    carouselImgs = $(carouselImgs),
		    hidden       = hidden;

		if(effect == 'slideHorizontal') {
			// Reset fadeIn Effect Style
			carouselImgs.removeClass(hidden);
			carouselImgs.parent().css({
				'width': Math.round($(window).width()*carouselImgs.length)
			});
			var imageWidth = $(window).width();

			carouselImgs.each(function() {
				$(this).css({
					'float': 'left',
					'margin-left': '-'+imageWidth/4,
					'z-index': 1,
					'opacity': 1,
					'width': imageWidth/2,
					'height': 'auto'
				});
			});

			$(window).resize(function() {
				var imageWidth = $(window).width();

				carouselImgs.each(function() {
					$(this).css({
						'float': 'left',
						'margin-left': '-'+imageWidth/4,
						'z-index': 1,
						'opacity': 1,
						'width': imageWidth/2,
						'height': 'auto'
					});
				});
			});
		}
	}
}

function showThumbnails() {
	$('.js-show-thumbnails').on('click', function() {
		if(!$('.gallery-thumbnail-container').is(':visible')){
			$('.gallery-thumbnail-container').slideDown('slow');
			$(this).text('Hide Thumbnails');
			$(this).parent().addClass('thumbnail-shown');
		} else {
			$('.gallery-thumbnail-container').slideUp('slow');
			$(this).text('Show Thumbnails');
			$(this).parent().removeClass('thumbnail-shown');
		}
	})
}