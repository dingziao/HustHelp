$(".sort a").on("click", function () {
    $(this).siblings().removeClass("sort-selected");
    $(this).addClass("sort-selected");

    console.log($(".check-num").text());
    console.log($(".rsp-num").text());
});
