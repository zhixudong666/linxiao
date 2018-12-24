window.onload = function()
{
	//swiper滑动
	var mySwiper = new Swiper ('.swiper-container', {
		direction: 'vertical', // 垂直切换选项
		loop: true, // 循环模式选项
        onTouchMove:function(){
            console.log(11111,$(".swiper-slide-active.box1"));
        }

	});
	///////

	// 音乐开关
	var audio = document.getElementById('musicaudio');
	var img = document.querySelector(".music");
	//判断是否停止
	if(audio.paused){
		//停止不选转
	    img.classList.remove("turn");
	}else{
		//开始旋转
		img.classList.add("turn");
	}
	img.onclick = function (){
		if(audio.paused){
			audio.play();
		    img.classList.add("turn");
		}else{
			audio.pause();
			img.classList.remove("turn");
		}
	};
	//提交
    // 号码验证
    var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
    //姓名验证
    var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
    var message = $("#message");
    var userName =  $("#userName");
    var userPhone =  $("#userPhone");
    var userSchool =  $("#userSchool");
    var city =  $("#city");
    var flag = 0;
    var once = 1;
	$("#userName").blur(function(){
        if(!nameReg.test(userName.val())){
            if(userName.val() == "")
            {
                userName.val("");
                $(".name-tips").text("姓名不可为空");
                $(".name-tips").show();
            }else{
                userName.val("");
                $(".name-tips").text("请输入中文名");
                $(".name-tips").show();
            }
            flag = 0;
        }else{
            flag = 1;
        }
	});
    $("#userPhone").blur(function(){
        if(!phoneReg.test(userPhone.val())){
            if(userPhone.val() == "")
            {
                userPhone.val("");
                $(".phone-tips").text("号码不可为空");
                $(".phone-tips").show();
            }else{
                userPhone.val("");
                $(".phone-tips").text("请输入正确的手机号");
                $(".phone-tips").show();
            }
            flag = 0;
        }else {
            flag = 1;
        }
    });
    $("#userSchool").blur(function(){
        if(userSchool.val() == "")
        {
            userSchool.val("");
            $(".school-tips").text("学校不可为空");
            $(".school-tips").show();
            flag = 0;
        }else{
            flag = 1;
        }
    });
    $("#city").blur(function(){
        if(city.val() == "")
        {
            city.val("");
            $(".city-tips").text("学校不可为空");
            $(".city-tips").show();
            flag = 0;
        }else{
            flag = 1;
        }
    });
	$(".name-tips").click(function () {
		$(".name-tips").hide();
		$("#userName").focus();
    });
    $(".phone-tips").click(function () {
        $(".phone-tips").hide();
        $("#userPhone").focus();
    });
    $(".city-tips").click(function () {
        $(".city-tips").hide();
        $("#city").focus();
    });
    $(".school-tips").click(function () {
        $(".school-tips").hide();
        $("#userSchool").focus();
    });
        document.querySelector('.form-btn').onclick = function(){
            if(once == 1 && flag == 1 || userSchool.val()!=""|| userPhone.val()!=""|| userName.val()!=""|| city.val()!="") {
                $.ajax({
                    url: "http://118.190.150.35:9002/message/save",
                    method: "POST",
                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                    dataType: 'jsonp',
                    async: false,
                    cache: false,
                    data: $('#form').serialize(),
                    success: function (res) {
                        if (res.code === 0) {
                            console.log("提交成功！");
                            jqalert({
                                content: '信息提交成功！'
                            });
                            userName.val("");
                            userPhone.val("");
                            userSchool.val("");
                            city.val("");
                            message.val("");
                            flag = 0;
                            once = 0;
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            }
        };
	// detail
	var detail = document.querySelector('.d-box1');
	var xiala = document.querySelector('.dxiala');
	var bb1 = document.querySelector('.bb1');
	var bb2 = document.querySelector('.bb2');
//	var bb3 = document.querySelector('.bb3');
	var time = 0;
	detail.onclick = function(){
		if(time == 0){
			xiala.classList.add("active");
            bb1.classList.add("active");
            bb2.classList.add("active");
//          bb3.classList.add("active");
			time = 1;
		}else if(time == 1){
            xiala.classList.remove("active");
            bb1.classList.remove("active");
            bb2.classList.remove("active");
//          bb3.classList.remove("active");
			time = 0;
		}
	};
    //跳转
    $(".bb1").click(function(){
        mySwiper.slideTo(14,1000,false);
        xiala.classList.remove("active");
        bb1.classList.remove("active");
        bb2.classList.remove("active");
//      bb3.classList.remove("active");
        time = 0;
    });
//  $(".bb2").click(function(){
//      mySwiper.slideTo(15,1000,false);
//      xiala.classList.remove("active");
//      bb1.classList.remove("active");
//      bb2.classList.remove("active");
//      bb3.classList.remove("active");
//      time = 0;
//  });
	// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(112.545953,37.901842), 16);  // 初始化地图,设置中心点坐标和地图级别
	map.setCurrentCity("太原");          // 设置地图显示的城市 此项是必须设置的
}
