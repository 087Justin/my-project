window.addEventListener('load', function () {
    //1.获取元素
    var prve = this.document.querySelector('.prve');
    var next = this.document.querySelector('.next');
    var focus = this.document.querySelector('.focus');
    //图片的宽度
    var focusWidth = focus.offsetWidth;
    //2.鼠标经过focus盒子 两边的按钮显示 离开隐藏
    focus.addEventListener('mouseenter', function () {
        prve.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        prve.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            next.click();
        }, 3000);
    })
    //3.动态生成小圆圈的个数 根据图片的个数
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (i = 0; i < ul.children.length; i++) {
        //1.创建小li 并且设置一个属性和值
        var li = this.document.createElement('li');
        li.setAttribute('index', i)
        //2.添加小li到ol里面
        ol.appendChild(li);
        //3.创建循环的同时给li绑定点击颜色改变事件
        li.addEventListener('click', function () {
            //排他思想
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //4.图片移动是在点击小圆圈后的事件 通过核心算法 用小圆圈的索引号*图片宽度得到移动距离 然后引入动画js
            //点击哪个li就的到它设置属性的索引号
            var index = this.getAttribute('index');
            // 把每次点击li的index值给下面切换图片的num 这样可以实现图片和小圆圈位置同步
            num = index;
            circle = index;
            //调用函数
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';

    //6.点击右侧按钮事件
    //克隆第一张图片然后添加到最后一个 实现无缝切换
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //声明一个num变量 点击一次 num自增一次
    var num = 0;
    var circle = 0;
    //节流阀设置 防止图片快速点击
    var flag = true
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            });
            //7.设置点击一次右箭头小圆圈移动一下 通过设置一个变量来控制
            circle++;
            if (circle == 4) {
                circle = 0;
            }
            circleChange();
        }
    })
    prve.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //8.设置点击一次右箭头小圆圈移动一下 通过设置一个变量来控制
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })
    function circleChange() {
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //9.自动轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        next.click();
    }, 3000)
    //最后一步，鼠标经过就清除定时器 鼠标离开就开启定时器 直接将代码写在前面的鼠标经过和离开事件上
})

// 电梯导航模块
$(function () {
    var toolTop = $(".recom").offset().top;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();

        } else {
            $(".fixedtool").fadeOut();
        }
    });
    $(".fixedtool li").click(function () {
        console.log($(this).index());
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        })
    })
})