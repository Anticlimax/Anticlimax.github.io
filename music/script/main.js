

var app = (function () {
  function fmPlayer() {


    this.init();
    this.bind();
  }

  fmPlayer.prototype.init = function () {
    this.app = $('#app');
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

    this.curSong = '';
    this.preSong = '';


    this.getChannel();
    this.getMusic();


  }

  fmPlayer.prototype.play = function (dataObj) {
    var data = dataObj.song[0];
    this.curSong = dataObj;

    this.audioObject.src = data.url;
    this.artist.text(data.artist);
    this.title.text(data.title);
    this.pic.css({
      'background-image': 'url(' + data.picture + ')'
    });
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

  return {
    init:function () {
      new fmPlayer();
    }
  }
})()

var a = app.init();