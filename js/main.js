$(document).ready(function(evt) {
	verticallyPositionTextBox();
	setBoxesGrid();

	playPauseVideo();
});

$(window).on('resize', function() {
	verticallyPositionTextBox();
	setBoxesGrid();
});

$(window).on('load', function() {
	verticallyPositionTextBox();
	setBoxesGrid();
});

function verticallyPositionTextBox() {
	var box = $('.parallax').find('.description.js-box');
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