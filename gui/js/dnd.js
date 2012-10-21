var dnd = new Object();
dnd.colors = ["#FF00FF","#FF0000","#808080","#808000","#800080","#800000","#00FFFF","#00FF00","#008080","#008000","#0000FF","#000080","#000000"];
dnd.colorID = 0;
dnd.varIndex = 0;
dnd.dragedObject = null;
dnd.lines = [];

function handleDragStart(e) {
	dnd.dragedObject = {};
	dnd.dragedObject.obj = this;
	dnd.dragedObject.isSrc = true;
	$(this).css("opacity", "0.6");

	// Hack: to get drag working in FF
	e.originalEvent.dataTransfer.setData('x', null);
}

function handleDragEnd(e) {
	$(this).css("opacity", "1");
	dnd.dragedObject.obj = null;

	var elem = document.querySelectorAll('.box');

	[].forEach.call(elem, function (col) {
		col.classList.remove('over');
	});

}

function handleDragOver(e) {
	if(dnd.dragedObject.obj == null) return;
	// Needed, to get the drop event listener working
	if (e.preventDefault) {
		e.preventDefault();
	}
}

function handleDrop(e) {
	var from_ = dnd.dragedObject.obj.getAttribute("id");
	var to_ = this.getAttribute("id");

	if(from_ == to_) return;

	var id_from = $('#' + from_);
	var id_to = $('#' + to_);

	console.log("CONNECT " + from_ + " with " + to_);

	//var from = Math.min(from_, to_);
	//var to = Math.max(from_, to_);

	var from = from_;
	var to = to_
	if(to_ > from_) {
		from = to_;
		to = from_;
	} 

	for(var i = 0; i < dnd.lines.length; i++) {
		l = dnd.lines[i];
		if(l[0] == from && l[1] == to) {
			return false;
		}
	}

	var exists = false;
	for(var i = 0; i < dnd.lines.length; i++) {
		l = dnd.lines[i];
		if(l[0] == from || l[1] == to || l[1] == from || l[0] == to) {
			exists = true;
			break;
		}
	}

	if(exists) {
		col = l[3];
		v = l[2];
		id_from.css("background-color", col);
		id_to.css("background-color", col);
		id_from.attr("var",v);
		id_to.attr("var",v);
	} else {
		col = dnd.colors[dnd.colorID++];
		v = "var" + (dnd.varIndex++);
		id_from.css("background-color", col);
		id_to.css("background-color", col);
		id_from.attr("var",v);
		id_to.attr("var",v);
		if(dnd.colorID == dnd.colors.length) dnd.colorID = 0;
	}

	var arr = [];
	arr[0] = from;
	arr[1] = to;
	arr[2] = v;
	arr[3] = col;

	dnd.lines.push(arr);
	update();
	return true;
}
