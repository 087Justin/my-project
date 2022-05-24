window.onload = function () {
    var regtel = /^1[3|4|5|7|8|9]\d{9}$/;  //手机号正则表达式
    var regmes = /^\d{6}$/;
    var regpsd = /^\w{6,16}$/;
    var tel = document.querySelector('#tel');
    var mes = document.querySelector('#mes');
    var psd = document.querySelector('#psd');
    var surepsd = document.querySelector('#surepsd');
    regexp(tel, regtel);
    regexp(mes, regmes);
    regexp(psd, regpsd);
    //因为多出需要此事件，将其封装为函数更方便
    function regexp(ele, reg) {
        ele.addEventListener('blur', function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success-icon"></i>格式正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error-icon"></i>格式输入错误，请重新填写';
            }
        })
    };
    surepsd.addEventListener('blur', function () {
        if (surepsd.value == psd.value && surepsd.value.length > 0) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success-icon"></i>密码输入成功';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error-icon"></i>密码不一致，请重新输入密码';
        }
    })
}