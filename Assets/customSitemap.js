//<![CDATA[
var postTitle = new Array();
var postUrl = new Array();
var postPublished = new Array();
var postDate = new Array();
var postLabels = new Array();
var postRecent = new Array();
var sortBy = "titleasc";
var tocLoaded = false;
var numChars = 250;
var postFilter = "";
var numberfeed = 0;

function bloggersitemap(a) {
    function b() {
        if ("entry" in a.feed) {
            var d = a.feed.entry.length;
            numberfeed = d;
            ii = 0;
            for (var h = 0; h < d; h++) {
                var n = a.feed.entry[h];
                var e = n.title.$t;
                var m = n.published.$t.substring(0, 10);
                var j;
                for (var g = 0; g < n.link.length; g++) {
                    if (n.link[g].rel == "alternate") {
                        j = n.link[g].href;
                        break
                    }
                }
                var o = "";
                for (var g = 0; g < n.link.length; g++) {
                    if (n.link[g].rel == "enclosure") {
                        o = n.link[g].href;
                        break
                    }
                }
                var c = "";
                if ("category" in n) {
                    for (var g = 0; g < n.category.length; g++) {
                        c = n.category[g].term;
                        var f = c.lastIndexOf(";");
                        if (f != -1) {
                            c = c.substring(0, f)
                        }
                        postLabels[ii] = c;
                        postTitle[ii] = e;
                        postDate[ii] = m;
                        postUrl[ii] = j;
                        postPublished[ii] = o;
                        if (h < 10) {
                            postRecent[ii] = true
                        } else {
                            postRecent[ii] = false
                        }
                        ii = ii + 1
                    }
                }
            }
        }
    }
    b();
    sortBy = "titleasc";
    sortPosts(sortBy);
    sortlabel();
    tocLoaded = true;
    displayToc2();    
}

function filterPosts(a) {
    scroll(0, 0);
    postFilter = a;
    displayToc(postFilter)
}

function allPosts() {
    sortlabel();
    postFilter = "";
    displayToc(postFilter)
}

function sortPosts(d) {
    function c(e, g) {
        var f = postTitle[e];
        postTitle[e] = postTitle[g];
        postTitle[g] = f;
        var f = postDate[e];
        postDate[e] = postDate[g];
        postDate[g] = f;
        var f = postUrl[e];
        postUrl[e] = postUrl[g];
        postUrl[g] = f;
        var f = postLabels[e];
        postLabels[e] = postLabels[g];
        postLabels[g] = f;
        var f = postPublished[e];
        postPublished[e] = postPublished[g];
        postPublished[g] = f;
        var f = postRecent[e];
        postRecent[e] = postRecent[g];
        postRecent[g] = f
    }
    for (var b = 0; b < postTitle.length - 1; b++) {
        for (var a = b + 1; a < postTitle.length; a++) {
            if (d == "titleasc") {
                if (postTitle[b] > postTitle[a]) {
                    c(b, a)
                }
            }
            if (d == "titledesc") {
                if (postTitle[b] < postTitle[a]) {
                    c(b, a)
                }
            }
            if (d == "dateoldest") {
                if (postDate[b] > postDate[a]) {
                    c(b, a)
                }
            }
            if (d == "datenewest") {
                if (postDate[b] < postDate[a]) {
                    c(b, a)
                }
            }
            if (d == "orderlabel") {
                if (postLabels[b] > postLabels[a]) {
                    c(b, a)
                }
            }
        }
    }
}

function sortlabel() {
    sortBy = "orderlabel";
    sortPosts(sortBy);
    var a = 0;
    var b = 0;
    while (b < postTitle.length) {
        temp1 = postLabels[b];
        firsti = a;
        do {
            a = a + 1
        } while (postLabels[a] == temp1);
        b = a;
        sortPosts2(firsti, a);
        if (b > postTitle.length) {
            break
        }
    }
}

function sortPosts2(d, c) {
    function e(f, h) {
        var g = postTitle[f];
        postTitle[f] = postTitle[h];
        postTitle[h] = g;
        var g = postDate[f];
        postDate[f] = postDate[h];
        postDate[h] = g;
        var g = postUrl[f];
        postUrl[f] = postUrl[h];
        postUrl[h] = g;
        var g = postLabels[f];
        postLabels[f] = postLabels[h];
        postLabels[h] = g;
        var g = postPublished[f];
        postPublished[f] = postPublished[h];
        postPublished[h] = g;
        var g = postRecent[f];
        postRecent[f] = postRecent[h];
        postRecent[h] = g
    }
    for (var b = d; b < c - 1; b++) {
        for (var a = b + 1; a < c; a++) {
            if (postTitle[b] > postTitle[a]) {
                e(b, a)
            }
        }
    }
}

