myReady(function () {
    init.homeLoad();
    eventbind.binding();
});
var allUrl = {
    init: "/page/home",
    viewchange: "/page/getHomeCatPic",
    newflush: "/page/flush"
};
var init = {
    url: allUrl.init,
    homeLoad: function () {
        init.setScrollTheme();
        let postResponse = postAxios(init.url,"","");
        postResponse.then(function (data) {
            console.log(data);
            init.viewLoad(data.data.data.oilPaintings);
            init.newLoad(data.data.data.newProducts);
        });
        postResponse.catch(function (error) {
            console.log(error);
        });
    },
    setScrollTheme: function () {
        themeNum = parseInt(5*Math.random());
        $(".rolling-theme")[themeNum].style.opacity = "1";
        $(".rolling-order").querySelectorAll("li")[themeNum].style.backgroundColor = "orangered";
        $(".rolling-order").querySelectorAll("li").forEach(function (value, index, listObj) {
            value.onmouseover = function () {
                function changeTheme() {
                    let rollingTheme = $(".rolling-theme");
                    rollingTheme[themeNum].style.opacity = "0";
                    listObj[themeNum].style.backgroundColor = "white";
                    rollingTheme[index].style.opacity = "1";
                    listObj[index].style.backgroundColor = "orangered";
                    themeNum = index;
                }
                return changeTheme();
            };
        });
        function autoTurn() {
            let rollingTheme = $(".rolling-theme");
            let rollingOrder = $(".rolling-order").querySelectorAll("li");
            rollingTheme[themeNum].style.opacity = "0";
            rollingOrder[themeNum].style.backgroundColor = "white";
            themeNum = parseInt(5*Math.random());
            rollingTheme[themeNum].style.opacity = "1";
            rollingOrder[themeNum].style.backgroundColor = "orangered";
        }
        setInterval(autoTurn,10000);
    },
    viewLoad: function (oil) {
        console.log(oil);
        $(".view-picture").forEach(function (element,item,array) {
            element.style.background = "url('" + oil[item].pictureUrl + "')";
            element.style.backgroundSize = "100% 100%";
            element.style.backgroundPosition = "center";
            element.setAttribute("picAddress",oil[item].picAddress);
            eventbind.checkPictureMore(element);
        });
        $(".view-information").forEach(function (element,item,array) {
            element.innerHTML = "<p>"+oil[item].author+"</p><p>"+oil[item].name+","+oil[item].creteTime+"</p><p>"+oil[item].category+","+oil[item].width+"X"+oil[item].height+"cm"+"</p><p>￥"+oil[item].price+"</p>";
        });
    },
    newLoad: function (newProducts) {
        $(".new-products").querySelectorAll("a").forEach(function (element,item,array) {
            element.style.background = "url("+newProducts[item].pictureUrl+")";
            element.style.backgroundSize = "100% 100%";
            element.style.backgroundPosition = "center";
            element.setAttribute("picAddress",newProducts[item].picAddress);
            eventbind.checkPictureMore(element);
        });
        $(".new-information").forEach(function (value,item) {
            value.innerHTML = "<p>"+newProducts[item].author+"</p><p>"+newProducts[item].name+"，"+newProducts[item].creteTime+"</p><p>"+newProducts[item].category+"，"+newProducts[item].width+"X"+newProducts[item].height+"cm"+"</p><p>￥"+newProducts[item].price+"</p>";
        });
    }
};
var eventbind = {
    binding: function () {
        eventbind.viewchange();
        eventbind.newflush();
        eventbind.categoryFind();
    },
    viewchange: function () {
        let clickPrevent = 0;
        $(".view-class").querySelectorAll("a").forEach(function (value,index,array) {
            value.onclick = function () {
                this.setAttribute("class","active");
                array[clickPrevent].setAttribute("class","");
                clickPrevent = index;
                let PostData = new FormData();
                PostData.append("category",this.innerHTML);
                console.log(this.innerHTML);
                let promise = postAxios(allUrl.viewchange,PostData,"");
                promise.then(function (data) {
                    init.viewLoad(data.data.data);
                })
            }
        });
    },
    newflush:function () {
        let x = 180;
        $("#newFlush").onclick = function () {
            let promise = postAxios(allUrl.newflush,"","");
            promise.then(function (data) {
                $(".new-products").querySelectorAll("li").forEach(function (value) {
                    value.style.transform = "rotateY("+ x +"deg)";
                    value.style.transition = "0.8s";
                });
                $(".new-products").querySelectorAll("a").forEach(function (value,item,array) {
                    value.style.transform = "rotateY("+x+"deg)";
                    value.style.transition = "0.8s";
                });
                if(x == 0){
                    x = 180;
                }
                else {
                    x = 0;
                }
                init.newLoad(data.data.data);
            });
        }
    },
    checkPictureMore: function (event) {
        event.onclick = function () {
            window.sessionStorage.setItem("picAddress",event.getAttribute("picAddress"));
            window.location.href = "checkInfor.html";
        }
    },
    viewmore: function () {
        
    },
    categoryFind: function () {
        $(".startFind").onclick = function () {
            let findCategory = "";
            $(".category").forEach(function (value) {
                findCategory = value.value + "&" + findCategory;
            });
            window.sessionStorage.setItem("findCategory",findCategory);
            window.location.href = "searchResult.html";
        };
    },
    search: function () {
        
    }
}
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