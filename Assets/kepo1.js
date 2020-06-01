//<![CDATA[
function getmeta(t) {
    var e = new Array();
    (e[1] = "Jan"), (e[2] = "Feb"), (e[3] = "Mar"), (e[4] = "Apr"), (e[5] = "May"), (e[6] = "Jun"), (e[7] = "Jul"), (e[8] = "Aug"), (e[9] = "Sep"), (e[10] = "Oct"), (e[11] = "Nov"), (e[12] = "Dec");
    var a = t.substring(0, 4),
        s = t.substring(5, 7),
        r = t.substring(8, 10),
        n = '<span class="recentdate"> ' + e[parseInt(s, 10)] + " " + r + " " + a + "</span> ";
    return n;
}
$(function () {
    function a(a, t, e) {
        $.ajax({
            type: "GET",
            url: a,
            async: true,
            contentType: "application/json",
            dataType: "jsonp",
            success: function (a) {
                var i = a.feed.entry;
                if (i)
                    for (var s = 0; s < i.length; s++) {
                        for (var n = i[s], l = 0; l < n.link.length; l++)
                            if ("alternate" == n.link[l].rel) {
                                var r = n.link[l].href;
                                break;
                            }
                        try {
                            var d = n.media$thumbnail.url.replace("s72-c", "w225-h150-c");
                        } catch (c) {
                            var d;
                        }
                        var o = n.title.$t,
                            v = getmeta(n.published.$t),
                            h = n.category[0].term;
                        if (-1 !== d.indexOf("img.youtube.com")) {
                            d = n.media$thumbnail.url.replace("default.jpg", "maxresdefault.jpg");
                            var f = "<img class='yimg' src='" + d + "'/>";
                        } else var f = "<img src='" + d + "'/>";
                        var p =
                            "<div class='n-item'><div class='tl-menuMag'><div class='tl-magMedia tlrp-thumb tl-thumboverlay'><a class='featured-thumb' title='" +
                            o +
                            "' href='" +
                            r +
                            "'>" +
                            f +
                            "</a><div class='tl-menuTag'><a href='/search/label/" +
                            h +
                            "' class='navi-label'>" +
                            h +
                            "</a></div></div><div class='navi-inner'><h3><a href='" +
                            r +
                            "'>" +
                            o +
                            "</a></h3><div class='navi-meta'>" +
                            v +
                            "</div></div></div></div>";
                        t.find(e).append(p);
                    }
                else t.find(e).append('<span class="nop">&#xf143; No Post Found</span>');
            },
        });
    }
    $(".ba-acc").each(function () {
        $("div", this).hide(), $(this).find("span").first().addClass("active"), $("span.active", this).next("div").slideDown();
        var a = $(this);
        $("span", this).click(function () {
            $("div", a).slideUp(), $("span", a).removeClass("active"), $(this).addClass("active"), $(this).next("div").slideDown();
        });
    }),
        $(".ba-tab").each(function () {
            var a = $(this),
                t = $(".ba-tabbutton", a),
                e = $(".ba-tabcontent", a);
            e.children("div").hide(),
                e.children("div").first().fadeIn(),
                t.children("span").first().addClass("active"),
                t.children("span").click(function () {
                    var a = $(this).index();
                    t.children("span").removeClass("active"),
                        $(this).addClass("active"),
                        e.children("div").each(function () {
                            $(this).index() == a ? $(this).slideDown() : $(this).slideUp();
                        });
                });
        }),
        $("li.tl-menuRecent").each(function () {
            var t = $(this),
                e = t.attr("data-label"),
                i = "/feeds/posts/summary/-/" + e + "?max-results=5&alt=json-in-script";
            t.append("<div class='tl-navWrap'><div class='nav-post-list'></div></div>"), a(i, t, ".nav-post-list");
        }),
        $("li.tl-menuRecentTab").each(function () {
            var t = $(this),
                e = t.find(".tab-outer li");
            if (e.length > 0) {
                t.find(".tab-outer").wrap('<div class="tl-tabMenu"></div>');
                for (var i = "<div class='nav-tab-outer'>", s = 0; s < e.length; s++) {
                    var n = 0 == s ? " active" : "";
                    i += "<div class='nav-tab" + s + n + "'></div>";
                }
                (i += "</div>"),
                    t.find(".tl-tabMenu").append(i),
                    e.first().addClass("active"),
                    t.find(".nav-tab-outer>div").hide(0),
                    t.find(".nav-tab-outer>div").first().show(0),
                    e.each(function () {
                        $(this).mouseenter(function () {
                            var a = ($(this), $(this).index());
                            t.find(".nav-tab-outer>div").each(function () {
                                $(this).hasClass("nav-tab" + a) ? $(this).stop().fadeIn("fast") : $(this).stop().hide(0);
                            }),
                                e.removeClass("active"),
                                $(this).addClass("active");
                        });
                        var i = $(this).attr("data-label"),
                            s = "/feeds/posts/summary/-/" + i + "?max-results=4&alt=json-in-script",
                            n = $(this).index();
                        a(s, t, ".nav-tab" + n);
                    });
            }
        }),
        $(".megamenu").each(function () {
            $(this).append("<div class='megamenu-inner'></div>"), $(this).find("ul").appendTo(".megamenu-inner");
        });
}),
    $(function () {
        function findit() {
            var a = $(".searchbar").val();
            if (a.length >= 1) {
                $(".search-out").show(), $(".search-label").show().html("Searching ...");
                var e = "/feeds/posts/default?max-results=5&alt=json&q=" + a;
                $.ajax({
                    type: "GET",
                    url: e,
                    async: true,
                    contentType: "application/json",
                    dataType: "jsonp",
                    success: function (e) {
                        doSearch(e, a), $(".more-result").attr("href", t + "search?q=" + a);
                    },
                });
            } else alert("Please enter your query...");
        }
        function doSearch(a, t) {
            if (a.feed.entry) {
                for (var e = 0; e < a.feed.entry.length; e++) {
                    for (var i = 0; i < a.feed.entry[e].link.length; i++)
                        if ("alternate" == a.feed.entry[e].link[i].rel) {
                            var s = a.feed.entry[e].link[i].href;
                            break;
                        }
                    try {
                        var n = a.feed.entry[e].media$thumbnail.url;
                    } catch (l) {
                        var n = "http://3.bp.blogspot.com/-zvVhSlsk0xg/VfzbhOQ1zPI/AAAAAAAAAt0/hRsGBhuP2a0/s1600/No++Available.png";
                    }
                    var r = a.feed.entry[e].title.$t,
                        d = '<div class="search-item"><a href="' + s + '" target="_blank"><img src="' + n + '"/></a><a href="' + s + '" target="_blank">' + r + "</a></div>";
                    $(".search-result").append(d);
                }
                $(".search-label").hide(function () {
                    $(".more-result b").text(t), $(".more-result").show();
                });
            } else $(".search-label").html("No result"), $(".more-result").hide();
        }
        if ($(".post-body .tl-post-page").length > 0) {
            var articleBody = $(".post-body"),
                pages = "";
            articleBody.find(".tl-post-page").each(function (i) {
                pages += "<button data-target='" + i + "'>" + eval(i + 1) + "</button>";
            }),
                articleBody.append('<div class="tl-post-pagination">' + pages + "</div>"),
                $(".tl-post-page").hide(0),
                $(".tl-post-page").first().fadeIn(),
                $(".tl-post-pagination button").first().addClass("active");
        }
        $(".tl-post-pagination button").click(function () {
            if (!$(this).hasClass("active")) {
                var e = eval($(this).attr("data-target"));
                $(".tl-post-page").hide().removeClass("active"),
                    $(".tl-post-page").eq(e).fadeIn().addClass("active"),
                    $(".tl-post-pagination button").removeClass("active"),
                    $(this).addClass("active"),
                    $("html,body").animate(
                        {
                            scrollTop: $(".tl-post-page.active").offset().top,
                        },
                        "normal"
                    );
            }
        }),
            $(".searchform").submit(function () {
                return $(".search-item").remove(), findit(), !1;
            });
    });

//]]>