function displayToc(a) {
    var l = 0;
    var h = "";
    var e = "Post Title";
    var m = "Click to sort by title";
    var d = "Date";
    var k = "Click to sort by date";
    var c = "Category";
    var j = "";
    if (sortBy == "titleasc") {
        m += " (descending)";
        k += " (newest first)"
    }
    if (sortBy == "titledesc") {
        m += " (ascending)";
        k += " (newest first)"
    }
    if (sortBy == "dateoldest") {
        m += " (ascending)";
        k += " (newest first)"
    }
    if (sortBy == "datenewest") {
        m += " (ascending)";
        k += " (oldest first)"
    }
    if (postFilter != "") {
        j = "Click to view all"
    }
    h += "<table>";
    h += "<tr>";
    h += '<td class="header1">';
    h += '<a href="javascript:toggleTitleSort();" title="' + m + '">' + e + "</a>";
    h += "</td>";
    h += '<td class="header2">';
    h += '<a href="javascript:toggleDateSort();" title="' + k + '">' + d + "</a>";
    h += "</td>";
    h += '<td class="header3">';
    h += '<a href="javascript:allPosts();" title="' + j + '">' + c + "</a>";
    h += "</td>";
    h += '<td class="header4">';
    h += "Read all";
    h += "</td>";
    h += "</tr>";
    for (var g = 0; g < postTitle.length; g++) {
        if (a == "") {
            h += '<tr><td class="entry1"><a href="' + postUrl[g] + '">' + postTitle[g] + '</a></td><td class="entry2">' + postDate[g] + '</td><td class="entry3">' + postLabels[g] + '</td><td class="entry4"><a href="' + postPublished[g] + '">Read</a></td></tr>';
            l++
        } else {
            z = postLabels[g].lastIndexOf(a);
            if (z != -1) {
                h += '<tr><td class="entry1"><a href="' + postUrl[g] + '">' + postTitle[g] + '</a></td><td class="entry2">' + postDate[g] + '</td><td class="entry3">' + postLabels[g] + '</td><td class="entry4"><a href="' + postPublished[g] + '">Read</a></td></tr>';
                l++
            }
        }
    }
    h += "</table>";
    if (l == postTitle.length) {
        var f = '<span class="toc-note">Show All ' + postTitle.length + " Posts<br/></span>"
    } else {
        var f = '<span class="toc-note">Show ' + l + " posts by category '";
        f += postFilter + "' the " + postTitle.length + " Total Posts<br/></span>"
    }
    var b = document.getElementById("toc");
    b.innerHTML = f + h
}

function displayToc2() {
    var a = 0;
    var b = 0;
    while (b < postTitle.length) {
        temp1 = postLabels[b];
        document.write("<p/>");
        document.write('<p class="labels">Kategori: <a href="/search/label/' + temp1 + '">' + temp1 + "</a></p><ol>");
        firsti = a;
        do {
            document.write("<li>");
            document.write('<a class="post-titles" href="' + postUrl[a] + '"> [Lihat] ' + "</a>" + postTitle[a]);
            if (postRecent[a] == true) {
                document.write('<img src="http://1.bp.blogspot.com/-_VZwBpHw_SI/UrXvLbFxacI/AAAAAAAAFiQ/ZGqWZUZesCI/s1600/new_icon.gif" style="max-width: 100%;display: inline;"/></span></strong>')
            }
            document.write("</li>");
            a = a + 1
        } while (postLabels[a] == temp1);
        b = a;
        document.write("</ol>");
        sortPosts2(firsti, a);
        if (b > postTitle.length) {
            break
        }
    }
}

function toggleTitleSort() {
    if (sortBy == "titleasc") {
        sortBy = "titledesc"
    } else {
        sortBy = "titleasc"
    }
    sortPosts(sortBy);
    displayToc(postFilter)
}

function toggleDateSort() {
    if (sortBy == "datenewest") {
        sortBy = "dateoldest"
    } else {
        sortBy = "datenewest"
    }
    sortPosts(sortBy);
    displayToc(postFilter)
}

function showToc() {
    if (tocLoaded) {
        displayToc(postFilter);
        var a = document.getElementById("toclink")
    } else {
        alert("Just wait... TOC is loading")
    }
}

function hideToc() {
    var a = document.getElementById("toc");
    a.innerHTML = "";
    var b = document.getElementById("toclink");
    b.innerHTML = '<a href="#" onclick="scroll(0,0); showToc(); Effect.toggle(\'toc-result\',\'blind\');">?? Display Table of Contents</a> <img src="http://1.bp.blogspot.com/-_VZwBpHw_SI/UrXvLbFxacI/AAAAAAAAFiQ/ZGqWZUZesCI/s1600/new_icon.gif" style="max-width: 22px"/>'
}

function looptemp2() {
    for (var a = 0; a < numberfeed; a++) {
        document.write("<br>");
        document.write('Post Link : <a href="' + postUrl[a] + '">' + postTitle[a] + "</a><br>");
        document.write('Read all : <a href="' + postPublished[a] + '">' + postTitle[a] + "</a><br>");
        document.write("<br>")
    }
};
//]]>
