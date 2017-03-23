

var app = (function () {
  function fmPlayer() {


    this.init();
    this.bind();
  }

  fmPlayer.prototype.init = function () {
    this.container = $('#container')
    this.app = $('#app');
    this.lyric = $('#lyric')
    this.pic = this.app.find('.pic');
    this.artist = this.app.find('.artist');
    this.title = this.app.find('.title');
    this.backBar = this.app.find('.backBar');
    this.frontBar = this.app.find('.frontBar');
    this.pause = this.app.find('.pause');
    this.start = this.app.find('.start');
    this.pre = this.app.find('.pre');
    this.next = this.app.find('.next');
    this.listIcon = this.app.find('.listIcon');
    this.channelList = this.app.find('.channel');
    this.list = this.app.find('#list');
    this.audioObject = document.querySelector('#music');

    this.currentTime = '';
    this.duration = '';
    this.curSong = '';
    this.preSong = '';
    this.sid = '';
    this.lyricArr = [];

    this.getChannel();
    this.getMusic();


  }

  fmPlayer.prototype.play = function (dataObj) {
    var data = dataObj.song[0];

    this.lyricArr = [];
    this.lyric.html('');

    this.curSong = dataObj;
    this.sid = data.sid

    this.audioObject.src = data.url;
    this.artist.text(data.artist);
    this.title.text(data.title);
    this.pic.css({
      'background-image': 'url(' + data.picture + ')'
    });
    this.container.css({
      'background-image': 'url(' + data.picture + ')'
    });

    this.getLyric(this.sid)
  }

  fmPlayer.prototype.bind = function () {
    var that = this;

    this.audioObject.addEventListener('ended',function () {
      that.preSong = that.curSong;
      that.getMusic(that.channels);
    });

    this.pause.on('click',function () {
      that.stopPlay();
    });

    this.start.on('click',function () {
      that.startPlay();
    });

    this.next.on('click',function () {
      that.preSong = that.curSong;
      that.pause.show();
      that.start.hide();
      that.getMusic(that.channels);
    });

    this.pre.on('click',function () {
      that.pause.show();
      that.start.hide();
      that.play(that.preSong);
      that.curSong = that.preSong;
    });

    this.audioObject.ontimeupdate = function () {
      that.currentTime = that.audioObject.currentTime;
      that.duration = that.audioObject.duration;
      that.moveBar(that.currentTime,that.duration);
      that.highLight(that.currentTime)
    };

    this.backBar.on('click',function (e) {
      that.clickBar(e);
    });

    this.frontBar.on('click',function (e) {
      that.clickBar(e);
    });

    this.listIcon.on('click',function () {
      that.list.toggle(500);
    });

    this.channelList.on('click','li',function () {
      that.channels = $(this).attr('data');
      that.getMusic($(this).attr('data'));
      that.list.fadeOut(500)
    })
  }

  fmPlayer.prototype.getMusic = function (data) {
    var that = this;
    var url = '?channel=' + data || '';
    $.get('http://api.jirengu.com/fm/getSong.php' + url)
      .done(function (song) {
        var data = JSON.parse(song);
        that.play(data);
    })

  }

  fmPlayer.prototype.getChannel = function () {
    var that = this;
    $.get('http://api.jirengu.com/fm/getChannels.php')
      .done(function (channel) {
        var data = JSON.parse(channel)
        that.createList(data)
      })
  }

  fmPlayer.prototype.getLyric = function (sid) {
    var that = this;
    $.get('http://jirenguapi.applinzi.com/fm/getLyric.php?&sid=' + sid)
      .done(function (lyric) {
        that.dealLyric(JSON.stringify(JSON.parse(lyric).lyric))
      })
  }

  fmPlayer.prototype.stopPlay = function () {
    this.audioObject.pause();
    this.pause.hide();
    this.start.show();
  }

  fmPlayer.prototype.startPlay = function () {
    this.audioObject.play();
    this.start.hide();
    this.pause.show();
  }

  fmPlayer.prototype.moveBar = function (a,b) {
    this.frontBar.css({
      'width': a/b * this.backBar.width()
    });
  }

  fmPlayer.prototype.clickBar = function (e) {
    var startX = this.backBar.offset().left;
    var pointX = e.pageX;
    var width = this.backBar.width();
    this.audioObject.currentTime = (pointX - startX) / width * this.duration;

  }

  fmPlayer.prototype.createList = function (data) {
    var str = '';
    for(var i = 0; i < data.channels.length; i++){
      str += '<li data="' + data.channels[i].channel_id  +  '">' + data.channels[i].name + '</li>';
    }
    this.channelList.html(str);
  }

  fmPlayer.prototype.dealLyric = function (data) {
    var that = this
    var lyricArr = data.split('\\n')
    lyricArr.splice(0,1)
    lyricArr.forEach(function (item,index) {
      var regTime = /\[\d+:\d+(\.\d+)?\]/g
      if( item.match(regTime)){
        var timeStr = item.match(regTime).toString()
        var x = timeStr.length
        var lyc = item.slice(x)
        var time = parseInt(timeStr.slice(1,3)) * 60 + parseInt(timeStr.slice(4,timeStr.length-2))
        that.lyricArr.push({
          time: time,
          lyc: lyc
        })
      }
    })
    this.renderLyc(that.lyricArr)
  }

  fmPlayer.prototype.renderLyc = function (arr) {
    var that = this
    arr.forEach(function (item,index) {
      that.lyric.append('<li>' + item.lyc + '</li>')
    })
    that.lyric.find('li:first-child').css({
      'margin-top': $(window).height() * .5 + 'px'
    })
  }

  fmPlayer.prototype.highLight = function (currentTime) {
    var that = this;
    this.lyricArr.forEach(function (item, index) {
      if(Math.floor(that.currentTime) === item.time){
        that.lyric.find('li:first-child').animate({
          'margin-top':'-=20'
        })
        console.log(that.lyric.find('li'))
        that.lyric.find('li').each(function () {
          $(this).removeClass('highLight')
        })
        that.lyric.find('li').eq(index).addClass('highLight')
      }
    })
  }


  return {
    init:function () {
      new fmPlayer();
    }
  }
})()

var a = app.init();