$(function () {
    header = sessionStorage.getItem("key");
    init(header);
    upload(header);
});
function init(header) {
    if(header !=null) {
        $.ajax({
            url:"/article",
            dataType:"json",
            type: "post",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization",header);
            },
            success:function (data) {
                document.querySelector("#user").innerHTML = data.data;
                document.querySelector("#userId").innerHTML = data.data;
            },
            error:function (data){
                alert("请登录");
                window.location.href = "login.html";
            }
        })
    }
    else {
        alert("请登录");
        window.location.href = "login.html";
    }
}
function previewImage(file)
{
    var MAXWIDTH  = 100;
    var MAXHEIGHT = 100;
    var div = document.getElementById('preview');
    var fileSplit = file.files[0].name.split(".");
    var fileType = fileSplit[fileSplit.length-1];
    if(fileType == "jpg@90q"||fileType == "jpg"||fileType == "jpeg"||fileType == "png") {
        if (file.files && file.files[0]) {
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.onload = function () {
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width = rect.width;
                img.height = rect.height;
            }
            var reader = new FileReader();
            reader.onload = function (evt) {
                img.src = evt.target.result;
            }
            reader.readAsDataURL(file.files[0]);
        }
        else {
            var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        }
    }
    else {
        // file.value = "";
        // alert("请传入图片，格式为png/jpg/jpg@90q/jpeg");
        console.log(file.files[0].type);
    }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
function upload(header) {
    var submitPic = document.getElementById("submitPic");
    submitPic.onclick = function () {
        var file = $("#file")[0].files[0];
        var name = document.getElementById("name").value;
        var author = document.getElementById("author").value;
        var createTime = document.getElementById("creatTime").value;
        var picHeight = document.getElementById("picHeight").value;
        var picWidth = document.getElementById("picWidth").value;
        var picStyle = document.getElementById("picStyle").value;
        var theme = document.getElementById("picTheme").value;
        var category = document.getElementById("picClassity").value;
        var picStatus = document.getElementById("picStatus").value;
        var price = document.getElementById("price").value;
        var discription = "4s5d4a3w45w353333333";
        var picStatus = document.getElementById("picStatus").value;
        picStatus = parseInt(picStatus);
        var data = new FormData();
        data.append("picFile", file);
        data.append("name", name);
        data.append("author", author);
        data.append("createTime", createTime);
        data.append("height", picHeight);
        data.append("width", picWidth);
        data.append("style", picStyle);
        data.append("theme", theme);
        data.append("category", category);
        data.append("productStatus", picStatus);
        data.append("price", price);
        if (file != "" && name != "" && author != "" && createTime != "" && picHeight != "" && picWidth != "" && price != "") {
            $.ajax({
                url: "/product/unlock",
                type: "get",
                async: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", header);
                },
                success: function (datarr) {
                    // if(data.get("productStatus"))
                    console.log(datarr);
                    info.setCommodityCode(name, price);
                    console.log(info.setCommodityCode(name, price));
                    do {
                        pic_address = info.getCommodityCode(name);
                        console.log(pic_address);
                        sleep(2000);
                    } while (pic_address == 0);
                    if (data.get("productStatus") == 2) {
                        info.changeCommodityState(pic_address, "false");
                    }
                    info.setCommodityCodeList(pic_address);
                    info.setCommodityDatePrice(pic_address, price);
                    data.append("picAddress", pic_address);
                    console.log(pic_address);
                    if (file != "" && name != "" && author != "" && createTime != "" && picHeight != "" && picWidth != "" && price != "") {
                        $.ajax({
                            url: "/product/upload",
                            data: data,
                            async: false,
                            processData: false,
                            contentType: false,
                            type: "post",
                            dataType: "json",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", header);
                            },
                            success: function (data) {
                                alert(data.msg);
                                //window.location.href = "personage.html";
                            },
                            error: function (data) {
                                console.log(data);
                            }
                        })
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        else{
            alert("请输入或完整信息");
        }
    }
}