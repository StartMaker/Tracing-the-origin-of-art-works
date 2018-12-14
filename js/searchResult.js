myReady(function () {
    init();
    search();
});
function myReady(fn){
    //对于现代浏览器
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",fn,false);
    }else{
        IEContentLoaded(fn);
    }
    //IE模拟
    function IEContentLoaded(fn){
        var done = false;
        var init = function(){
            if(!done){
                done = ture ;
                fn();
            }
        };
        (function(){
            try{
                //dom树为创建钱出错
                d.documentElement.doScroll('left');
            }catch(e){
                setTimeout(arguments.callee,50);
                return;
            }
            init();
        });
        //监听document的加载状态
        d.onreadystatechange = function(){
            if(d.readyState == 'complete'){
                d.onreadystatechange = null;
                init();
            }
        }
    }
}
function pictureLoad(picList) {
    var column = document.querySelectorAll(".column");
    number = 0;
    for(var i=0;i<picList.length;i++){
        for(var j=0;j<3;j++){
            if(picList[number]!=""){
                if(number==picList.length){
                    break;
                }
                column[j].innerHTML = column[j].innerHTML + "<div>\n" +
                    "                    <img src=\""+picList[number].pictureUrl+"\" id='"+picList[number].picAddress+"'/>\n" +
                    "                    <div>\n" +
                    "                        <p>"+picList[number].author+"</p>\n" +
                    "                        <p> "+picList[number].name+","+picList[number].creteTime+"</p>\n" +
                    "                        <p>"+picList[number].category+","+picList[number].width+"X"+picList[number].height+"cm"+"</p>\n" +
                    "                        <p>"+"￥"+picList[number].price+"</p>\n" +
                    "                    </div>\n" +
                    "                </div>";
                number++;
            }
        }
    }
    var pictureList = document.getElementById("pictureList").querySelectorAll("img");
    for(var k = 0;k < pictureList.length;k++ ){
        pictureList[k].onclick = function () {
            sessionStorage.setItem("picAddress",this.id);
            window.location.href = "checkInfor.html";
        }
    }
    number = 0;
}
function ReponestAxios() {
        return new Promise((resolve, reject) => {
            var searchList = sessionStorage.getItem("findCategory");
            searchList = searchList.split("&");
            datareq = {
                minWidth: searchList[3],
                maxWidth: searchList[4],
                minPrice: searchList[1],
                maxPrice: searchList[2],
                style: searchList[5],
                category: searchList[0]
            }
            resolve(datareq);
    });
}
function init() {
    header = {"Authorization":sessionStorage.getItem("key")};
    const promise = new Promise(function(resolve, reject) {
        data = axios.post("/article", "",{headers:header});
        if (data != null){
            resolve(data);
        } else {
            reject(error);
        }
    });
    promise.then(function (response) {
        var userId = document.querySelector("#userId");
        userId.innerHTML = response.data.data;
    }),function(error) {
        console.log(error);
    }
    ReponestAxios();
    ReponestAxios().then(data => {
            var params = new URLSearchParams();
            params.append("minWidth", data.minWidth);
            params.append("maxWidth", data.maxWidth);
            params.append("minPrice", data.minPrice);
            params.append("maxPrice", data.maxPrice);
            params.append("style", data.style);
            params.append("category", data.category);
            params.append("productStatus", "1");
            params.append("author", "");
            params.append("theme", "");
            params.append("pageNum", "1");
            data = axios.post("/page/selectPic", params);
            return Promise.resolve(data);
        })
        .then(data => {
            console.log(data);
            pictureLoad(data.data.data);
        })
}
function search() {
    var searchInfor = document.querySelector("#searchInfor");
    searchInfor.onclick = function () {
       searchPic();
    };
    document.onkeyup = function (ev) {
        if (window.event) {
            ev = window.event;
        }
        var code = ev.charCode || ev.keyCode;
        if (code == 13) {
            searchPic();
        }
    };
    function searchPic() {
        const promise = new Promise(function (resolve, reject) {
            var search = document.querySelector("#search").value;
            var parmes = new URLSearchParams();
            parmes.append("info",search);
            var data = axios.post("/page/selectRandom",parmes);
            resolve(data);
        });
        promise.then(function (response) {
            let columns = document.querySelectorAll(".column");
            columns[0].innerHTML = "";
            columns[1].innerHTML = "";
            columns[2].innerHTML = "";
            pictureLoad(response.data.data);
        })
    }
}
