$(document).ready(function() {
	verticallyPositionTextBox();
});
$(window).on('resize', function() {
	verticallyPositionTextBox();
});

function verticallyPositionTextBox() {
	var box = $('.description.js-box');
	box.each(function() {
		var box = $(this);
		var boxHeight = $(this).height();
		var parent    = $(this).closest('.js-parent');
		var parentHeight = parent.height();
		var marginTop = '';

		if(parentHeight <= $(window).height()) {
			var intVal = Math.round(parseInt(parentHeight - boxHeight) / 2);
			if(intVal >= 0) {
				marginTop = intVal + 'px';
			}
		}
		if($(window).width() < 750) {
			box.find('.js-paragraph').css('margin-top', marginTop);
			box.find('.js-paragraph').css('margin-top', marginTop);
			
			box.find('.js-paragraph').addClass('dark-bg');
		} else {
			box.find('.js-paragraph').removeClass('dark-bg');
		}
		box.css('margin-top', marginTop);
	});

}