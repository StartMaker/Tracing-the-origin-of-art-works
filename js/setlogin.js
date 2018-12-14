myReady(function() {
    formChange();
    document.getElementById("checkword").onclick = function () {
        creatCheckword(this);
    }
    document.getElementById("email").onblur = function () {
        checkEmail(this);
    }
    document.getElementById("password").onblur = function () {
        checkPassword(this);
    }
    document.getElementById("register_password").onblur = function () {
        checkPassword(this);
    }
    document.getElementById("check_checkword").onblur = function () {
        checkCheckword(this);
    }
    document.getElementById("register_email").onblur = function () {
        checkEmail(this);
    }
    document.getElementById("register_checkword").onclick = function (){
        getRegisterCheckword();
        var clock = '';
        var nums = 60;
        var btn;
        sendCode(this);
        function sendCode(thisBtn)
        {
            btn = thisBtn;
            btn.disabled = true;
            btn.innerHTML = nums+'s重新获取';
            clock = setInterval(doLoop, 1000);
        }
        function doLoop()
        {
            nums--;
            if(nums > 0){
                btn.innerHTML = nums+'s重新获取';
            }else{
                clearInterval(clock);
                btn.disabled = false;
                btn.innerHTML = '获取验证码';
                nums = 60;
            }
        }
    }
    document.getElementById("register").onclick = function () {
        regist();
    }
    document.getElementById("login").onclick = function () {
       login();
    }
})

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
function checkPassword(password){
    var code = new RegExp("^(?![0-9]+$)(?![a-zA-Z`~!@#$%^&*()_\\-+=<>?:\"{}|,.\\/;'\\\\[\\]·~！@#￥%……&*（）——\\-+={}|《》？：“”【】、；‘’，。、]+$)[0-9A-Za-z`~!@#$%^&*()_\\-+=<>?:\"{}|,.\\/;'\\\\[\\]·~！@#￥%……&*（）——\\-+={}|《》？：“”【】、；‘’，。、]{6,16}$");
    if(password.value == ""){
        password.value = "";
        password.placeholder = "*密码不能为空";
    }
    else if(!code.test(password.value)){
        password.value = '';
        password.placeholder = "至少6位数字和其他字符";
    }
}
function creatCheckword(checkword){
    var code = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    var codenumber = '';
    for(var i=0;i < 6;i++){
        var number = Math.floor(Math.random()*52);
        codenumber += code[number];
    }
    checkword.innerHTML = codenumber ;
}
function checkEmail(email){
    var emailFormat = new RegExp("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?");
    if(!emailFormat.test(email.value)&&email.value!==''){
        email.value = '';
        email.placeholder = "*邮箱格式有误";
    }
    else if(email.value == ''){
        email.placeholder = "*邮箱不能为空";
    }
}
function checkCheckword(checkword){
    var getCheckword = document.getElementById("checkword").innerHTML;
    if(checkword.value == '获取验证码'||checkword.value.toUpperCase() != getCheckword.toUpperCase()&&checkword.value!=''){
        checkword.value = '';
        checkword.placeholder = "*输入有误";
    }
    else if(checkword.value == ""){
        checkword.placeholder = "*验证码不能为空";
    }
}
function formChange() {
    var forms = document.getElementsByTagName("form");
    var login_form = document.getElementById("login_form");
    var register_form =document.getElementById("register_form");
    login_form.onclick = function () {
        forms[0].style.display = "block";
        forms[1].style.display = "none";
    }
    register_form.onclick = function () {
        forms[0].style.display = "none";
        forms[1].style.display = "block";
    }
}
function getRegisterCheckword(){
    var registerEmail = document.getElementById("register_email").value;
    $.ajax({
        url:"/unAuthentication/sendCode",
        type:"post",
        dataType:"json",
        data: {
            emailAddress: registerEmail
        },
        success:function (data) {
            var  p = JSON.stringify(data);
            var  c = JSON.parse(p);
            console.log(c);
        },
        error:function () {
            console.log("checkfalse");
        }
    })
}
function regist(){
    var regist = document.getElementById("regist_form");
    var inputList = regist.getElementsByTagName("input");
    var mailbox = inputList[0].value;
    var password = inputList[1].value;
    var password2 = inputList[2].value;
    var sms = inputList[3].value;
    var warn = document.getElementById("register_warn");
    if(password!=password2&&password!=""){
        warn.innerHTML = "两次密码不一致";
    }
    else if(mailbox!=''&&password!=''&&sms!=''&&password2!='') {
        $.ajax({
            type: "post",
            url: "/unAuthentication/register",
            data: {
                emailAddress: mailbox,
                password: password,
                code: sms,
            },
            dataType: "json",
            error: function (request) {
                console.log(request);
                alert("请求失败");
            },
            success: function (data) {
                var dataString = JSON.stringify(data);
                var dataObject = JSON.parse(dataString);
                if(dataObject.msg=="验证码错误"){
                    warn.innerHTML = "验证码输入不正确";
                }
                else if(dataObject.msg =="邮箱已被注册"){
                    warn.innerHTML = "邮箱已被注册";
                }
                else if(dataObject.msg =="成功"){
                    alert("注册成功");
                    window.location.href = "login.html";
                }
            }
        });
    }
}
function login(){
    var checkword = document.getElementById("check_checkword");
    var checkwordSure = document.getElementById("checkword");
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var warn =document.getElementById("warn");
    if(checkwordSure.innerHTML.toUpperCase()==checkword.value.toUpperCase()){
        $.ajax({
            url:"/login",
            data:{
                username: email,
                password: password,
                rememberMe: "true"
            },
            dataType: "json",
            type: "post",
            async: false,
            success: function(data){
                var dataString=JSON.stringify(data);
                var dataObject=JSON.parse(dataString);
                console.log(data);
                if(dataObject.msg =="密码错误"){
                    warn.innerHTML = "密码错误";
                }
                else if(dataObject.msg == "用户不存在"){
                    warn.innerHTML = "用户不存在";
                }
                else{
                    console.log(data);
                    sessionStorage.setItem("key",data.data.data);
                    window.location.href = "homepage.html";
                }
            },
            error: function(data) {
                alert("登录失败");
            }
        })
    }
}
