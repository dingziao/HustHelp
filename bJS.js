var obj = {
    atcName: "",
    cateName: "",
    authorName: "",
    authorTime: "",
    rspNum: "",
    checkNum: "",
    lastRelease: "",
};

var atcList = new Array();
var cateList = new Array();
// 对帖子列表进行排序
$(".sort a").on("click", function () {
    $(".list-cont").each(function (i, e) {
        atcList[i] = e;
    });

    $(this).siblings().removeClass("sort-selected");
    $(this).addClass("sort-selected");

    if ($(this).text() == "最新") {
        atcList.sort(function (a, b) {
            rN1 = $(a).find(".last-release").text()[0];

            rN2 = $(b).find(".last-release").text()[0];
            return rN1 - rN2;
        });
    }

    if ($(this).text() == "热门") {
        atcList.sort(function (a, b) {
            cN1 = $(a).find(".check-num").text();
            cN2 = $(b).find(".check-num").text();
            return cN2 - cN1;
        });
    }

    $(".list-cont").remove();
    $(atcList).each(function (i, e) {
        $("#atc-list").append(e);
    });
});
// 添加新帖子至列表
function addArticle(data) {
    // 克隆模板
    var newA = $(document.getElementsByClassName("template")[1]).clone(true);
    newA.find(".atc-name>a").text(data.atcName);
    newA.find(".cate-name>a").text(data.cateName);
    newA.find(".author-name").text(data.authorName);
    newA.find(".author-time").text(data.authorTime);
    newA.find(".rsp-num").text(data.rspNum);
    newA.find(".check-num").text(data.checkNum);
    newA.find(".last-release").text(data.lastRelease);
    // 删除模板类（含模板类元素不显示）
    newA.removeClass("template");
    atcList.push(newA[0]);
}

function addCate(data) {
    // 克隆模板
    var newC = $(document.getElementsByClassName("template")[0]).clone(true);
    newC.html(data);
    // 删除模板类（含模板类元素不显示）
    newA.removeClass("template");
    cateList.push(newC[0]);
}

// 使列表的第一行固定
$(window).scroll(function () {
    if ($(window).scrollTop() > 30) {
        $("#list-head").addClass("fixed");
    } else {
        $("#list-head").removeClass("fixed");
    }
});

// 点击分类跳转到页面
$(".cate a").on("click", function () {
    var cateName = $(this).html();
    $.ajax({
        // 接受对象
        url: "",
        // 参数
        data: {
            command: "jmpByCate",
            cateName: cateName + "",
        },
        // 请求类型
        type: "GET",
        // 超时时间
        timeout: 2000,
        // 失败的回调
        error: function () {},
    });
});
$(".cate-name a").on("click", function () {
    var cateName = $(this).html();
    $.ajax({
        // 接受对象
        url: "",
        // 参数
        data: {
            command: "jmpByCate",
            cateName: cateName + "",
        },
        // 请求类型
        type: "GET",
        // 超时时间
        timeout: 2000,
        // 失败的回调
        error: function () {},
    });
});

// 点击作者名称或头像跳转到作者主页
$(".head-picture").on("click", function () {
    const settings = {
        async: true,
        crossDomain: true,
        url: "/api/user/:name",
        method: "GET",
        headers: {},
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    window.location.assign("");
});
$(".author-name").on("click", function () {
    const settings = {
        async: true,
        crossDomain: true,
        url: "/api/user/:name",
        method: "GET",
        headers: {},
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    window.location.assign("");
});
// 鼠标位于搜索按键中，展开搜索框
$("#search").on("mouseenter", function () {
    $("#search-box").stop(true, true).fadeIn(500);
});
$("main").on("mouseenter", function () {
    $("#search-box").stop(true, false).fadeOut(500);
});
// 点击搜索按键进入搜索
$("#search").on("click", function () {
    const form = new FormData(document.querySelector("form"));

    const settings = {
        async: true,
        crossDomain: true,
        url: "/api/post/search",
        method: "GET",
        headers: {},
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form.get("search"),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    // 搜索后跳转
    // window.location.assign("");
    console.log(form.get("search"));
});
$(".atc-name a").on("click", function () {
    const articleName = $(this).html;

    const settings = {
        async: true,
        crossDomain: true,
        url: "/api/post/search",
        method: "GET",
        headers: {},
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: articleName,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    // 搜索后跳转
    // window.location.assign("");
});

// 点击主页图标跳转回主页
$("#home-page").on("click", function () {
    window.location.assign("");
});
// 点击个人主页后跳转
$("#personal").on("click", function () {
    const settings = {
        async: true,
        crossDomain: true,
        url: "/api/user/:name",
        method: "GET",
        headers: {},
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    // window.location.assign("");
});

// 网页打开时获取帖子列表以及分类列表并展示
$(window).ready(function () {
    // 发送请求，获取帖子列表
    const form = new FormData();
    const settings1 = {
        async: true,
        crossDomain: true,
        url: "/api/get/index",
        method: "GET",
        headers: {},
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
    };

    $.ajax(settings1).done(function (response) {
        console.log(response);
    });
    // 发送请求，获取 tag 列表
    const settings2 = {
        async: true,
        crossDomain: true,
        url: "/api/post/:tag",
        method: "GET",
        headers: {},
    };

    $.ajax(settings2).done(function (response) {
        console.log(response);
    });

    // // 逐个添加帖子
    // addArticle(obj);
    // atcList.sort(function (a, b) {
    //     rN1 = $(a).find(".last-release").text()[0];

    //     rN2 = $(b).find(".last-release").text()[0];
    //     return rN1 - rN2;
    // });
    // $(atcList).each(function (i, e) {
    //     $("#atc-list").append(e);
    // });

    // // 逐个添加分类
    // addCate();
    // $(cateList).each(function (i, e) {
    //     $("#categorys").append(e);
    // });
});
