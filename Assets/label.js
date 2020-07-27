function t(t, e, a, s, v) {
	if (v == 'undefined') {
        v = 'Tampilkan Semua'
    }
	var r = "" + e + "search/label/" + t + "?max-results=8",
	n = '<div class="tl-recentLink ' + a + 'head"><div class="tl-recentText"><span class="tl-headtext">' + s + " " + t + '</span><span class="tl-headtextHover">' + s + " " + t + '</span></div><a href="' + r + '" class="tl-headlinks"></i></a></div>';
	return n
}

function getmeta(t) {
	var e = new Array;
	e[1] = "Jan",
	e[2] = "Feb",
	e[3] = "Mar",
	e[4] = "Apr",
	e[5] = "May",
	e[6] = "Jun",
	e[7] = "Jul",
	e[8] = "Aug",
	e[9] = "Sep",
	e[10] = "Oct",
	e[11] = "Nov",
	e[12] = "Dec";
	var a = t.substring(0, 4),
	s = t.substring(5, 7),
	r = t.substring(8, 10),
	n = '<span class="recentdate"><i class="fa fa-clock-o"></i> ' + e[parseInt(s, 10)] + " " + r + " " + a + "</span> ";
	return n
}

function getresult(t, e) {
    if (void 0 === t) var a = e;
    else var a = t;
	return a
}

function getauthor(t) {
	for (var e = 0; e < t.length; e++) var a = "<span class='authorname'>" + t[e].name.$t + "</span>";
	return a
}
function getfc(e) {
	if (e.category[0] !== "undefined") {return e.category[0].term}
}
function gethead(t, a, s) {		
	n = '<div class="tl-recentLink ' + a + 'head"><div class="tl-recentText"><span class="tl-headtext">' + s + " " + t + '</span><span class="tl-headtextHover">' + s + " " + t + '</span></div></div>';
	return n
}
$(function () {
	$(".tl-recentPost").each(function () {
		var e = $(this).attr("data-label"),
		vmt = $(this).attr("data-vmt"),
		dr = $(this).attr("data-results") === undefined ? 5 : $(this).attr("data-results"),
		n = "/feeds/posts/summary/-/" + e + "?",
		l = $(this);
		l.append('<div class="tl-wspace"><div class="simple-inner"></div></div>'),
		$.ajax({
			type: "GET",
			url: n,
			async: true,
			contentType: "application/json",
			dataType: "jsonp",
			success: function (s) {
				l.prepend(gethead(e, '/', "simple", "<i class='fa fa-rss'></i>"));
				for (var r = 0; r < s.feed.entry.length; r++) {
					for (var n = s.feed.entry[r], i = 0; i < n.link.length; i++) if ("alternate" == n.link[i].rel) {
						var o = n.link[i].href;
						break
					}
					try {
						var c = n.media$thumbnail.url.replace("s72-c", "w80-h75-c")
					} catch(p) {
						var c = "https://1.bp.blogspot.com/-BsMyq_oXDJs/XZvx7LCyLBI/AAAAAAAABr0/p87UwVhlyzoBFD3BGdwybQlRW6M-sd0qACLcBGAsYHQ/s1600-rw/nothumb.jpg"
					}
					var d = n.title.$t,
					u = n.published.$t,
					h = "<h3><a href=" + o + ">" + d + "</a></h3>",
					f = getmeta(u),
					v = getauthor(n.author),
					m = '<div class="container"><div class="tlrp-thumb tl-thumboverlay"><a class="featured-thumb" title="' + d + '" href="' + o + '"><img src="' + c + '"/></a></div><div class="recentcontent">' + h + '<div class="metadata">' + f + "</div></div>";
					l.find(".simple-inner").append(m)
				}
			}
		})
	}),
	$(".tl-recentSimple").each(function () {
		var e = $(this).attr("data-results") === undefined ? 5 : $(this).attr("data-results"),
		dr = "/feeds/posts/summary/?max-results=" + e + "&alt=json-in-script",
		r = $(this);
		r.append('<ul class="recent-post-item"></ul>'),
		$.ajax({
			type: "GET",
			url: dr,
			async: true,
			contentType: "application/json",
			dataType: "jsonp",
			success: function (t) {
				for (var e = 0; e < t.feed.entry.length; e++) {
					for (var a = 0; a < t.feed.entry[e].link.length; a++) if ("alternate" == t.feed.entry[e].link[a].rel) {
						var s = t.feed.entry[e].link[a].href;
						break
					}
					try {
						var n = t.feed.entry[e].media$thumbnail.url.replace("s72-c", "s150-c")
					} catch(l) {
						var n = "https://1.bp.blogspot.com/-BsMyq_oXDJs/XZvx7LCyLBI/AAAAAAAABr0/p87UwVhlyzoBFD3BGdwybQlRW6M-sd0qACLcBGAsYHQ/s1600-rw/nothumb.jpg"
					}
					var i = t.feed.entry[e],
					o = i.title.$t,
					c = getmeta(i.published.$t),
					p = getauthor(i.author),
					d = '<li><a class="featured-thumb" title="' + o + '" href="' + s + '"><img src="' + n + '"/></a><h3><a href="' + s + '">' + o + '</a></h3><div class="tl-recentSimple-meta">' + c + " " + p + "</div></li>";
					r.find("ul.recent-post-item").append(d)
				}
			}
		})
	})
}),

