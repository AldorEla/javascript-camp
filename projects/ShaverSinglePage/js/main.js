$(document).ready(function(evt) {
	verticallyPositionTextBox();
	setBoxesGrid();
	playPauseVideo();
	
	sectionScroll();
});

$(window).on('resize', function() {
	sectionScroll();
	verticallyPositionTextBox();
	setBoxesGrid();
});

$(window).on('load', function() {
	// sectionScroll();
	verticallyPositionTextBox();
	setBoxesGrid();
});

function verticallyPositionTextBox() {
	var box = $('.parallax').find('.description.js-box');
	var firstBox = $('#'+$(box).find('.js-paragraph').data('parent-id'));
	
	box.each(function() {
		var box 		 	= $(this);
		var boxHeight 	 	= box.height();
		var parent    	 	= $('#'+box.find('.js-paragraph').data('parent-id'));
		var sectionHeight 	= parent.height();
		var spaceTop 	 	= '';
	
		if(box.find('ing').length) {
			box.find('ing').load(function() {
				setSpaceTop();
			});
		} else {
			setSpaceTop();
		}
		box.css('padding-top', spaceTop);

		function setSpaceTop() {
			var intVal = Math.round(parseInt(sectionHeight - boxHeight) / 2);
			if(intVal >= 0) {
				spaceTop = intVal + 'px';
			}
		}
	});
}

function playPauseVideo() {
	$('.js-play-video').on('click', function(e) {
		e.preventDefault();
		var video = $('#'+$(this).data('video'));

		// Remove the current-status and set the class for clicked button
		if(!$(this).hasClass('current-status')) {
			$(this).closest('.player-buttons').find('.current-status').removeClass('current-status');
			$(this).addClass('current-status');

	    	video[0].play();
		}
	});
	$('.js-pause-video').on('click', function(e) {
		e.preventDefault();
		var video = $('#'+$(this).data('video'));

		// Remove the current-status and set the class for clicked button
		if(!$(this).hasClass('current-status')) {
			$(this).closest('.player-buttons').find('.current-status').removeClass('current-status');
			$(this).addClass('current-status');
			
	    	video[0].pause();
		}
	});
}

function setBoxesGrid() {
	var gridContainer 		= $('section[data-grid-template="box"]');
	var wide          		= gridContainer.find('.wide');
	var small 	      		= gridContainer.find('.small');
	var wideHeight   	 	= wide.height();
	var newSmallHeight 		= Math.round(wideHeight / 2);

	$(small).each(function() {
		$(this).css('height', newSmallHeight+'px');
		$(this).css('overflow', 'hidden');
		$(this).find('img').width('100%');
	});

	if($(window).width() <= 767) {
		resetInlineStyle(small);
	}
}

function resetInlineStyle(elem) {
	if(elem.length) {
		elem.removeAttr('style');
	}
}

function sectionScroll() {
	var controlsScroll = $('section[data-scroll-section="controls-scroll"]');
	var firstSection   = $('#'+controlsScroll.data('first-section'));
	var firstSectionHeight = 'auto';
	var maxHeight      = 0;
	firstSection.children().each(function() {
		if($(this).height() > maxHeight) {
			maxHeight = $(this).height();
		}
	});
	firstSectionHeight = maxHeight;
	
	controlsScroll.css({ 'height': firstSectionHeight + 'px', 'overflow': 'auto'});

	var lastScrollTop = 0;
	controlsScroll.on('scroll', function(e) {
		$.each( $('.static'), function( i, val ) {
			i = i + 1;
			console.log(i);
			console.log(val);
	    	var elemTop = $('#controls'+i).offset().top;
		    var elemBottom = elemTop + $('#controls'+i).height();
		    
	    	var result = ((elemBottom <= (controlsScroll.height() + controlsScroll.offset().top)) && (elemTop >= controlsScroll.offset().top));
		    $('#controls'+i).removeClass('intoView');
		    if(result == true) {
		    	$('#controls'+i).addClass('intoView');
		    	console.log($('#controls'+i));
			}
		});
		// $(this).off(e);
	});
}