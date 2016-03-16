$(document).ready(function(evt) {
	verticallyPositionTextBox();

	playPauseVideo();

	// Known bug: Fix vh font-size on window resize
	// causeRepaintsOn = $("h1, h2, h3, p");

	$('section.parallax').on('mouseenter', '#controls', function() {
		$(this).on('scroll', function(evt) {
			console.log('I am listening!');
		})
	});
});

$(window).on('resize', function() {
  	// causeRepaintsOn.css("z-index", 1);

  	// Known bug: Fix vh font-size on window resize
	verticallyPositionTextBox();
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
	$('.js-play-video').on('click', function() {
		var video = $('#'+$(this).data('video'));
	    video[0].play();
	});
	$('.js-pause-video').on('click', function() {
		var video = $('#'+$(this).data('video'));
	    video[0].pause();
	});
	$('video').on('hover', function() {
		alert($(this));
		console.log($(this));
		var paused = $(this).get(0).paused;
		if(paused) {
			$(this)[0].play();
		} else {
			$(this)[0].pause();
		}
	})
}