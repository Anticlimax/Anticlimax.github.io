var page = require('webpage').create();
var system = require('system');
var keyword = system.args[1];
var url = 'https://www.baidu.com/s?wd=' + keyword;
var dataList = [];
var result = {};
var startTime = Date.now();


page.open(url,function(s){
    if(s == 'fail') {
        console.log('无法打开链接');
        result.code = 0;
        result.msg = '抓取失败';
        console.log(JSON.stringify(result));
        phantom.exit()
    } else if (s == 'success'){
        console.log('已打开链接，正在抓取中请稍等')
        setTimeout(function(){
            page.includeJs('./jquery-3.1.1.js',function(){
            
            dataList =  page.evaluate(function(){
                var data = [];
                var $content = $('.c-container');
                $content.each(function(index){
                    data[index]={
                        title:$(this).find('.t').text()||'',
                        info:$(this).find('.c-abstract').text()||'',
                        link:$(this).find('.c-showurl').text()||'',
                        pic:$(this).find('.general_image_pic img').attr('src')||''};
                    
                })
                return data;
            })
            result = {
                code:0,
                keyword:keyword,
                msg:'抓取成功',
                time:Date.now() - startTime,
                dataList:dataList
            }
            console.log(JSON.stringify(result));
            phantom.exit();
        })
        },5000)
        
    }
})