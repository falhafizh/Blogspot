//<![CDATA[
    function t(t, e, a, s, v) {
        if (v == 'undefined') {
            v = 'Tampilkan Semua'
        }
        var r = "" + e + "search/label/" + t + "?max-results=8",
        n = '<div class="tl-recentLink ' + a + 'head"><div class="tl-recentText"><span class="tl-headtext">' + s + " " + t + '</span><span class="tl-headtextHover">' + s + " " + t + '</span></div><a href="' + r + '" class="tl-headlinks">' + v + ' <i class="fa fa-angle-right"></i></a></div>';
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
        for (var e = 0; e < t.length; e++) var a = "<span class='authorname'><i class='fa fa-user'></i> " + t[e].name.$t + "</span>";
        return a
    }
    function getfc(e) {
        if (e.category[0] !== "undefined") {
            return e.category[0].term
        }
    }
    function gethead(t, e, a, s, v) {
        if (v == undefined) {
            v = 'Tampilkan Semua'
        }
        var r = "search/label/" + t + "?max-results=8",
        n = '<div class="tl-recentLink ' + a + 'head"><div class="tl-recentText"><span class="tl-headtext">' + s + " " + t + '</span><span class="tl-headtextHover">' + s + " " + t + '</span></div><a href="' + r + '" class="tl-headlinks">' + v + ' <i class="fa fa-angle-right"></i></a></div>';
        return n
    }
    $(function () {
        $(".tl-feature-style").each(function () {
            var a = $(this),
            e = a.attr("data-label"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 5 : $(this).attr("data-results"),
            t = "/feeds/posts/summary/-/" + e + "?max-results=" + dr + "&alt=json-in-script";
            $.ajax({
                type: "GET",
                url: t,
                async: !0,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (e) {
                    var t = e.feed.entry;
                    if (t) {
                        a.append(gethead(a.attr("data-label"), '/', 'feature', '<i class="fa fa-rss"></i>', vmt) + '<div class="tl-feature-outer"><div class="tl-feature-head"></div><div class="tl-feature-sub"></div></div>');
                        for (var s = 0; s < t.length; s++) {
                            for (var i, d, n, l, r, c = t[s], o = 0; o < c.link.length; o++) if ("alternate" == c.link[o].rel) {
                                d = c.link[o].href;
                                break
                            }
                            n = void 0 !== c.media$thumbnail ? c.media$thumbnail.url: "",
                            i = c.title.$t,
                            r = getmeta(c.published.$t),
                            l = getauthor(c.author);
                            var v = 0 == s ? '<div class="container"><a title="' + i + '" href="' + d + '"><img src="' + n.replace("s72-c", "w765-h350-c") + '"/></a><div class="content"><h3><a href="' + d + '">' + i + '</a></h3><div class="content-meta">' + r + l + "</div></div></div>": '<div class="container"><div class="container-In"><a title="' + i + '" href="' + d + '"><img src="' + n.replace("s72-c", "w175-h100-c") + '"/></a><div class="content"><h3><a href="' + d + '">' + i + '</a></h3><div class="content-meta">' + r + l + "</div></div></div></div>";
                            0 == s ? a.find(".tl-feature-head").append(v) : a.find(".tl-feature-sub").append(v)
                        }
                        a.addClass("loaded").removeClass("unloaded").fadeIn()
                    }
                }
            })
        });
        $(".tl-recentHeadline").each(function () {
            var e = $(this).attr("data-label"),
            a = $(this).attr("data-results"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 4 : $(this).attr("data-results"),
            n = "/feeds/posts/summary/-/" + e + "?max-results=" + dr + "&alt=json-in-script",
            l = $(this);
            l.append('<div class="tl-wspace"><div class="tl-headlineWrap"><div class="headline"></div></div><div class="tl-subheadWrap"><div class="subhead"></div></div></div>'),
            $.ajax({
                type: "GET",
                url: n,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (a) {
                    l.prepend(gethead(e, '/', "headline", "<i class='fa fa-rss'></i>", vmt));
                    for (var s = 1; s < a.feed.entry.length; s++) {
                        for (var n = a.feed.entry[s], i = 0; i < n.link.length; i++) if ("alternate" == n.link[i].rel) {
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
                        m = '<div class="container"><div class="imagewrap"><a class="featured-thumb" title="' + d + '" href="' + o + '"><img src="' + c + '"/></a></div><div class="recentcontent">' + h + '<div class="metadata">' + f + "" + v + "</div></div>";
                        l.find(".subhead").append(m)
                    }
                    var g = a.feed.entry[0];
                    try {
                        var y = g.media$thumbnail.url.replace("s72-c", "w400-h225-c"),
                        $ = g.media$thumbnail.url.replace("s72-c", "s900-no")
                    } catch(p) {
                        var y = "https://1.bp.blogspot.com/-BsMyq_oXDJs/XZvx7LCyLBI/AAAAAAAABr0/p87UwVhlyzoBFD3BGdwybQlRW6M-sd0qACLcBGAsYHQ/s1600-rw/nothumb.jpg"
                    }
                    for (var b = 0; b < g.link.length; b++) if ("alternate" == a.feed.entry[0].link[b].rel) {
                        var k = a.feed.entry[0].link[b].href;
                        break
                    }
                    var A = "<h3><a href='" + k + "'>" + g.title.$t + "</a></h3>",
                    x = g.title.$t,
                    j = "<p>" + g.summary.$t.substr(0, 150) + "...</p>",
                    w = getauthor(g.author),
                    T = g.published.$t,
                    E = getmeta(T);
                    l.find(".headline").html("<div class='tl-magMedia'><a class='featured-thumb' title='" + x + "' href='" + k + "'><img src='" + y + "'/></a></div>" + A + "<div class='tl-headm'>" + E + w + "</div>" + j + "")
                }
            })
        });
        $(".recent-post-straight").each(function () {
            var a = $(this).attr("data-label"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 5 : $(this).attr("data-results"),
            s = "/feeds/posts/summary/-/" + a + "?max-results=" + dr + "&alt=json-in-script",
            e = $(this);
            $.ajax({
                type: "GET",
                url: s,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (s) {
                    var i = s.feed.entry;
                    if (i) {
                        e.append('<div class="toggler"><div class="straight-inner">' + gethead(a, '/', "straight", '<i class="fa fa-rss"></i>', vmt) + "</div></div>");
                        for (var r = 0; r < i.length; r++) {
                            for (var l, c = i[r], n = 0; n < c.link.length; n++) if ("alternate" == c.link[n].rel) {
                                var d = c.link[n].href;
                                break
                            }
                            void 0 !== c.media$thumbnail && (l = c.media$thumbnail.url.replace("s72-c", "w360-h210-c"));
                            var h = c.title.$t,
                            v = getmeta(c.published.$t),
                            m = getauthor(c.author),
                            o = getfc(c),
                            p = c.summary.$t.substr(0, 150) + "...",
                            g = 0 == r ? '<div class="container simplehead"><div class="imgwrap"><div class="tlrp-thumb tl-thumboverlay"><a class="featured-thumb" title="' + h + '" href="' + d + '"><img class="layerimg" src="' + l + '"></a></div><a class="recentLabel-1" href="/search/label/' + o + '">' + o + '</a><div class="layerc"><h3><a href="' + d + '">' + h + '</a></h3><div class="simplemeta">' + v + m + '</div><div class="straight-sum">' + p + '</div><div class="straight-jump"><a href="' + d + '">Continue Reading <i class="fa fa-angle-double-right"></i></a></div></div></div></div>': '<div class="simplesub"><div class="recentcontent"><a href="/search/label/' + o + '" class="recentLabel">' + o + '</a><h3><a href="' + d + '">' + h + '</a></h3><div class="simplesubmeta">' + v + m + "</div></div>";
                            e.find(".straight-inner").append(g)
                        }
                    }
                }
            })
        });
        $(".tl-recentComments").each(function () {
            var e = $(this).attr("data-results") == undefined ? 5 : $(this).attr("data-results"),
            s = "/feeds/comments/default?alt=json-in-script&max-results=" + e,
            r = $(this);
            $.ajax({
                type: "GET",
                url: s,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (t) {
                    for (var e = 0; e < t.feed.entry.length; e++) {
                        for (var a = t.feed.entry[e], s = 0; s < a.link.length; s++) if ("alternate" == a.link[s].rel) {
                            var n = a.link[s].href;
                            break
                        }
                        var l = a.author[0].name.$t,
                        i = a.author[0].gd$image.src,
                        o = a.content.$t.length <= 100 ? a.content.$t: a.content.$t.substr(0, 100) + '...',
                        c = getmeta(a.published.$t),
                        p = '<div class="comment-item"><span class="authornamec"><img src="' + i + '"/>' + l + '</span> said, "<span class="commentcontent">' + o + '</span>" on <span class="commenttime">' + c + '</span><div class="commentlink"><a href="' + n + '"><i class="fa fa-comment-o"></i> Read Comment</a></div></div>';
                        r.append(p)
                    }
                }
            })
        }),
        $(".tl-galleryMag").each(function () {
            var e = $(this).attr("data-label"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 10 : $(this).attr("data-results"),
            n = "/feeds/posts/summary/-/" + e + "?max-results=" + dr + "&alt=json-in-script",
            l = $(this);
            l.append('<div class="tl-wspace row"><div class="tl-headlineWrap"><div class="headline"></div></div><div class="tl-subheadWrap"><div class="subhead"></div></div></div>'),
            $.ajax({
                type: "GET",
                url: n,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (a) {
                    l.prepend(gethead(e, '/', "gallery", "<i class='fa fa-rss'></i>", vmt));
                    for (var s = 1; s < a.feed.entry.length; s++) {
                        for (var n = a.feed.entry[s], i = 0; i < n.link.length; i++) if ("alternate" == n.link[i].rel) {
                            var o = n.link[i].href;
                            break
                        }
                        try {
                            var c = n.media$thumbnail.url.replace("s72-c", "w200-h150-c")
                        } catch(p) {
                            var c = "https://1.bp.blogspot.com/-BsMyq_oXDJs/XZvx7LCyLBI/AAAAAAAABr0/p87UwVhlyzoBFD3BGdwybQlRW6M-sd0qACLcBGAsYHQ/s1600-rw/nothumb.jpg"
                        }
                        var d = n.title.$t,
                        u = n.published.$t,
                        h = "<h3><a href=" + o + ">" + d + "</a></h3>",
                        f = getmeta(u),
                        v = getauthor(n.author),
                        m = '<div class="tl-gal-item"><div class="tl-gal-item-inner"><div class="imagewrap tlrp-thumb tl-thumboverlay"><a class="featured-thumb" title="' + d + '" href="' + o + '"><img src="' + c + '"/></a></div><div class="recentcontent">' + h + '<div class="metadata">' + f + " - " + v + "</div></div></div>";
                        l.find(".subhead").append(m)
                    }
                    var g = a.feed.entry[0];
                    try {
                        var y = g.media$thumbnail.url.replace("s72-c", "w600-h450-c"),
                        $ = g.media$thumbnail.url.replace("s72-c", "s900-no")
                    } catch(p) {
                        var y = "https://1.bp.blogspot.com/-BsMyq_oXDJs/XZvx7LCyLBI/AAAAAAAABr0/p87UwVhlyzoBFD3BGdwybQlRW6M-sd0qACLcBGAsYHQ/s1600-rw/nothumb.jpg"
                    }
                    for (var b = 0; b < g.link.length; b++) if ("alternate" == a.feed.entry[0].link[b].rel) {
                        var k = a.feed.entry[0].link[b].href;
                        break
                    }
                    var A = "<h3><a href='" + k + "'>" + g.title.$t + "</a></h3>",
                    x = g.title.$t,
                    j = "<p>" + g.summary.$t.substr(0, 150) + "...</p>",
                    w = getauthor(g.author),
                    T = g.published.$t,
                    E = getmeta(T);
                    l.find(".headline").html("<div class='tl-magMedia tlrp-thumb tl-thumboverlay'><a class='featured-thumb' title='" + x + "' href='" + k + "'><img src='" + y + "'/></a></div>" + A + j + "<div class='tl-headm'>" + E + " - " + w + "</div>")
                }
            })
        }),
        $(".featuredContent").each(function () {
            var t = $(this).attr("data-label"),
            a = "/feeds/posts/summary/-/" + t + "?max-results=1&alt=json-in-script",
            s = $(this);
            s.append('<div class="tl-topost tl-magMedia"><a class="tl-topost-cat" href="/search/label/' + t + '?max-results=8">' + t + "</a></div>"),
            $.ajax({
                type: "GET",
                url: a,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (t) {
                    var e = t.feed.entry[0];
                    try {
                        var a = e.media$thumbnail.url.replace("s72-c", "w368-h350-c"),
                        r = e.media$thumbnail.url.replace("s72-c", "s900-no")
                    } catch(n) {
                        var a = "https://1.bp.blogspot.com/-BsMyq_oXDJs/XZvx7LCyLBI/AAAAAAAABr0/p87UwVhlyzoBFD3BGdwybQlRW6M-sd0qACLcBGAsYHQ/s1600-rw/nothumb.jpg"
                    }
                    for (var l = 0; l < e.link.length; l++) if ("alternate" == e.link[l].rel) {
                        var i = e.link[l].href;
                        break
                    }
                    var o = e.title.$t,
                    c = getauthor(e.author),
                    p = getmeta(e.published.$t),
                    d = '<a href="' + i + '">"' + o + "</a>",
                    u = "<div class='tl-topost-item'><a class='featured-thumb' title='" + o + "' href='" + i + "'><img src='" + a + "'/></a><div class='top-right-content'><a class='tl-topost-item-link' title='" + o + "' href='" + i + "'><h3>" + o + "</h3></a><div class='top-right-meta'>" + p + " " + c + "</div></div></div>";
                    $(".tl-topost", s).append(u)
                }
            })
        }),
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
                    l.prepend(gethead(e, '/', "simple", "<i class='fa fa-rss'></i>", vmt));
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
                        m = '<div class="container"><div class="tlrp-thumb tl-thumboverlay"><a class="featured-thumb" title="' + d + '" href="' + o + '"><img src="' + c + '"/></a></div><div class="recentcontent">' + h + '<div class="metadata">' + f + v + "</div></div>";
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
    $(function () {
        function t(t) {
            var t, e, a = [];
            for (e = 0; t > e; e++) a.push(e);
            return shuffle(a)
        }
        shuffle = function (t) {
            for (var e, a, s = t.length; s; e = parseInt(Math.random() * s), a = t[--s], t[s] = t[e], t[e] = a);
            return t
        },
        $(".tl-randomSimple").each(function () {
            dr = $(this).attr("data-results") === undefined ? 5 : $(this).attr("data-results"),
            r = "/feeds/posts/summary/?max-results=500&alt=json-in-script",
            n = $(this);
            n.append('<ul class="random-inner"></ul>'),
            $.ajax({
                type: "GET",
                url: r,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (e) {
                    for (var a = e.feed.entry, r = a.length, l = t(r), i = 0; dr > i; i++) {
                        for (var o = 0; o < e.feed.entry[l[i]].link.length; o++) if ("alternate" == a[l[i]].link[o].rel) {
                            var c = e.feed.entry[l[i]].link[o].href;
                            break
                        }
                        try {
                            var p = a[l[i]].media$thumbnail.url
                        } catch(d) {
                            var p = "https://lh6.googleusercontent.com/-IqlHLqb7VkI/VJWT8jiJZZI/AAAAAAAAFxo/2Wjhxof4qxs/s500-no/undefined.jpg"
                        }
                        var u = a[l[i]].title.$t,
                        h = a[l[i]].published.$t,
                        f = getmeta(h),
                        v = getauthor(a[l[i]].author),
                        m = '<li><a class="featured-thumb" title="' + u + '" href="' + c + '"><img src="' + p + '"/></a><h3><a href="' + c + '">' + u + '</a></h3><div class="tl-randomSimple-meta">' + f + " - " + v + "</div></li>";
                        n.find("ul").append(m)
                    }
                }
            })
        })
    }),
    function (t, e, a) {
        function s(s, r) {
            function l() {
                f.elem.children().css("margin", 0).children().css("margin", 0),
                f.elem.css({
                    position: "relative",
                    height: f.opts.height,
                    overflow: "hidden"
                }),
                f.targ.css({
                    position: "absolute",
                    margin: 0
                }),
                setInterval(function () {
                    h()
                },
                100)
            }
            function i() {
                f.timer = setInterval(function () {
                    1 == f.winFocus && c(f.opts.direction)
                },
                f.opts.interval),
                t(f.opts.controls.toggle).addClass("et-run").html(f.opts.controls.stopText)
            }
            function o() {
                clearInterval(f.timer),
                f.timer = 0,
                t(f.opts.controls.toggle).removeClass("et-run").html(f.opts.controls.playText)
            }
            function c(t) {
                var e, a, s;
                if (f.elem.is(":visible")) {
                    "up" == t ? (e = ":first-child", a = "-=", s = "appendTo") : (e = ":last-child", a = "+=", s = "prependTo");
                    var r = f.targ.children(e),
                    n = r.outerHeight();
                    f.targ.stop(!0, !0).animate({
                        top: a + n + "px"
                    },
                    f.opts.speed, f.opts.easing, function () {
                        r.hide()[s](f.targ).fadeIn(),
                        f.targ.css("top", 0),
                        h()
                    })
                }
            }
            function p(t) {
                o(),
                c("up" == t ? "up": "down")
            }
            function d() {
                var e = 0,
                a = f.elem.css("display");
                f.elem.css("display", "block"),
                f.targ.children().each(function () {
                    e += t(this).outerHeight()
                }),
                f.elem.css({
                    display: a,
                    height: e
                })
            }
            function u(e) {
                var a = 0;
                f.targ.children(":lt(" + f.opts.visible + ")").each(function () {
                    a += t(this).outerHeight()
                }),
                1 == e ? f.elem.stop(!0, !0).animate({
                    height: a
                },
                f.opts.speed) : f.elem.css("height", a)
            }
            function h() {
                "auto" == f.opts.height && 0 != f.opts.visible ? (anim = "init" == arguments.callee.caller.name ? 0 : 1, u(anim)) : "auto" == f.opts.height && d()
            }
            var f = this;
            return f.opts = t.extend({},
            n, r),
            f.elem = t(s),
            f.targ = t(s).children(":first-child"),
            f.timer = 0,
            f.mHover = 0,
            f.winFocus = 1,
            l(),
            i(),
            t([e, a]).off("focus.jqet").on("focus.jqet", function () {
                f.winFocus = 1
            }).off("blur.jqet").on("blur.jqet", function () {
                f.winFocus = 0
            }),
            1 == f.opts.mousePause && f.elem.mouseenter(function () {
                f.timerTemp = f.timer,
                o()
            }).mouseleave(function () {
                0 !== f.timerTemp && i()
            }),
            t(f.opts.controls.up).on("click", function (t) {
                t.preventDefault(),
                p("up")
            }),
            t(f.opts.controls.down).on("click", function (t) {
                t.preventDefault(),
                p("down")
            }),
            t(f.opts.controls.toggle).on("click", function (t) {
                t.preventDefault(),
                0 == f.timer ? i() : o()
            }),
            {
                up: function () {
                    p("up")
                },
                down: function () {
                    p("down")
                },
                start: i,
                stop: o,
                options: f.opts
            }
        }
        var r = "easyTicker",
        n = {
            direction: "up",
            easing: "swing",
            speed: "slow",
            interval: 2e3,
            height: "auto",
            visible: 0,
            mousePause: 1,
            controls: {
                up: "",
                down: "",
                toggle: "",
                playText: "Play",
                stopText: "Stop"
            }
        };
        t.fn[r] = function (e) {
            return this.each(function () {
                t.data(this, r) || t.data(this, r, new s(this, e))
            })
        }
    } (jQuery, window, document),
    $(function () {
        $(".news-ticker").each(function () {
            var s = "/feeds/posts/summary/?max-results=" + 10 + "&alt=json-in-script",
            r = $(this);
            r.append('<div class="tickerwrapper"><span class="tickerl"></span><div class="ticker-nigas"><ul></ul></div></div>'),
            $.ajax({
                type: "GET",
                url: s,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (e) {
                    for (var a = 1; a < e.feed.entry.length; a++) {
                        for (var s = 0; s < e.feed.entry[a].link.length; s++) if ("alternate" == e.feed.entry[a].link[s].rel) {
                            var n = e.feed.entry[a].link[s].href;
                            break
                        }
                        var l = e.feed.entry[a].title.$t,
                        i = getfc(e.feed.entry[a]),
                        o = t + "/serch/label/" + i,
                        c = '<li><a class="tickerlink" href="' + o + '" target="_blank">' + i + '</a><a href="' + n + '">' + l + "</a></li>";
                        $(".ticker-nigas ul", r).append(c)
                    }
                    $(".ticker-nigas").easyTicker({
                        direction: "up",
                        easing: "swing",
                        speed: "slow",
                        interval: 2e3,
                        height: "auto",
                        visible: 0,
                        mousePause: 1
                    })
                }
            })
        })
    });
    function getreq(e, t) {
        $.ajax({
            type: "GET",
            url: "/feeds/posts/summary/-/" + e + "?max-results=1&alt=json-in-script",
            async: true,
            contentType: "application/json",
            dataType: "jsonp",
            success: function (e) {
                var a = e.feed.entry;
                for (var o = 0; o < a.length; o++) {
                    for (var r = a[o], s = 0; s < r.link.length; s++) if ("alternate" == r.link[s].rel) {
                        var l = r.link[s].href;
                        break
                    }
                    try {
                        var n = r.media$thumbnail.url.replace("72-c", "500-c")
                    } catch(c) {
                        var n = "https://lh4.googleusercontent.com/-sEsEVEIbC_A/VC75LXVY_9I/AAAAAAAAFjw/3IMVKlywmmE/s500/No image.jpg"
                    }
                    var i = r.title.$t,
                    c = getmeta(r.published.$t),
                    h = getauthor(r.author),
                    p = getfc(r),
                    m = '<div class="hometop-four"><div class="hometop-fourin"><div class="tlrp-thumb tl-thumboverlay"><a class="featured-thumb" title="' + i + '" href="' + l + '"><img src="' + n + '"/></a></div><div class="home-top-c"><a href="/searc/label/' + p + '" class="toplabel">' + p + '</a><div class="home-top-meta">' + c + h + '</div><h3><a href="' + l + '">' + i + "</a></h3></div></div></div>";
                    t.find(".home-top-item" + o).append(m)
                }
            }
        })
    }
    $(function () {
        $(".home-top").each(function () {
            for (var e = $(this), t = [], a = 1; 5 > a; a++) t.push(e.attr("data-label" + a));
            for (var a = 0; a < t.length; a++) e.append('<div class="home-top-item' + a + '"></div>'),
            getreq(t[a], e)
        });
        $(".recent-post-carousel").each(function () {
            var a = $(this),
            e = $(this).attr("data-label"),
            t = $(this).attr("data-num") === undefined ? 2 : $(this).attr("data-num"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 10 : $(this).attr("data-results"),
            n = "/feeds/posts/summary/-/" + e + "?max-results=" + dr + "&alt=json-in-script";
            $.ajax({
                type: "GET",
                url: n,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (n) {
                    var r = n.feed.entry;
                    if (r) {
                        a.append(gethead(e, '/', 'car', '<i class="fa fa-rss"></i>', vmt)),
                        a.append('<div class="toggler"><ul class="car-inner"></ul></div>');
                        for (var s = 0; s < r.length; s++) {
                            for (var l, i, c, d, o = r[s], f = 0; f < o.link.length; f++) if ("alternate" == o.link[f].rel) {
                                i = o.link[f].href;
                                break
                            }
                            d = void 0 !== o.media$thumbnail ? o.media$thumbnail.url.replace("s72-c", "w450-h425-c") : Default_Image_For_Recent_Posts,
                            l = o.title.$t,
                            c = getfc(o);
                            var p = '<li class="tl-soverlay"><div class="imgwrap"><a class="featured-thumb" title="' + l + '" href="' + i + '"><img src="' + d + '"/></a></div><div class="recent-postCar-meta metais"><a class="recentLabel" href="/search/label/' + c + '" target="_blank">' + c + '</a><h3><a href="' + i + '">' + l + "</a></h3></div></li>";
                            a.find(".car-inner").append(p)
                        }
                        a.addClass("loaded").fadeIn(),
                        a.find(".car-inner").owlCarousel({
                            items: t,
                            nav: !0,
                            autoplay: true,
                            loop: true,
                            autoplayTimeout: 3500,
                            autoplayHoverPause: true,
                            dots: !1,
                            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                            responsive: {
                                480 : {
                                    items: 1
                                },
                                768 : {
                                    items: (t < 2 ? t: 2)
                                },
                                1024 : {
                                    items: (t < 5 ? t: 5)
                                }
                            }
                        })
                    }
                }
            })
        })
    });
    $(function () {
        $(".tl-feature-style").each(function () {
            var a = $(this),
            er = a.attr("data-label"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 5 : $(this).attr("data-results"),
            t = "/feeds/posts/summary/-/" + e + "?max-results=" + dr + "&alt=json-in-script";
            $.ajax({
                type: "GET",
                url: t,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (e) {
                    var t = e.feed.entry;
                    if (t) {
                        a.append(gethead(er, '/', 'feature', '<i class="fa fa-rss"></i>', vmt) + '<div class="tl-feature-outer"><div class="tl-feature-head"></div><div class="tl-feature-sub"></div></div>');
                        for (var s = 0; s < t.length; s++) {
                            for (var i, d, n, l, r, c = t[s], o = 0; o < c.link.length; o++) if ("alternate" == c.link[o].rel) {
                                d = c.link[o].href;
                                break
                            }
                            n = void 0 !== c.media$thumbnail ? c.media$thumbnail.url: "",
                            i = c.title.$t,
                            r = getmeta(c.published.$t),
                            l = getauthor(c.author);
                            var v = 0 == s ? '<div class="container tlrp-thumb tl-thumboverlay"><a title="' + i + '" href="' + d + '"><img src="' + n.replace("s72-c", "w765-h350-c") + '"/></a><div class="content"><h3><a href="' + d + '">' + i + '</a></h3><div class="content-meta">' + r + l + "</div></div></div>": '<div class="container"><div class="container-In"><div class="tlrp-thumb tl-thumboverlay"><a title="' + i + '" href="' + d + '"><img src="' + n.replace("s72-c", "w175-h100-c") + '"/></a></div><div class="content"><h3><a href="' + d + '">' + i + '</a></h3><div class="content-meta">' + r + l + "</div></div></div></div>";
                            0 == s ? a.find(".tl-feature-head").append(v) : a.find(".tl-feature-sub").append(v)
                        }
                        a.addClass("loaded").removeClass("unloaded").fadeIn()
                    }
                }
            })
        });
        function t(t, e, a, s, v) {
            if (v == 'undefined') {
                v = 'Tampilkan Semua'
            }
            var r = "" + e + "search/label/" + t + "?max-results=8",
            n = '<div class="tl-recentLink ' + a + 'head"><div class="tl-recentText"><span class="tl-headtext">' + s + " " + t + '</span><span class="tl-headtextHover">' + s + " " + t + '</span></div><a href="' + r + '" class="tl-headlinks">' + v + ' <i class="fa fa-angle-right"></i></a></div>';
            return n
        }
        $(".tl-cards").each(function () {
            var a = $(this),
            e = a.attr("data-label"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 6 : $(this).attr("data-results"),
            s = "/feeds/posts/summary/-/" + e + "?max-results=" + dr + "&alt=json-in-script";
            $.ajax({
                type: "GET",
                url: s,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (s) {
                    var t = s.feed.entry;
                    if (t) {
                        a.append(gethead(e, '/', 'card', '<i class="fa fa-rss"></i>', vmt)),
                        a.append('<div class="toggler row"><ul class="cards-outer"></ul></div>');
                        for (var l = 0; l < t.length; l++) {
                            for (var r, i, n, d, c, o, p = t[l], u = 0; u < p.link.length; u++) if ("alternate" == p.link[u].rel) {
                                i = p.link[u].href;
                                break
                            }
                            d = void 0 !== p.media$thumbnail ? p.media$thumbnail.url.replace("s72-c", "w370-h200-c") : Default_Image_For_Recent_Posts,
                            r = p.title.$t,
                            n = getfc(p),
                            c = p.summary.$t.substr(0, 120) + "...",
                            o = getmeta(p.published.$t);
                            var m = '<li class="container"><div class="imgwrap"><div class="tlrp-thumb tl-thumboverlay"><a href="' + i + '" class="layer"><img class="layerimg toLoad" src="' + d + '" title="' + r + '"/></a></div><div class="hcontent layerc"><a class="recentLabel" href="/search/label/' + n + '">' + n + '</a><h3><a href="' + i + '">' + r + '</a></h3></div></div><div class="content"><p>' + c + '</p><div class="card-meta">' + o + "</div></div></li>";
                            a.find(".cards-outer").append(m)
                        }
                        a.addClass("loaded").removeClass("unloaded").fadeIn()
                    }
                }
            })
        });
        var e = $(".recent-single-slider");
        e.each(function () {
            var theLabel = $(this).attr("data-label"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 5 : $(this).attr("data-results"),
            n = "/feeds/posts/summary/-/" + theLabel + "?max-results=" + dr + "&alt=json-in-script",
            currentItem = $(this);
            $.ajax({
                type: "GET",
                url: n,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (e) {
                    var a = e.feed.entry;
                    if (a) {
                        currentItem.append(gethead(theLabel, '/', 'car', '<i class="fa fa-rss"></i>', vmt));
                        currentItem.append('<div class="single-outer"><ul id="slider"></ul></div>');
                        for (var t = 0; t < a.length; t++) {
                            for (var r, l = a[t], s = 0; s < l.link.length; s++) if ("alternate" == l.link[s].rel) {
                                var i = l.link[s].href;
                                break
                            }
                            r = void 0 !== l.media$thumbnail ? l.media$thumbnail.url.replace("s72-c", "w675-h509-c") : "http://www.sdpb.org/s/photogallery/img/no-image-available.jpg";
                            var n = l.title.$t,
                            d = l.summary.$t.substr(0, 150) + "...",
                            o = getfc(l),
                            c = getauthor(l.author),
                            u = (getmeta(l.published.$t), '<li class="tl-soverlay"><a href="' + i + '"><img src="' + r + '" title="' + n + '"/></a><div class="tl-scontent"><div class="smeta"><a class="slabel" href="/search/label/' + o + '">' + o + "</a>" + c + '</div><h3><a href="' + i + '">' + n + "</a></h3><p>" + d + "</p></div></li>");
                            currentItem.find("#slider").append(u)
                        }
                        currentItem.find("#slider").owlCarousel({
                            nav: true,
                            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                            autoplay: true,
                            loop: true,
                            animateOut: 'fadeOut',
                            autoplayTimeout: 3500,
                            autoplayHoverPause: true,
                            items: 1
                        }),
                        currentItem.addClass("loaded").removeClass("unloaded").fadeIn()
                    }
                }
            })
        });
        $(".tl-recent-headline").each(function () {
            var a = $(this),
            t = a.attr("data-label"),
            vmt = $(this).attr("data-vmt"),
            dr = $(this).attr("data-results") === undefined ? 4 : $(this).attr("data-results"),
            l = "/feeds/posts/summary/-/" + t + "?max-results=" + dr + "&alt=json-in-script";
            $.ajax({
                type: "GET",
                url: l,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (e) {
                    var l = e.feed.entry;
                    if (l) {
                        var i = !1;
                        a.append(gethead(t, "/", "headline", '<i class="fa fa-rss"></i>')),
                        a.append('<div class="tl-tabrec"><div class="tabhead"></div><div class="tabsub-wrap"><ul class="tabsub"></ul></div></div>');
                        for (var s = 1; s < l.length; s++) {
                            for (var r, n, c, d, o, h = l[s], u = 0; u < h.link.length; u++) if ("alternate" == h.link[u].rel) {
                                n = h.link[u].href;
                                break
                            }
                            void 0 !== h.media$thumbnail ? -1 !== h.media$thumbnail.url.indexOf("img.youtube.com") ? (i = !0, d = h.media$thumbnail.url.replace("default.jpg", "sddefault.jpg"), o = '<div class="ytube-outer"><span class="fa-youtube-play"></span><img src="' + d + '"/></div>') : (d = h.media$thumbnail.url.replace("s72-c", "w400-h150-c"), o = '<img src="' + d + '"/>') : (d = "https://lh6.googleusercontent.com/-IqlHLqb7VkI/VJWT8jiJZZI/AAAAAAAAFxo/2Wjhxof4qxs/s500-no/undefined.jpg", o = '<img src="' + d + '"/>'),
                            r = h.title.$t,
                            c = getfc(h);
                            var m = '<div class="tabsub-itemWrap"><li class="tabsub-item"><div class="tlrp-thumb tl-thumboverlay"><a href="' + n + '" class="layer">' + o + '</a></div><div class="layerc"><a class="recentLabel" href="/search/label/' + c + '" target="_blank">' + c + '</a><h3><a href="' + n + '">' + r + "</a></h3></div></li></div>";
                            a.find(".tabsub").append(m)
                        }
                        var p, b, f, g, v, y, A, $, j = l[0];
                        void 0 !== j.media$thumbnail ? -1 !== j.media$thumbnail.url.indexOf("youtube") ? (i = !0, p = j.media$thumbnail.url.replace("default.jpg", "sddefault.jpg"), $ = '<div class="ytube-outer"><span class="fa-youtube-play"></span><img src="' + p + '"/></div>') : (p = j.media$thumbnail.url.replace("s72-c", "w400-h330-c"), $ = '<img src="' + p + '"/>') : (p = "https://lh6.googleusercontent.com/-IqlHLqb7VkI/VJWT8jiJZZI/AAAAAAAAFxo/2Wjhxof4qxs/s500-no/undefined.jpg", $ = '<img src="' + p + '"/>');
                        for (var k = 0; k < j.link.length; k++) if ("alternate" == j.link[k].rel) {
                            b = j.link[k].href;
                            break
                        }
                        f = "<h3><a href='" + b + "'>" + j.title.$t + "</a></h3>",
                        y = "<p>" + j.summary.$t.substr(0, 180) + "...</p>",
                        v = getauthor(j.author),
                        g = getmeta(j.published.$t),
                        A = getfc(j),
                        a.find(".tabhead").html("<div class='container'><div class='popup-c tlrp-thumb tl-thumboverlay'><a href='" + b + "'>" + $ + "</a><div class='headOver'><a href='/search/label/" + A + "' class='recentLabel'>" + A + "</a>" + f + "</div></div><div class='headcontent'>" + y + "<div class='headmeta'>" + v + " - " + g + "</div></div></div>")
                    }
                }
            })
        });
        $(".tl-recent-scroll").each(function () {
            var e = $(this),
            dr = $(this).attr("data-results") === undefined ? 12 : $(this).attr("data-results"),
            l = "/feeds/posts/summary/?max-results=" + dr + "&alt=json-in-script";
            $.ajax({
                type: "GET",
                url: l,
                async: true,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (a) {
                    var l = a.feed.entry;
                    if (l) {
                        var t = !1;
                        e.append('<ul class="scroll-inner"></ul>');
                        for (var s = 0; s < l.length; s++) {
                            for (var r, n, i, o, c, u, p = l[s], h = 0; h < p.link.length; h++) if ("alternate" == p.link[h].rel) {
                                n = p.link[h].href;
                                break
                            }
                            void 0 !== p.media$thumbnail ? -1 !== p.media$thumbnail.url.indexOf("img.youtube.com") ? (t = !0, o = p.media$thumbnail.url.replace("default.jpg", "sddefault.jpg"), c = '<div class="ytube-outer"><span class="fa-youtube-play"></span><img src="' + o + '"/></div>') : (o = p.media$thumbnail.url.replace("s72-c", "w110-h110-c"), c = '<img src="' + o + '"/>') : (o = "https://lh6.googleusercontent.com/-IqlHLqb7VkI/VJWT8jiJZZI/AAAAAAAAFxo/2Wjhxof4qxs/s500-no/undefined.jpg", c = '<img src="' + o + '"/>'),
                            r = p.title.$t.length > 50 ? p.title.$t.substr(0, 50) + "...": p.title.$t,
                            u = getmeta(p.published.$t);
                            var m = '<li class="container"><div class="tl-rscrl-img tlrp-thumb tl-thumboverlay"><a href="' + n + '" class="layer">' + c + '</a></div><div class="layerc">' + u + '<h3><a href="' + n + '">' + r + "</a></h3></div></li>";
                            e.find(".scroll-inner").append(m)
                        }
                        e.find(".scroll-inner").owlCarousel({
                            items: 4,
                            dots: !1,
                            margin: 25,
                            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                            nav: true,
                            autoplay: true,
                            loop: true,
                            autoplayTimeout: 2000,
                            autoplayHoverPause: true,
                            responsiveClass: true,
                            responsive: {
                                0 : {
                                    items: 1
                                },
                                480 : {
                                    items: 2
                                },
                                768 : {
                                    items: 3
                                },
                                1200 : {
                                    items: 4
                                }
                            }
                        })
                    }
                }
            })
        })
    });
    //]]>
