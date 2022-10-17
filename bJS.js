var obj = {
    atcName: "",
    plateName: "",
    authorName: "",
    authorTime: "",
    rspNum: "",
    checkNum: "",
    lastRelease: "",
};
// 对帖子列表进行排序
$(".sort a").on("click", function () {
    var lists = new Array();
    $(".list-cont").each(function (i, e) {
        lists[i] = e;
    });

    $(this).siblings().removeClass("sort-selected");
    $(this).addClass("sort-selected");

    if ($(this).text() == "最新") {
        lists.sort(function (a, b) {
            rN1 = $(a).find(".last-release").text()[0];

            rN2 = $(b).find(".last-release").text()[0];
            return rN1 - rN2;
        });
    }

    if ($(this).text() == "热门") {
        lists.sort(function (a, b) {
            cN1 = $(a).find(".check-num").text();
            cN2 = $(b).find(".check-num").text();
            return cN2 - cN1;
        });
    }

    $(".list-cont").remove();
    $(lists).each(function (i, e) {
        $("#list ul").append(e);
    });
});
// 添加新帖子至列表
function addArticle(data) {
    // 克隆模板
    var newA = $(document.getElementsByClassName("template")[0]).clone(true);
    newA.find(".atc-name>a").text(data.atcName);
    newA.find(".plate-name>a").text(data.plateName);
    newA.find(".author-name").text(data.authorName);
    newA.find(".author-time").text(data.authorTime);
    newA.find(".rsp-num").text(data.rspNum);
    newA.find(".check-num").text(data.checkNum);
    newA.find(".last-release").text(data.lastRelease);
    // 删除模板类（含模板类元素不显示）
    newA.removeClass("template");
    $("#list ul").append(newA[0]);
}
