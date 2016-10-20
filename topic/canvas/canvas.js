/**
 * @file test Canvas, just for fun, interesting...
 * @author  virola(virola.zhu@gmail.com)
 */

var time        = new Date();
var dayNight    = ( time.getHours() < 6 || time.getHours() > 18 );
var cloudPos    = [];

var canvas      = document.getElementById( 'Canvas' );
var ctx         = canvas.getContext( '2d' );
var winHeight   = getPageHeight();
var winWidth    = getPageWidth();

canvas.setAttribute( 'width', winWidth );
canvas.setAttribute( 'height', winHeight );

var height      = canvas.height;
var width       = canvas.width;

function sky( x, y, dayOrNight ) {
    var rx = width * x / winWidth,
        ry = height * y / winHeight,
        startColor  = '',
        stopColor   = ''; 

    var gradient    = ctx.createRadialGradient( rx, ry, Math.max( width / 100, 50 ), rx, ry, width ); 

    if ( dayOrNight ) {
        startColor  = '#000040';
        stopColor   = '#3F48CC';
    } else {
        startColor  = '#00A2E8';
        stopColor   = '#99D9EA';
    }

    gradient.addColorStop( 0, stopColor );
    gradient.addColorStop( 1, startColor );

    ctx.fillStyle = gradient;
    
    ctx.fillRect( 0, 0, width, height );
}

function mount() {
    var begin = {
        x : 0,
        y : height * 0.7
    };
    var startLoc = [{
        x : width * 0.3,
        y : height * 0.6
    }, {
        x : width * 0.6,
        y : height * 0.65
    }];
    var ctlLoc = [ {
        x : width * 0.3,
        y : height * 0.8
    }, {
        x : width * 0.7,
        y : height * 0.5
    } ];
    var endLoc = [ {
        x : width * 0.5,
        y : begin.y
    }, {
        x : width,
        y : begin.y
    } ];
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.moveTo( begin.x, begin.y );
    ctx.bezierCurveTo( startLoc[0].x, startLoc[0].y, ctlLoc[0].x, ctlLoc[0].y, endLoc[0].x, endLoc[0].y  );
    ctx.bezierCurveTo( startLoc[1].x, startLoc[1].y, ctlLoc[1].x, ctlLoc[1].y, endLoc[1].x, endLoc[1].y  );
    ctx.lineTo( width, height );
    ctx.lineTo( 0, height );
    //ctx.lineTo( begin.x, begin.y );

    ctx.closePath();
    ctx.fill();
}

function sunny() {
    var pos = {
        x : width * 0.8,
        y : Math.max( height * 0.2, 100 )
    };
    var radius = 50;

    ctx.fillStyle = '#FF0000';
    ctx.shadowColor = '#FF0000';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.beginPath();
    ctx.arc( pos.x, pos.y, radius, 0, Math.PI * 2, false );
    ctx.closePath();
    ctx.fill();

    // clear
    ctx.shadowBlur = 0;
}

function moon() {
    var pos = {
        x : width * 0.2,
        y : Math.max( height * 0.2, 100 )
    };
    var radius = 50;

    ctx.fillStyle = '#FFF755';
    ctx.shadowColor = '#FFF755';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.beginPath();
    ctx.arc( pos.x, pos.y, radius, 0, Math.PI * 2, false );
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
}

// clound
function cloudGroup( count ) {
    var maxHeight = height * 0.4;
    var minHeight = height * 0.1;

    var i = 0;
    var x = 0, y = 0;
    for ( ; i < count; i++ ) {
        if ( !cloudPos[i] ) {
            x = Math.random() * width;
            y = Math.random() * ( maxHeight - minHeight ) + minHeight;
            cloudPos[i] = {
                x : x,
                y : y
            }
        }
        cloud( cloudPos[i].x, cloudPos[i].y );
    }
}

function cloud( x, y) {
    var w = 120;
    var h = 60;
    var loc = [];
    var r1 = 10;
    var r2 = r1 * 1.5;
    var strokeColor = '#fff';
    var fillColor = '#fff';
    var degree = 0, rad = [];

    loc[0] = {
        x : x,
        y : y + h * 2 / 3
    };
    loc[1] = {
        x : loc[0].x + r2 + r1 * Math.sqrt( 2 ) / 2,
        y : loc[0].y - r1 * Math.sqrt( 2 ) / 2
    };
    loc[2] = {
        x : loc[1].x + r2 + r1 * Math.sqrt( 2 ) / 2,
        y : loc[0].y
    };

    degree  = Math.asin( r1 * Math.sqrt( 2 ) / 2 / r2 );
    rad[0]  = ( 180 - degree ) / 180 * Math.PI;
    rad[1]  = degree / 180 * Math.PI;

    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.arc( loc[0].x, loc[0].y, r1, Math.PI / 2, Math.PI * 7 / 4, false );
    ctx.arc( loc[1].x, loc[1].y, r2, rad[0], rad[1], false );
    ctx.arc( loc[2].x, loc[2].y, r1, Math.PI * 5 / 4, Math.PI / 2, false );
    ctx.closePath();
    ctx.fill();
}

function init() {
    var body = document.getElementsByTagName('body')[0];

    draw( 0, 0);
    body.onmousemove = getMouseMove();
}

function getMouseMove() {
    return function (event) {
            x = event.clientX, 
            y = event.clientY,
        
        draw( x, y );
    };
}

function draw( x, y ) {
    sky( x, y, dayNight );
    mount();

    if ( dayNight ) {
        cloudGroup( 6 );
        moon();
    } else {
        cloudGroup( 6 );
        sunny();
    }
}


window.onload = init;


