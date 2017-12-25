// open and close logout modal
$("#logout-button").click(function() {
    $("#logout-modal").addClass("is-active");
});
$("#modal-close-button").click(function() {
    $("#logout-modal").removeClass("is-active");
});

// simplemde markdown editor config
var simplemde = new SimpleMDE({
    element: $("#article-editor")[0],
    autofocus: true,
    spellChecker: false,
    status: false,
    tabSize: 4,
    toolbar: ["bold", "italic", "heading", "quote", "unordered-list", "ordered-list", "link", "image", "preview", "side-by-side", "fullscreen", 
    {
        name: "guide",
        action: function openInNewTab() {
            var url = "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet";
            var win = window.open(url, '_blank');
            win.focus();
        },
        className: "fa fa-question-circle",
        title: "Markdown Guide"
    }],
});
// add class for editor preview area
$(document).ready(function() {
    $(".editor-preview-side").addClass("markdown-body");
});

// list item click
$("#article-list .list-item").click(function() {
    $("#article-list .list-item[class~='active']").removeClass("active");
    $(this).addClass("active");
    var aid = $(this).find("input[name='aid']").val();
    var title = $(this).find(".article-title").text();
    var content = $(this).find("p.article-excerpt").text();
    // console.log(aid);
    $("input[name='aid_input']").val(aid);
    $("input.title-input").val(title);
    simplemde.value(content);
});
$(document).ready(function() {
    var item = $("#article-list .list-item:first-child");
    item.addClass("active");
    var aid = item.find("input[name='aid']").val();
    var title = item.find(".article-title").text();
    var content = item.find("p.article-excerpt").text();
    $("input[name='aid_input']").val(aid);
    $("input.title-input").val(title);
    simplemde.value(content);
});

// csrf config
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader(header, token);
});

// update button
$("#update-btn").click(function() {

    var data = {
        "id": $("input[name='aid_input']").val(),
        "title": $("input.title-input").val(),
        "content": simplemde.value()
    }
    console.log(data['aid']);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/admin/article/update",
        data: JSON.stringify(data),
        success: function(resultData) {
            var msg = resultData.msg;
            console.log(resultData);
            console.log(msg)
            $(".writting-area .notification .msg-content").text(msg);
            $(".writting-area .notification").show().delay(2000).fadeOut('fast');
        },
        error: function(e) {

        }
    });
});

// select2 config
$(document).ready(function() {
    $("#tags-box").select2({
        placeholder: "在这里选择标签",
    });
});