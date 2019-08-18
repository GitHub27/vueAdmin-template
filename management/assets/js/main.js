$(document).ready(function() {
    $('#menu-1').tooltip({
        text: '项目管理',
        theme: 'light',
        fontSize: '14px',
    });
    $('#menu-2').tooltip({
        text: '资金管理',
        theme: 'light',
        fontSize: '14px',
    });
    $('#menu-3').tooltip({
        text: '办公事务',
        theme: 'light',
        fontSize: '14px',
    });
    $('#menu-4').tooltip({
        text: '业务统计',
        theme: 'light',
        fontSize: '14px',
    });
    $('#menu-5').tooltip({
        text: '系统管理',
        theme: 'light',
        fontSize: '14px',
    });
    $('#download').tooltip({
        text: '支持与下载',
        theme: 'light',
        fontSize: '14px',
    });
});
var menuSwitch = true;
$('.menu-switch').click(function() {
    console.log(this);
    menuSwitch = !menuSwitch;
    if (menuSwitch) {
        this.src = "./assets/img/m-right.png";
        $('.scrollbar-wrapper2').show();
        $('.app-wrapper').addClass('showMenu3');
    } else {
        this.src = "./assets/img/m-left.png";
        $('.scrollbar-wrapper2').hide();
        $('.app-wrapper').removeClass('showMenu3');
    }
});