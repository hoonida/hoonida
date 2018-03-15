var init = function(){
  /*--DOMs--*/
  var cirCon = document.querySelector('#cirCon');
  var title = document.getElementById('title');
  var pdm = document.querySelectorAll('.pdm');
  var pdmDiv = document.querySelectorAll('.pdm div');
  var pdmSvg = document.querySelectorAll('.pdm svg');
  var menu = document.querySelector('#menu');
  var menuWin = document.querySelector('#menuWin');
  var menuLines = document.querySelectorAll('#menu line');
  var box = document.querySelectorAll('.box')[0];
  var st0 = document.querySelectorAll('.st0');
  var st1 = document.querySelectorAll('.st1');
  var st2 = document.querySelectorAll('.st2');
  var Layer_1 = document.querySelector('#Layer_1');
  var Layer_2 = document.querySelector('#Layer_2');
  var Layer_3 = document.querySelector('#Layer_3');
  var v1 = document.getElementById('v1'),
  v2 = document.getElementById('v2'),
  v3 = document.getElementById('v3');
  var vids = document.querySelector('#vids');
  var about = document.querySelector('#about');
  var credit = document.querySelector('#credit');
  var list = document.querySelectorAll('.list');
  var boxText = document.querySelectorAll('.boxText');
  var audio;
  var wonChar;
  var playing = true;

  var v1State = 'i',
  v2State = 'i',
  v3State = 'i';

  var v1ready = false,
  v2ready = false,
  v3ready = false;

  var videoReq, intro =true, introindex = 0;

  document.addEventListener('keydown',function(e){
  	if(e.keyCode == 81){
  		v1ready = false;
  		v1State = "q"
  	}
  	if(e.keyCode == 87){
  		v1ready = false;
  		v1State = "w"
  	}
  	if(e.keyCode == 65){
  		v2ready = false;
  		v2State = "a"
  	}
  	if(e.keyCode == 83){
  		v2ready = false;
  		v2State = "s"
  	}
  	if(e.keyCode == 90){
  		v3ready = false;
  		v3State = "z"
  	}
  	if(e.keyCode == 88){
  		v3ready = false;
  		v3State = "x"
  	}
  })


  /*--important variables--*/
  var ifMenu = false;
  var ifPd = false;
  var pdNow = 3;
  var isAnim = false;
  var isAbout = false;
  var isCredit = false;

  $('#ko_about').click(function(e){
    $('#kor').css({"display":"block"})
    $('#eng').css({"display":"none"})
  })

  $('#en_about').click(function(e){
    $('#kor').css({"display":"none"})
    $('#eng').css({"display":"block"})
  })

  $('#about_close').click(function(e){
    aboutClose();
  })

$('#credit_close').click(function(e){
    creditClose();
  })

  title.onclick = function(){
     aboutClose();
     creditClose();
     pdBoxClose();
     pdClose(pdNow);
     if(!playing){
        loopvid();
        v1.play();
        v2.play();
        v3.play();

        cancelAnimationFrame(animReq);

        gl.detachShader(program, vertexShader);
        gl.detachShader(program, fragmentShader);
        playing = true;
     }


  }
  /*--interactions--*/
  pdm[0].onclick = function(){ /*--shader_3--*/
    if(!isAnim){
      aboutClose();
      pdCon(0);
    }
    if(ifMenu){menuClose();}
    if(isCredit){creditClose();}
  };
  pdm[1].onclick = function(){ /*--shader--*/
    if(!isAnim){
      aboutClose();
      pdCon(1);
    }
    if(ifMenu){menuClose();}
    if(isCredit){creditClose();}
  };
  pdm[2].onclick = function(){ /*--shader_2--*/
    if(!isAnim){
      aboutClose();
      pdCon(2);
    }
    if(ifMenu){menuClose();}
    if(isCredit){creditClose();}
  };
  list[0].onclick = function(){
      aboutOpen();
      if(ifMenu){menuClose();}
      if(isCredit){creditClose();}
  }
  // list[1].onclick = function(){
  //   if(ifMenu){menuClose();}
  //   if(isAbout){aboutClose();}
  //   if(ifPd){pdCon(pdNow);}
  //   if(isCredit){creditClose();}
  // }
  // list[2].onclick = function(){
  //   if(!isAnim){
  //     aboutClose();
  //     pdCon(0);
  //   }
  //   if(ifMenu){menuClose();}
  //   if(isCredit){creditClose();}
  // }
  list[1].onclick = function(){
    creditOpen();
    if(ifMenu){menuClose();}
    if(isAbout){aboutClose();}
  }


  // menu.onclick = function(){
  //   menuCon();
  // }

 

  /*--functions--*/
  // var menuCon = function(){
  //   if(ifMenu){
  //     menuClose();
  //   } else {
  //     menuWin.style['transform'] = 'translateX(0%)';
  //     document.querySelector('#menu svg').style['width'] = '500px';
  //     menuLines[0].setAttributeNS(null, 'x2', 100);
  //     menuLines[1].setAttributeNS(null, 'x2', 400);
  //     menuLines[2].setAttributeNS(null, 'x2', 200);
  //     ifMenu = true;
  //   }
  // }
  var pdCon = function(pdNum){
    isAnim = true;
    if(ifPd){
      if(pdNow == pdNum){ //활성화 된 항목 눌렀을 때 접기
        pdClose(pdNum);

        loopvid();
        v1.play();
      	v2.play();
      	v3.play();

      	cancelAnimationFrame(animReq);

        gl.detachShader(program, vertexShader);
        gl.detachShader(program, fragmentShader);

        setTimeout(function(){pdBoxClose();},200);

        playing = true;
      } else {

        gl.detachShader(program, vertexShader);
        gl.detachShader(program, fragmentShader);
        wonseons(pdNum);
        pdClose(pdNow);
        setTimeout(function(){moveBox(pdNum);},500);
        setTimeout(function(){pdOpen(pdNum);},500);
        setTimeout(function(){pdAnim(pdNum);},1000);
        playing=false;
      }
    } else {

        gl.detachShader(program, vertexShader);
        gl.detachShader(program, fragmentShader);
      setTimeout(function(){pdOpen(pdNum);},0);
      setTimeout(function(){
        vids.style['transform']  = 'translateY(-100vh)';
        cirCon.style['transform'] = 'translateY(0vh)';
      },0);
      wonseons(pdNum);
      setTimeout(function(){moveBox(pdNum);},0);
      setTimeout(function(){pdAnim(pdNum);},500);
      setTimeout(function(){
        box.style['opacity'] = 1;
      },0);
      ifPd = true;

      playing=false;
    }

    setTimeout(function(){
      isAnim = false;
    },1000);

  }
  var pdOpen = function(pdNum){
    if(pdNum == 1){
      pdmSvg[pdNum].style['height'] = '23vh';
    } else {
      pdmSvg[pdNum].style['height'] = '50vh';
    }
    setTimeout(function(){
      pdmDiv[pdNum].style['font-size'] = '35px';
    },500);
    pdNow = pdNum;
  }
  var pdClose = function(pdNum){
    pdmDiv[pdNum].style['font-size'] = '16px';
    pdAnimR(pdNum);
    setTimeout(function(){
      pdmSvg[pdNum].style['height'] = '30px';
    },500);
  }
  var pdBoxClose = function(){
    setTimeout(function(){
      cirCon.style['transform'] = 'translateY(100vh)';
      vids.style['transform']  = 'translateY(0vh)';
    },0);
    setTimeout(function(){
      box.style['opacity'] = 0;
    },100);
    ifPd = false;
  }
  var moveBox = function(pdNum){
    //box.style['transform'] = 'translateX('+pdNum * 10 +'vw)';
  }
  var pdAnim = function(pdNum){
    if(pdNum == 0){
      Layer_3.style['opacity'] = 1;
      boxText[2].style['opacity'] = 1;
      for(var i = 0; i < st2.length; i++){
        st2[i].style['animation'] = 'dash 1s ease reverse';
      }
      setTimeout(function(){
        for(var i = 0; i < st2.length; i++){
          st2[i].style['stroke-dashoffset'] = 136;
        }
      },1000);
    } else if(pdNum == 1){
      Layer_2.style['opacity'] = 1;
      boxText[1].style['opacity'] = 1;
      for(var i = 0; i < st1.length; i++){
        st1[i].style['animation'] = 'dash 1s ease reverse';
      }
      setTimeout(function(){
        for(var i = 0; i < st2.length; i++){
          st1[i].style['stroke-dashoffset'] = 396;
        }
      },1000);
    } else if(pdNum == 2){
      Layer_1.style['opacity'] = 1;
      boxText[0].style['opacity'] = 1;
      for(var i = 0; i < st0.length; i++){
        st0[i].style['animation'] = 'dash 1s ease reverse';
      }
      setTimeout(function(){
        for(var i = 0; i < st2.length; i++){
          st0[i].style['stroke-dashoffset'] = 396;
        }
      },1000);
    }
  }
  var pdAnimR = function(pdNum){
    if(pdNum == 0){

      for(var i = 0; i < st2.length; i++){
        st2[i].style['animation'] = 'dashR 1s ease reverse';
      }
      setTimeout(function(){
        for(var i = 0; i < st2.length; i++){
          st2[i].style['stroke-dashoffset'] = 1200;
          Layer_3.style['opacity'] = 0;
          boxText[2].style['opacity'] = 0;
        }
      },1000);
    } else if(pdNum == 1){

      for(var i = 0; i < st1.length; i++){
        st1[i].style['animation'] = 'dashR 1s ease reverse';
      }
      setTimeout(function(){
        for(var i = 0; i < st2.length; i++){
          st1[i].style['stroke-dashoffset'] = 1200;
          Layer_2.style['opacity'] = 0;
          boxText[1].style['opacity'] = 0;
        }
      },1000);
    } else if(pdNum == 2){

      for(var i = 0; i < st0.length; i++){
        st0[i].style['animation'] = 'dashR 1s ease reverse';
      }
      setTimeout(function(){
        for(var i = 0; i < st2.length; i++){
          st0[i].style['stroke-dashoffset'] = 1200;
          Layer_1.style['opacity'] = 0;
          boxText[0].style['opacity'] = 0;
        }
      },1000);
    }
  }

  $('#howto').click(function(){
    intro = true;
    introindex = 0;
    $('#bundle1').animate({"opacity":"0"},300,function(){
      $('#bundle1').animate({"opacity":"1"},300,function(){
        $('#bundle1').animate({"opacity":"0"},300,function(){
          $('#bundle1').animate({"opacity":"1"},500,function(){
            $('#bundle2').animate({"opacity":"0"},300,function(){
              $('#bundle2').animate({"opacity":"1"},300,function(){
                $('#bundle2').animate({"opacity":"0"},300,function(){
                  $('#bundle2').animate({"opacity":"1"},300,function(){
                  $('#bundle3').animate({"opacity":"0"},300,function(){
                  $('#bundle3').animate({"opacity":"1"},300,function(){
                  $('#bundle3').animate({"opacity":"0"},300,function(){
                  $('#bundle3').animate({"opacity":"1"},300,function(){})})})})})
               })
              })
            })
          })
        })
      })
    })
  })

  var loopvid = function(){
  	videoReq = requestAnimationFrame(loopvid);

     if(intro){

      if(!v1ready && introindex ==0){
          v1State = "q";
          introindex = 1;
          $('#bundle1').eq(0).animate({'opacity':1},500);
        }
        if(v1.currentTime >= 15 &&  introindex == 1){
          v2State = "a";
          introindex = 2;
          console.log('b')
          $('#bundle2').eq(0).animate({'opacity':1},500);
        }
        if(v2.currentTime >= 7. && v2.currentTime<= 11 &&  introindex == 2){
          v3State = "z";
          intro= false;
          console.log('a')
          $('#bundle3').eq(0).animate({'opacity':1},500)
        }

     }

  	if(v1State == 'i'){
  		if(v1.currentTime >= 7){
  			v1.currentTime = 0;
  		}
  	}
  	if(v1State == 'q' ){
  			if(!v1ready){
  				v1.currentTime = 13;
  				v1ready = true;
  			}
  			if(v1.currentTime >= 16){
  				v1State = 'i';
  				v1ready = false;
  				v1.currentTime = 0;
  			}
  	}
  	if(v1State == 'w'){
  			if(!v1ready){
  				v1.currentTime = 17.5;
  				v1ready = true;
  			}
  			if(v1.currentTime >= 22){
  				v1ready = false;
  				v1State = 'i';
  				v1.currentTime = 0;
  			}
  	}

  	if(v2State == 'i'){
  		if(v2.currentTime <= 9){
  			v2.currentTime = 11;
  		}
  	}

  	if(v2State == 'a'){
  		if(!v2ready){
  			v2.currentTime = 6;
  			v2ready = true;
  		}
  		if(v2.currentTime >= 7.7){
  			v2ready = false;
  			v2State = 'i';
  			v2.currentTime = 11;
  		}
  	}

  	if(v2State == 's'){
  		if(!v2ready){
  			v2.currentTime = 9;
  			v2ready = true;
  		}
  		if(v2.currentTime >= 10){
  			v2ready = false;
  			v2State = 'i';
  			v2.currentTime = 11;
  		}
  	}

  	if(v3State == 'i'){
  		if(v3.currentTime >= 2.5){
  			v3.currentTime = 0;
  		}
  	}

  	if(v3State == 'z'){
  		if(!v3ready){
  			v3.currentTime = 2.5;
  			v3ready = true;
  		}
  		if(v3.currentTime >= 5){
  			v3.ready = false;
  			v3State = 'i';
  			v3.currentTime = 0;
  		}
  	}

  	if(v3State == 'x'){
  		if(!v3ready){
  			v3.currentTime = 11;
  			v3ready = true;
  		}
  		if(v3.currentTime >= 15){
  			v3.ready = false;
  			v3State = 'i';
  			v3.currentTime = 0;
  		}
  	}
  };
  var wonseons = function(n){

    if(n == 0){
      wonChar = '_3';
    } else if (n == 1){
      wonChar = '';
    } else if (n == 2){
      wonChar = '_2';
    }

    cancelAnimationFrame(animReq);
    render();

    v1.pause();
    v2.pause();
    v3.pause();

    cancelAnimationFrame(videoReq);

    shaderScript = document.getElementById("2d-vertex-shader");
    shaderSource = shaderScript.text;
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, shaderSource);
    gl.compileShader(vertexShader);

    shaderScript = document.getElementById("2d-fragment-shader"+wonChar);
    shaderSource = shaderScript.text;
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, shaderSource);
    gl.compileShader(fragmentShader);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    return;
  }
  var aboutOpen = function(){
    about.style['display'] = 'initial';
    setTimeout(function(){
      about.style['opacity'] = 1;
    },100);
    for(let i=0; i<3; i++){
      pdClose(i);
    }
    isAbout = true;
  }
  var aboutClose = function(){
    about.style['opacity'] = 0;
    setTimeout(function(){
      about.style['display'] = 'none';
    },1000);
    isAbout = false;
  }
  var menuClose = function(){
    menuWin.style['transform'] = 'translateX(100%)';
    document.querySelector('#menu svg').style['width'] = '30px';
    ifMenu = false;
  }
  var creditOpen = function(){
    credit.style['display'] = 'initial';
    setTimeout(function(){
      credit.style['opacity'] = 1;
    },100);
    for(let i=0; i<3; i++){
      pdClose(i);
    }
    isCredit = true;
  }
  var creditClose = function(){
    credit.style['opacity'] = 0;
    console.log('yes');
    setTimeout(function(){
      credit.style['display'] = 'none';
    },1000);
    isCredit = false;
  }

  setTimeout(function(){
    loopvid();
  },2000);


  gl_init();
};

var toHL = function(){
  window.open("http://www.hoonida.com/");
}

window.onload = init;
