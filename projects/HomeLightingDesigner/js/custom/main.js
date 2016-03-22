/// <reference path="../TypeScript/jquery.d.ts"/>
$(document).ready(function () {
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
$(window).on('resize', function () {
    /**
     * Set the height of the Slider Carousel images; asign the maximum height value of the heighest image to all of the contained images
     *
     * @param: 1st - object, all img tags contained in the given carousel; In this call: $('.gallery-preview > img')
     * @param: 2nd - object, left and right navigation button for the gallery preview; In this call: $('.gallery-container .preview-control-arrow')
     **/
    setSliderCarouselMaxHeight($('.gallery-preview > img'), $('.gallery-container .preview-control-arrow'));
});
$(window).on('load', function () {
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
    var carouselImgs = $(carouselImgs);
    var previewControlArrow = $(previewControlArrow);
    var maxHeight = 0;
    var topSpace = 0;
    var divider = 2;
    var leftSpace = 0;
    var previewControlArrowTopSpace = 0;
    carouselImgs.each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
            var topSpace = Math.round((maxHeight - $(this).height()) / divider);
            $(this).css('margin-top', topSpace);
        }
    });
    carouselImgs.each(function () {
        var topSpace = Math.round((maxHeight - $(this).height()) / divider);
        $(this).animate({
            'margin-top': topSpace
        }, 100, function () {
            $(this).css('margin-top', topSpace);
        });
        if ($(this).width() > $(window).width()) {
            var remainingWidth = ($(this).width() - $(window).width());
            var leftSpace = Math.round(remainingWidth / divider);
            $(this).css('height', maxHeight);
            $(this).css('width', 'auto');
            $(this).css('margin-left', -leftSpace);
        }
    });
    if (maxHeight > 0) {
        var previewControlArrowTopSpace = Math.round(maxHeight / divider - previewControlArrow.height());
        previewControlArrow.css('margin-top', previewControlArrowTopSpace);
        carouselImgs.parent().css('height', maxHeight);
    }
    else {
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
    var shownClass = 'image-shown', hiddenClass = 'image-hidden', galleryPreviewImg = $('.gallery-preview > img'), effectStyle = 'slideHorizontal';
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
    initThumbnailNavigation($('.thumbnail-next, .thumbnail-prev'), $('.thumbnail'), shownClass, hiddenClass, galleryPreviewImg, effectStyle);
    /**
     * Display the image having class .image-shown in the middle of the Window
     **/
    initVisibleSliderImage();
    $(window).on('resize', function () {
        /**
         * Display the image having class .image-shown in the middle of the Window
         **/
        initVisibleSliderImage();
    });
    /** ################################################################################################################################### **/
    /** Function Definitions ***/
    /**
     * Display the image having class .image-shown in the middle of the Window
     **/
    function initVisibleSliderImage() {
        var visibleImage = $('.' + shownClass);
        var carouselImgsContainer = $('.gallery-preview');
        var slideImage = $('.slide-image');
        var counter = parseInt($('.' + shownClass).attr('id').match(/[0-9 -()+]+$/)[0]) - 1;
        var spaceLeft = Math.round(slideImage.width() * counter);
        spaceLeft = spaceLeft + parseInt(slideImage.css('border-left-width')) * 2;
        carouselImgsContainer.css({
            'margin-left': -spaceLeft + 'px'
        });
    }
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
        var button = $(button), carouselImgs = $(carouselImgs);
        if ($('.' + shown).prev().length == 0) {
            $('.prev').addClass('disabled');
        }
        if ($('.' + shown).next().length == 0) {
            $('.next').addClass('disabled');
        }
        // Reset fadeIn Effect Style, if effect is slideHorizontal
        resetFadeInEffectStyle(effect, carouselImgs, hidden);
        button.on('click', function (e) {
            // Reset fadeIn Effect Style, if effect is slideHorizontal
            resetFadeInEffectStyle(effect, carouselImgs, hidden);
            var button = $(this), currentActiveImage = $('.' + shown);
            if ($(this).hasClass('next')) {
                var nextActiveImage = currentActiveImage.next(), button = $('.next');
            }
            else {
                var nextActiveImage = currentActiveImage.prev(), button = $('.prev');
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
    function initThumbnailNavigation(button, thumbnail, shown, hidden, carouselImgs, effect) {
        var thumbnail = $(thumbnail), carouselImgs = $(carouselImgs), button = $(button);
        // Reset fadeIn Effect Style, if effect is slideHorizontal
        resetFadeInEffectStyle(effect, carouselImgs, hidden);
        $('.thumbnail-next').on('click', function (e) {
            if (!$('.next').hasClass('disabled')) {
                $('.next').trigger('click');
            }
            e.preventDefault();
        });
        $('.thumbnail-prev').on('click', function (e) {
            if (!$('.prev').hasClass('disabled')) {
                $('.prev').trigger('click');
            }
            e.preventDefault();
        });
        thumbnail.on('click', function () {
            var thumbnail = $(this), currentActiveImage = $('.' + shown), nextActiveImage = $('#' + thumbnail.data('preview-image')), button = $('.preview-control-arrow');
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
        $('.swipe').on('swipeleft', function (e) {
            if (!$('.next').hasClass('disabled')) {
                $('.next').trigger('click');
            }
            e.preventDefault();
        });
        $('.swipe').on('swiperight', function (e) {
            if (!$('.prev').hasClass('disabled')) {
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
        if (effect == 'fadeIn') {
            currentActiveImage.animate({
                opacity: 0.5
            }, 500).removeClass(shown).addClass(hidden).css({ 'z-index': -10 });
            nextActiveImage.animate({
                opacity: 1
            }, 500).addClass(shown).removeClass(hidden).css({ 'z-index': 20 });
            carouselImgs.not([currentActiveImage, nextActiveImage]).css({ 'z-index': 1 });
        }
        else if (effect == 'slideHorizontal') {
            var counter = 0;
            var imageWidth = $('.gallery-preview-container').innerWidth();
            currentActiveImage.removeClass(shown).addClass('slide-image');
            nextActiveImage.addClass(shown).removeClass('slide-image');
            counter = parseInt($('.' + shown).attr('id').match(/[0-9 -()+]+$/)[0]) - 1;
            carouselImgs.parent().animate({
                marginLeft: '-' + $('.' + shown).outerWidth() * counter
            }, 'medium');
            nextActiveImage.animate({
                'width': Math.round(imageWidth),
                'margin-top': 0
            }, 'medium');
            currentActiveImage.animate({
                'width': Math.round(imageWidth - imageWidth / 3)
            }, 'medium', function () {
                setSliderCarouselMaxHeight($('.gallery-preview > img'), $('.gallery-container .preview-control-arrow'));
            });
        }
        else {
            currentActiveImage.removeClass(shown).addClass(hidden).css({ 'z-index': -10 });
            nextActiveImage.addClass(shown).removeClass(hidden).css({ 'z-index': 20 });
            carouselImgs.not([currentActiveImage, nextActiveImage]).css({ 'z-index': 1 });
        }
        if (button != false) {
            $('.preview-control-arrow').removeClass('disabled');
            if (nextActiveImage.length > 0) {
                var slideId = parseInt(nextActiveImage.attr('id').match(/[0-9 -()+]+$/)[0]);
                if (carouselImgs.length == slideId || slideId == 1) {
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
        $('.thumbnail[data-preview-image="' + shownImage.attr('id') + '"]').addClass('current');
        var slideId = parseInt(shownImage.attr('id').match(/[0-9 -()+]+$/)[0]);
        $('.preview-control-arrow').removeClass('disabled');
        $('.thumbnail-control-arrow').removeClass('disabled');
        if (slideId) {
            if ($('.gallery-thumbnail-list .thumbnail').length == slideId) {
                $('.preview-control-arrow.next').addClass('disabled');
                $('.thumbnail-control-arrow.thumbnail-next').addClass('disabled');
            }
            else if (slideId == 1) {
                $('.preview-control-arrow.prev').addClass('disabled');
                $('.thumbnail-control-arrow.thumbnail-prev').addClass('disabled');
            }
        }
    }
    /**
     * Reset fadeIn Effect Style
     **/
    function resetFadeInEffectStyle(effect, carouselImgs, hidden) {
        var effect = effect, carouselImgs = $(carouselImgs), hidden = hidden;
        if (effect == 'slideHorizontal') {
            // Reset fadeIn Effect Style
            carouselImgs.removeClass(hidden).not($('.' + shownClass)).addClass('slide-image');
            carouselImgs.parent().css({
                'width': Math.round($(window).width() * carouselImgs.length)
            });
            var borderStyle = 'none';
            if ($(window).width() >= 1024) {
                borderStyle = '15px solid #fff';
            }
            carouselImgs.each(function () {
                var imageWidth = Math.round($('.gallery-preview-container').innerWidth());
                var slideImageWidth = Math.round(imageWidth - imageWidth / 3);
                $(this).css({
                    'float': 'left',
                    'border-left': borderStyle,
                    'border-right': borderStyle,
                    'z-index': 1,
                    'opacity': 1,
                    'height': 'auto'
                });
                $('.' + shownClass).css('width', imageWidth);
                $('.slide-image').css('width', slideImageWidth);
            });
            $(window).on('resize', function () {
                carouselImgs.each(function () {
                    var imageWidth = Math.round($('.gallery-preview-container').innerWidth());
                    var slideImageWidth = Math.round(imageWidth - imageWidth / 3);
                    $(this).css({
                        'float': 'left',
                        'border-left': borderStyle,
                        'border-right': borderStyle,
                        'z-index': 1,
                        'opacity': 1,
                        'height': 'auto'
                    });
                    $('.' + shownClass).css('width', imageWidth);
                    $('.slide-image').css('width', slideImageWidth);
                });
                setSliderCarouselMaxHeight($('.gallery-preview > img'), $('.gallery-container .preview-control-arrow'));
            });
        }
    }
}
function showThumbnails() {
    $('.js-show-thumbnails').on('click', function () {
        if (!$('.gallery-thumbnail-container').is(':visible')) {
            $('.gallery-thumbnail-container').slideDown('slow');
            $(this).text('Hide Thumbnails');
            $(this).parent().addClass('thumbnail-shown');
        }
        else {
            $('.gallery-thumbnail-container').slideUp('slow');
            $(this).text('Show Thumbnails');
            $(this).parent().removeClass('thumbnail-shown');
        }
    });
}
