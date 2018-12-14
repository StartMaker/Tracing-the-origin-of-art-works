$(function () {
    header = sessionStorage.getItem("key");
    $.ajax({
        url: "/getUserAddress",
        type: "post",
        async: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization",header);
        },
        success: function (data) {
            userAddress = data.data;
        }
    });
    address_list = new Array();
    owner_list = new Array();
    price_list = new Array();
    priceTotle = 0;
    creatProject();
    chooseProject();
    deal();
})
function chooseProject() {
    var chooseAll =document.getElementById("chooseAll");
    var Cart_container = document.getElementsByClassName("Cart_container");
    var chooseImg = document.getElementsByClassName("chooseImg");

    chooseAll.onclick = function () {
        changeAllChooseStatus();
        setDeal();
    }
    changeChooseStatus();
    function changeAllChooseStatus() {
        var AllStatus = $(chooseAll).attr("value");
        if(AllStatus == "no"){
            for(var k=0;k<chooseImg.length;k++){
                chooseImg[k].src = "images/chooseafter.png";
                chooseImg[k].setAttribute("value","yes");
                if(k>0){
                    Cart_container[k-1].setAttribute("value","yes");
                }
            }
        }
        else{
            for(var l=0;l<chooseImg.length;l++){
                chooseImg[l].src = "images/choose.png";
                chooseImg[l].setAttribute("value","no");
                if(l>0){
                    Cart_container[l-1].setAttribute("value","no");
                }
            }
        }
    }
    function changeChooseStatus() {
        for(var i =1;i<chooseImg.length;i++) {
            chooseImg[i].setAttribute("number",i);
            chooseImg[i].onclick = function () {
                var projectStatus = $(this).attr("value");
                if(projectStatus == "yes"){
                    this.setAttribute("value","no");
                    this.src = "images/choose.png";
                    Cart_container[$(this).attr("number")-1].setAttribute("value","no");
                }
                else {
                    this.setAttribute("value","yes");
                    this.src = "images/chooseafter.png";
                    Cart_container[$(this).attr("number")-1].setAttribute("value","yes");
                }
                setDeal();
            }
            console.log();
        }
    }
}
function creatProject() {
    pictureContent = new Array();
    $.ajax({
        url: "/product/catInfo",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization",header);
        },
        async: false,
        type:"post",
        dataType: "json",
        success:function (data) {
            document.querySelector("#userId").innerHTML = data.data.emailAddress;
            var catList = data.data.catProductList;
            for(var i = 0;i<catList.length;i++){
                pictureContent[i] = {
                    picture: catList[i].picUrl,
                    name: catList[i].name,
                    author: catList[i].author,
                    size: catList[i].width + "X" + catList[i].height +"cm",
                    price: catList[i].price,
                    address: catList[i].picAddress,
                    userAddress: catList[i].userAddress,
                    choose_status: "no",
                    catDetailId: catList[i].catDetailId
                }
            }
        },
        error:function (error) {
            console.log(error);
        }
    })
    var shoppingCart = document.querySelector(".shoppingCart");
    for(var i=0;i<pictureContent.length;i++){
        shoppingCart.innerHTML = "<div class='Cart_container'>\n" +
            "                    <img src=\"images/choose.png\" class=\"chooseImg\"/>\n" +
            "                    <div class=\"Cart_picture\"></div>\n" +
            "                    <ul class=\"Cart_infor\">\n" +
            "                       <li></li>\n" +
            "                       <li></li>\n" +
            "                       <li></li>\n" +
            "                    </ul>\n" +
            "                    <span>\n" +
            "                        <div class='Cart_price'></div>\n" +
            "                        <button type=\"button\" class=\"Cart_set\">移除</button>\n" +
            "                    </span>\n" +
            "                </div>"+shoppingCart.innerHTML;
    }
    var CartPicture = shoppingCart.getElementsByClassName("Cart_picture");
    var CartInfor = shoppingCart.getElementsByClassName("Cart_infor");
    var CartSet = shoppingCart.getElementsByClassName("Cart_set");
    var CartPrice = shoppingCart.getElementsByClassName("Cart_price");
    var chooseImg = document.getElementsByClassName("chooseImg");
    for(var y=1;y<chooseImg.length;y++){
        chooseImg[y].setAttribute("price",pictureContent[y-1].price);
        chooseImg[y].setAttribute("value",pictureContent[y-1].choose_status);
        chooseImg[y].setAttribute("picture_address",pictureContent[y-1].address);
        chooseImg[y].setAttribute("userAddress",pictureContent[y-1].userAddress);
        chooseImg[y].setAttribute("catDetailId",pictureContent[y-1].catDetailId);
    }
    for(var j=0;j<pictureContent.length;j++){
        shoppingCart.getElementsByClassName("Cart_container")[j].setAttribute("id",pictureContent[j].address);
        CartPicture[j].style.background = "url("+pictureContent[j].picture+")";
        CartInfor[j].getElementsByTagName("li")[0].innerHTML = pictureContent[j].name;
        CartInfor[j].getElementsByTagName("li")[1].innerHTML = pictureContent[j].author;
        CartInfor[j].getElementsByTagName("li")[2].innerHTML = pictureContent[j].size;
        CartPrice[j].innerHTML = "￥"+pictureContent[j].price;
        CartSet[j].setAttribute("picture_address",pictureContent[j].address);
        CartSet[j].setAttribute("catDetailId",pictureContent[j].catDetailId);
        CartSet[j].onclick = function () {
            console.log(this);
            deleteList(this);
            deletePro = new Array();
            deletePro[0] = this.getAttribute("catDetailId");
            var ids = new FormData();
            ids.append("ids",deletePro);
            $.ajax({
                url: "/product/moveOutFromCat",
                data: ids,
                dataType:"json",
                processData: false,
                contentType : false,
                type:"post",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization",header);
                },
                success:function (data) {
                    console.log(data);
                },
                error:function (error) {
                    console.log(error);
                }
            })
        }
    }
    function deleteList(self) {
        var sureDelete = confirm("是否移除？");
        if(sureDelete == true) {
            var deleteProject = document.getElementById(self.getAttribute("picture_address"));
            deleteProject.remove();
            var chooseImg = document.getElementsByClassName("chooseImg");
            for (var t = 1; t < chooseImg.length; t++) {
                chooseImg[t].setAttribute("number", t);
            }
            setDeal();
        }
    }
}
function setDeal() {
    priceTotle = 0;
    var chooseImg = document.getElementsByClassName("chooseImg");
    var number = -1;
    var chooseNumber = document.getElementById("chooseNumber");
    var choosePrice = document.getElementById("choosePrice");
    for(var i=1;i<chooseImg.length;i++){
        if($(chooseImg[i]).attr("value")=="yes"){
            priceTotle = parseInt($(chooseImg[i]).attr("price"))+priceTotle;
            number++;
            price_list[number] = $(chooseImg[i]).attr("price");
            address_list[number] = $(chooseImg[i]).attr("picture_address");
            owner_list[number] = $(chooseImg[i]).attr("userAddress");
        }
    }
    address_list.length = number+1;
    owner_list.length = number+1;
    number++;
    chooseNumber.innerHTML = "已选商品"+number+"件";
    number = -1;
    choosePrice.innerHTML = "￥"+priceTotle;
}
function deal() {
    document.getElementById("deal").onclick = function () {
        var dealList = [];
        number = 0;
        dealSure = true;
        var chooseImg = document.getElementsByClassName("chooseImg");
        var Cart_container = document.querySelectorAll(".Cart_container");
        for (var i = 1; i < chooseImg.length; i++) {
            if ($(chooseImg[i]).attr("value") == "yes") {
                dealList[number] = $(chooseImg[i]).attr("catDetailId");
                number++;
            }
        }
        if (number != 0) {
            var reqData = new FormData()
            reqData.append("catDetailIds", dealList);
            reqData.append("bool", dealSure);
            $.ajax({
                url: "/product/confirmBuy",
                data: reqData,
                dataType: "json",
                processData: false,
                contentType: false,
                async: false,
                type: "post",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", header);
                },
                success: function (data) {
                    if (data.msg == "成功") {
                        for (var x = 1; x < chooseImg.length; x++) {
                            for (var y = 0; y < dealList.length; y++) {
                                if (chooseImg[x].getAttribute("catDetailId") == dealList[y]) {
                                    var deletepro = document.getElementById(chooseImg[x].getAttribute("picture_address"));
                                    $.ajax({
                                        url: "/product/unlock",
                                        type: "get",
                                        async: false,
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader("Authorization", header);
                                        },
                                        success: function (datarr) {
                                            info.transfer1(chooseImg[x].getAttribute("picture_address"), userAddress, chooseImg[x].getAttribute("price"));
                                            info.transfer2(chooseImg[x].getAttribute("picture_address"), userAddress, chooseImg[x].getAttribute("price"));
                                            info.transfer3(chooseImg[x].getAttribute("picture_address"), userAddress, chooseImg[x].getAttribute("price"));
                                        }
                                    });
                                    deletepro.remove();
                                }
                            }
                        }
                        var choosePrice = document.getElementById("choosePrice");
                        var chooseNumber = document.getElementById("chooseNumber");
                        chooseNumber.innerHTML = "已选商品0件";
                        choosePrice.innerHTML = "￥0";
                        alert("交易成功");
                    }
                    else {
                        var choosePrice = document.getElementById("choosePrice");
                        var chooseNumber = document.getElementById("chooseNumber");
                        chooseNumber.innerHTML = "已选商品0件";
                        choosePrice.innerHTML = "￥0";
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    }
}