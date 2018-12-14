myReady(function () {
    init.load();
    eventBinding.productManager();
    eventBinding.changeInfor();
});
var Url_Infor = {
    userLoad: "/article",
    productsLoad: "/product/getUserProducts",
    changeInfor: "/product/updateSomeInfo",
    userKey: window.sessionStorage.getItem("key")
    // userKey: window.sessionStorage.getItem("key")
};
var init = {
    load: function () {
        init.userLoad();
        init.productsLoad();
    },
    productsLoad: function () {
        let headers = {
            "Authorization": Url_Infor.userKey
        };
        let promise = postAxios(Url_Infor.productsLoad,"",headers);
        promise.then(function (data) {
            let products = data.data.data;
            $(".products").forEach(function (value,item,array) {
                if(products.length>item) {
                    value.style.display = "block";
                    value.style.background = "url(" + products[item].pictureUrl + ")";
                    value.style.backgroundPosition = "center";
                    value.style.backgroundSize = "100% 100%";
                }
                else {
                    value.style.display = "none";
                }
            });
            products.forEach(function(value,item){
                let texts = $(".products")[item].querySelectorAll("input");
                texts[0].value = value.name;
                texts[1].value = value.author;
                texts[2].value = value.height + "cm";
                texts[3].value = value.width + "cm";
                texts[4].value = value.creteTime;
                texts[5].value = value.picAddress;
                texts[5].style.overflowX = "auto";
                texts[6].value = "￥" + value.price;
                let select = $(".products")[item].querySelectorAll("select");
                select[0].value = value.category;
                select[1].value = value.productStatus;
                select[2].value = value.style;
            });
        });
        promise.catch(function () {
            $(".products").forEach(function (value) {
                value.style.display = "none";
            })
        });
    },
    userLoad: function () {
        let headers = {
            "Authorization": Url_Infor.userKey
        };
        let promise = postAxios(Url_Infor.userLoad,"",headers);
        promise.then(function (data) {
            $(".person-id").innerHTML = data.data.data;
            $("#email").value = data.data.data;
        });
    }
};
var eventBinding = {
    productManager: function () {
        $(".myProduects-nav").forEach(function (value,item,array) {
            let x = 1;
            let price = $(".products")[item].querySelectorAll("input")[6];
            value.querySelector(".myProduct-checkMore").onclick = function () {
                if(x==1) {
                    value.querySelector(".product-information").style.visibility = "visible";
                    x--;
                }
                else if(x == 0){
                    value.querySelector(".product-information").style.visibility = "hidden";
                    x++;
                }
            };
            value.querySelector(".compile").onclick = function () {
                this.style.display = "none";
                value.querySelector(".complete").style.display = "block";
                value.querySelectorAll(".canopen").forEach(function (element) {
                    element.disabled = "";
                    element.style.border = "1px solid black";
                    element.style.backgroundColor = "white";
                    element.style.appearance = "normal";
                    element.style.webkitAppearance = "normal";
                });
                price.value = price.value.substring(1);
            };
            value.querySelector(".close").onclick = function () {
                value.querySelector(".product-information").style.visibility = "hidden";
            };
        });
        console.log("evenbinding");
    },
    changeInfor: function () {
        $(".complete").forEach(function (value,item,array) {
            value.onclick = function () {
                let headers = {
                    "Authorization": Url_Infor.userKey
                };
                let reqData = new FormData();
                let products = $(".products")[item].querySelectorAll("input");
                if(products[1].value == "1"){
                    info.changeCommodityState(products[5].value,false);
                }
                else if(products[1].value == "2"){
                    info.changeCommodityState(products[5].value,true);
                }
                reqData.append("name",products[0].value);
                reqData.append("picAddress",products[5].value);
                reqData.append("author",products[1].value);
                reqData.append("price",products[6].value);
                products[6].value = "￥" + products[6].value;
                products = $(".products")[item].querySelectorAll("select");
                reqData.append("style",products[2].value);
                reqData.append("category",products[0].value);
                reqData.append("productStatus",products[1].value);
                let promise = postAxios(Url_Infor.changeInfor,reqData,headers);
                promise.then(function (data) {
                    let myProductsNav = $(".myProduects-nav")[item];
                    value.style.display = "none";
                    myProductsNav.querySelector(".compile").style.display = "block";
                    myProductsNav.querySelectorAll(".canopen").forEach(function (element) {
                        element.disabled = "disabled";
                        element.style.border = "none";
                        element.style.backgroundColor = "ghostwhite";
                        element.style.appearance = "none";
                        element.style.webkitAppearance = "none";
                    });
                    alert("修改成功！");
                });
                promise.catch(function () {
                    alert("输入不完整或者有误！");
                });
            }
        })
    }
};
const postAxios = function (url,reqdata,headers) {
    return new Promise(function (resolve,reject) {
        let data = axios({
            method: "post",
            data: reqdata,
            url: url,
            headers: headers,
            timeout: 5000
        });
        if(data) {
            resolve(data);
        }
        else{
            reject(error);
        }
    });
};



