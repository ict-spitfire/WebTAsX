function create_success(text) {
	return '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>' + text + '</div>';
}

function create_info(text, id, showClose) {
	var x = '<button type="button" class="close" data-dismiss="alert">&times;</button>';
	if(showClose == false) {
		x = "";
	}

	if(typeof(id) == "string") {
		return '<div id=\"' + id + '\" class="alert alert-info">' + x + text + '</div>';
	} else {
		return '<div class="alert alert-info">' + x + text + '</div>';
	}
}

function create_alert(text) {
	return '<div class="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>' + text + '</div>';
}

function create_error(text) {
	return '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>ERROR!</strong>' + text + '</div>';
}
