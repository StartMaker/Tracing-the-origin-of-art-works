var list = new Array();
list[0] = {
    name: 'k',
    owner: '周',
    ownerId: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
    productsName: '0x14723a09acff6d2a60dcdf7aa4aff308fddc160c',
    price: '￥888',
    auction: 'true',
    way: '暂无',
    buyId: '0x462bf9264c8426ea327b32ca67210dadda3708a30aff32642409d87d77ae7140'
};
list[1] = {
    name: 'b',
    owner: '朱',
    ownerId: '0xCA1589d915458EF540aDe6068dFe2F44E8dd111c',
    productsId: '0xf26fe719688065fc28b4e8dcb69436a279fe28326a3b1e25c0dad5462bf9264c',
    price: '￥1000',
    auction: 'false',
    way: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
    buyId: '0x462bf9264c8426ea327b32ca67210dadda3708a30aff32642409d87d77ae7140,0xe1f58cd7c7f131df8503bc2602fbb24e00a788afadf446cebd22a5c3da30aa9f'
};
list[2] = {
    name: '3',
    owner: '周',
    ownerId: '0xCA35b7d915458EF540aDe6068dFe2F44E8fadd3b',
    productsId: '0xf26fe719688065fc28b4e8dcb69436a279fe28326a3b1e25c0dad5b4af2139f9',
    price: '￥888',
    auction: 'false',
    way: '暂无',
    buyId: '0x462bf9264c8426ea327b32ca67210dadda3708a30aff32642409d87d77ae7140'
};
$(function () {
    picAddress = sessionStorage.getItem("picAddress");
    header = sessionStorage.getItem("key");
    console.log(picAddress);
    name = "";
    picture = new Object();
    //验证当前用户
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
        error:function (error) {
            console.log(error);
        }
    });
    //请求图片信息
    $.ajax({
        url: "/page/getPicInfo",
        data: {
            "picAddress": picAddress
        },
        async: false,
        dataType: "json",
        type: "post",
        success: function (data) {
            var highestPrice;
            $.ajax({
                url: "/product/productBidHighestPrice",
                data: {
                    "picAddress": picAddress
                },
                type: "post",
                async: false,
                success: function (data) {
                    highestPrice = data.data;
                },
                error: function (error) {
                    console.log(error);
                }
            });
            picture = {
                picture: data.data.pictureUrl,
                name: data.data.name,
                author: data.data.author,
                price: data.data.price + "（now：￥"+highestPrice+"）",
                size: data.data.width+"X"+data.data.height,
                style: data.data.style,
                theme: data.data.theme,
                classity: data.data.category,
                time: data.data.creatTime,
                address: data.data.picAddress
            };
            name = data.data.name;
        },
        error:function (error) {
            console.log(error);
        },
        timeout: 1000
    });

    init();
    auction();
    checkHistory();
});
function checkHistory() {
    var checkhistory = document.getElementById("checkhistory");
    checkhistory.onclick = function () {
        var over_window = document.getElementById("over_window");
        var over_windowDelete = "<img src='images/exit.png' id='over_windowDelete' onclick='windowDelete();'/>"
        over_window.style.display = "block";
        var history = new Object();
        for(let p = 0 ; p < 3 ; p++){
            if(name == list[p].name || p ==2){
                history = list[p];
            }
        };
        over_window.innerHTML = over_windowDelete+"<p>历史信息</p>" +"<h6>拥有者："+history.owner+"；<br/>拥有者地址："+history.ownerId+"；<br/>物品标识码："+history.productsId+"；<br/>物品名称："+history.name+"；<br/>价格："+history.price+"；<br/>竞拍："+history.auction+"；<br/>经手人："+history.way+"；<br/>交易ID："+history.buyId+"</h6>";
        over_window.querySelector("p").style.marginLeft = "-20%";
        over_window.style.textAlign = "left";
        over_window.style.paddingLeft = "20%";
        document.documentElement.style.overflowY = "hidden";
    }
}
function windowDelete() {
    document.documentElement.style.overflowY = "scroll";
    over_window.style.display = "none";
}
function init() {
    var AllInformation_list = document.getElementById("AllInformation_list").getElementsByTagName("li");
    var picturePreview = document.querySelector("#picturePreview");
    var picturePreview2 = document.querySelector("#picturePreview2");
    var navName = document.querySelector("#navName");
    navName.innerHTML = picture.name;
    picturePreview.querySelector("img").src = picture.picture;
    picturePreview2.querySelector("img").src = picture.picture;
    AllInformation_list[0].innerHTML = "<span>作品名称："+picture.name+"</span><span>艺术家："+picture.author+"</span><span>材质："+picture.classity+"</span>";
    AllInformation_list[1].innerHTML = "<span>尺寸："+picture.size+"</span><span>创作时间："+picture.time+"</span><span>作品类型："+picture.classity+"</span>";
    AllInformation_list[2].innerHTML = "<span>风格："+picture.style+"</span><span>题材："+picture.theme+"</span><span><a href='javascript:void(0);' id='checkhistory'>查看历史信息</a></span>";
    document.getElementById("price").innerHTML = "￥"+ picture.price;
    document.getElementById("size").innerHTML = picture.size + "cm";
}
function auction() {
    var auction = document.getElementById("auction");

    auction.querySelector("button").onclick = function () {
        if(header==""){
            alert("请登录");
            window.location.href = "login.html";
        }
        else {
            let price = document.querySelector("#auctionPrice").value;
            let address_pic = picture.address;
            $.ajax({
                url: "/product/addBid",
                dataType: "json",
                async: false,
                type: "post",
                data:{
                    picAddress: address_pic,
                    price: price
                } ,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", header);
                },
                success: function (data) {
                    if(data.msg=="成功"){
                        $.ajax({
                            url: "/product/unlock",
                            type: "get",
                            async: false,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", header);
                            },
                            success: function (data) {
                                $.ajax({
                                    url: "/product/unlock",
                                    type: "get",
                                    async: true,
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader("Authorization", header);
                                    },
                                    success: function (datarr) {
                                        info.aution(address_pic, price);
                                    }
                                });
                                window.location.reload();
                                alert("加价成功！");
                            },
                            error:function (error) {
                                console.log(error);
                            }
                        });
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    }
}