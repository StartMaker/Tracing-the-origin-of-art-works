$(function () {
    header = sessionStorage.getItem("key");
    $.ajax({
        url: "/article",
        dataType:"json",
        type:"post",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", header);
        },
        success:function (data) {
            document.querySelector("#userId").innerHTML = data.data;
        },
        error:function (data) {
            console.log(data);
        }
    });
    picture_container = new Array();
    pictureLoad();
    nav_init();
    creatPicture(picture_container);
});
function pictureLoad() {
    $.ajax({
        url:"/page/getByStatus",
        dataType: "json",
        data:{
            "productStatus":2,
            "orderRule":0
        },
        async: false,
        type: "post",
        success:function (data) {
            console.log(data);
            for(var j=0;j<data.data.length;j++) {
                if (data.data[j] != "") {
                    picture_container[j] = {
                        author: data.data[j].author,
                        name: data.data[j].name,
                        time: data.data[j].creteTime,
                        classity: data.data[j].category,
                        size: data.data[j].width + "X" + data.data[j].height + "cm",
                        price: "￥" + data.data[j].price,
                        user_adress: data.data[j].userAddress,
                        picture_adress: data.data[j].picAddress,
                        picture: data.data[j].pictureUrl
                    }
                }
                else {
                    picture_container[j]="";
                }
            }
        },
        error:function (error) {
            console.log(error);
        }
    })
}
function nav_init() {
    property = document.getElementById("property");
    property.innerHTML = "<span id='property_size'></span><span id='property_price'></span><span id='property_style'></span><span id='property_classity'></span><span id='property_theme'></span><span id='property_reset'>重置</span>";
    property_list = property.querySelectorAll("span");
    property_reset = document.getElementById("property_reset");
    property_size = document.querySelector("#property_size");
    property_price = document.querySelector("#property_price");
    property_style = document.querySelector("#property_style");
    property_style.setAttribute("value","");
    property_classity = document.querySelector("#property_classity");
    property_classity.setAttribute("value","");
    property_theme = document.querySelector("#property_theme");
    property_theme.setAttribute("value","");
    var size = document.getElementById("Size").getElementsByTagName("li");
    var price = document.getElementById("Price").getElementsByTagName("li");
    var style = document.getElementById("Style").getElementsByTagName("li");
    var classity = document.getElementById("Classity").getElementsByTagName("li");
    var theme = document.getElementById("Theme").getElementsByTagName("li");
    var explain = document.getElementById("explain");
    size[0].setAttribute("min", "0");
    size[1].setAttribute("min", "50");
    size[2].setAttribute("min", "100");
    size[3].setAttribute("min", "150");
    size[4].setAttribute("min", "200");
    size[0].setAttribute("max", "50");
    size[1].setAttribute("max", "100");
    size[2].setAttribute("max", "150");
    size[3].setAttribute("max", "200");
    size[4].setAttribute("max", "100000000");

    price[0].setAttribute("min", "0");
    price[1].setAttribute("min", "2000");
    price[2].setAttribute("min", "4000");
    price[3].setAttribute("min", "8000");
    price[4].setAttribute("min", "15000");
    price[0].setAttribute("max", "2000");
    price[1].setAttribute("max", "4000");
    price[2].setAttribute("max", "8000");
    price[3].setAttribute("max", "15000");
    price[4].setAttribute("max", "100000000");
    property_size.setAttribute("min", "0");
    property_size.setAttribute("max", "10000000");
    property_price.setAttribute("min", "0");
    property_price.setAttribute("max", "10000000");

    for (var i = 0; i < 5; i++) {
        size[i].onclick = function () {
            var min = $(this).attr("min");
            var max = $(this).attr("max");
            req2(property_size,this,min,max);
        };
        price[i].onclick = function () {
            var min = $(this).attr("min");
            var max = $(this).attr("max");
            req2(property_price,this,min,max);
        };
        style[i].onclick = function () {
            var styleValue = $(this).attr('value');
            req1(property_style,styleValue);
        };
        classity[i].onclick = function () {
            var classityValue = $(this).attr('value');
            req1(property_classity,classityValue);
        };
        theme[i].onclick = function () {
            var themeValue = $(this).attr('value');
            req1(property_theme,themeValue);
        }
    }
    function req1(obj,objValue) {
        obj.style.display = "inline-block";
        obj.innerHTML = objValue;
        obj.setAttribute("value",objValue);
        property_reset.style.display = "inline-block";
        var reqInfor = serialize();
        selectPic_RequestAjax(reqInfor);
    }
    function req2(obj,pro,objMin,objMax) {
        obj.style.display = "inline-block";
        obj.innerHTML = $(pro).attr('value');
        obj.setAttribute("min",objMin);
        obj.setAttribute("max",objMax);
        property_reset.style.display = "inline-block";
        var reqInfor = serialize();
        selectPic_RequestAjax(reqInfor);
    }
    function serialize() {
        var dataform = new FormData();
        dataform.append("minWidth",$(property_size).attr("min"));
        dataform.append("maxWidth",$(property_size).attr("max"));
        dataform.append("minPrice",$(property_price).attr("min"));
        dataform.append("maxPrice",$(property_price).attr("max"));
        dataform.append("category",$(property_classity).attr("value"));
        dataform.append("style",$(property_style).attr("value"));
        dataform.append("theme",$(property_theme).attr("value"));
        dataform.append("productStatus","1");
        dataform.append("pageNum","1");
        return dataform;
    }
    function selectPic_RequestAjax(reqData) {
        $.ajax({
            url: "/page/selectPic",
            data: reqData,
            type: "post",
            dataType: "json",
            processData: false,
            contentType : false,
            success: function (data) {
                console.log(data);
                for(var j=0;j<data.data.length;j++) {
                    picture_container[j] = {
                        author: data.data[j].author,
                        name: data.data[j].name,
                        time: data.data[j].creteTime,
                        classity: data.data[j].category,
                        size: data.data[j].width + "X" + data.data[j].height + "cm",
                        price: "￥" + data.data[j].price,
                        user_adress: data.data[j].userAddress,
                        picture_adress: data.data[j].picAddress,
                        picture: data.data[j].pictureUrl
                    }
                }
                picture_container.length = data.data.length;
                creatPicture(picture_container);
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    classSearch();
    function classSearch() {
        property_list.forEach(function (list) {
            if (list.id == "property_reset") {
                list.onclick = function () {
                    this.style.display = "none";
                    property_size.setAttribute("min", "0");
                    property_size.setAttribute("max", "10000000");
                    property_size.style.display = "none";
                    property_price.setAttribute("min", "0");
                    property_price.setAttribute("max", "10000000");
                    property_price.style.display = "none";
                    property_style.setAttribute("value", "");
                    property_style.style.display = "none";
                    property_classity.setAttribute("value", "");
                    property_classity.style.display = "none";
                    property_theme.setAttribute("value", "");
                    property_theme.style.display = "none";
                    var reqInfor = serialize();
                    selectPic_RequestAjax(reqInfor);
                }
            }
            else if(list.id=="property_size"||list.id=="property_price"){
                list.onclick = function () {
                    this.setAttribute("min", "0");
                    this.setAttribute("max", "10000000");
                    this.style.display = "none";
                    var reqInfor = serialize();
                    selectPic_RequestAjax(reqInfor);
                    console.log($(this).attr("min"));
                }
            }
            else{
                list.onclick = function () {
                    this.style.display = "none";
                    this.setAttribute("value","");
                    var reqInfor = serialize();
                    selectPic_RequestAjax(reqInfor);
                }
            }
        })
    }
}
function creatPicture(picture_container) {
    var picture_list = document.getElementById("picture_list").getElementsByTagName("span");
    picture_list[0].innerHTML ="";
    picture_list[1].innerHTML ="";
    picture_list[2].innerHTML ="";
    for(var k=0;k<picture_container.length/3;k++) {
        for(var i=0;i<3;i++) {
            picture_list[i].innerHTML = picture_list[i].innerHTML+"<img src='' class='Imgs'/>\n" +
                "                    <div>\n" +
                "                        <p class='Author'></p>\n" +
                "                        <p class='NameAndTime'></p>\n" +
                "                        <p class='ClassityAndSize'></p>\n" +
                "                        <p class='Price'></p>\n" +
                "                    </div>";
        }
    }
    var imgs = document.getElementsByClassName("Imgs");
    var NameAndTime = document.getElementsByClassName("NameAndTime");
    var author = document.getElementsByClassName("Author");
    var ClassityAndSize = document.getElementsByClassName("ClassityAndSize");
    var price = document.getElementsByClassName("Price");
    for(var l=0;l<picture_container.length;l++){
        imgs[l].src = picture_container[l].picture;
        imgs[l].setAttribute("user_adress",picture_container[l].user_adress);
        imgs[l].setAttribute("picture_adress",picture_container[l].picture_adress);
        imgs[l].onclick = function () {
            sessionStorage.setItem("picAddress",this.getAttribute("picture_adress"));
            window.location.href = "checkAuction.html";
        };
        author[l].innerHTML = picture_container[l].author;
        ClassityAndSize[l].innerHTML = picture_container[l].classity+","+picture_container[l].size;
        NameAndTime[l].innerHTML = picture_container[l].name+","+picture_container[l].time;
        price[l].innerHTML = picture_container[l].price;
    }
}
