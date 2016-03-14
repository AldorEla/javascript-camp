$(document).ready(function() {
	verticallyPositionTextBox();
});
$(window).on('resize', function() {
	verticallyPositionTextBox();
});

function verticallyPositionTextBox() {
	var box = $('.description.js-box');
	box.each(function() {
		var boxHeight = $(this).height();
		var parent    = $(this).closest('.js-parent');
		var parentHeight = parent.height();
		if(parentHeight <= $(window).height()) {
			var marginTop = 0;
			var intVal = Math.round(parseInt(parentHeight - boxHeight) / 2);
			if(intVal >= 0) {
				marginTop = intVal + 'px';
			}
			$(this).css('margin-top', marginTop);
		}
	});

}