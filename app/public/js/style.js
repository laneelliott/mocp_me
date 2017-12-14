
var windowWidth = $(window).width();
var marginTotal = windowWidth - $(".rectangle").width();
var trigger = false;
var intro = true;

onloadFunction();
function onloadFunction(){
	$("#upload").hide();
	$(".return-mocp-image").hide();
	$(".white-line").removeClass("white-line-hide");
}

function resizeMainReturn(){
	var logoHeight = $(".description-text").height();
	$(".logo-sideways").css("height", logoHeight);

	if ($(window).width() > 753){
		$(".uploaded-image").hide();
		$(".returned-text").removeClass("parallax");
		$(".returned-text").addClass("not-parallax-text");
	} else if ($(window).width() < 753) {
		$("#uploaded").css("overflow-x", "none");
		$(".uploaded-image").show();
		$(".returned-text").addClass("parallax");
		$(".returned-text").removeClass("not-parallax-text");
	}
}

function resizeWindows(){
	windowWidth = $(window).width();
	marginTotal = windowWidth - 272;
	
	$(".transform-container").css("margin-left", marginTotal/2);
	$("#header").css("margin-left", marginTotal/2);
}
resizeWindows();

$(window).on('resize', function(){
	windowWidth = $(window).width();
	if (intro === true){
		if (windowWidth > 400){
			resizeWindows();
			if (trigger === true){
				$(".yellow-background-circle").css("margin-left", marginTotal/2);
			}
			$(".yellow-background").css("transition", "all 0s linear");
			console.log("hello world 1")
		}
	}
	if (intro === false){
		resizeMainReturn();
	}
});

if (intro === true){
	$(window).on('scroll',function() {
		var y_scroll_pos = window.pageYOffset;

		var testTrigger = $(".logo").height();
		if (y_scroll_pos > testTrigger +20){
			if(trigger === false){
				$(".yellow-background").addClass("yellow-background-circle");
				$(".yellow-background-circle").css("margin-left", marginTotal/2);

				$(".yellow-background").css("transition", "all .5s linear");
				$(".rectangle").addClass("camera-body-black");
				$(".col-details-1").removeClass("col-xs-3");
				$(".col-details-2").removeClass("col-xs-9");
				$(".speaker").addClass("camera-body-gray");
				$(".speaker-circle").addClass("camera-flash");
				$(".screen-yellow").addClass("camera-lens");
				$(".camera-flash-detail").removeClass("hide");
				$(".screen-before").addClass("camera-lens-inside");
				$(".white-line").addClass("camera-lens-reflection");
				// $("#intro-text").addClass("hide-text");
				$(".screen").addClass("camera-gray-stripe");
				$(".screen-2").addClass("camera-gray-stripe");
				$(".start-text").removeClass("hide");

				$(".intro-text").fadeOut(0);
			} 
			setTimeout(function(){
				trigger = true;
			}, 500); 
		}

		if (y_scroll_pos < testTrigger +20){
			if(trigger === true){
				$(".yellow-background").css("margin-left", 0);
				$(".yellow-background").css("transition", "all .5s linear");

				$(".rectangle").removeClass("camera-body-black");
				$(".col-details-1").addClass("col-xs-3");
				$(".col-details-2").addClass("col-xs-9");
				$(".speaker").removeClass("camera-body-gray");
				$(".speaker-circle").removeClass("camera-flash");
				$(".screen-yellow").removeClass("camera-lens");
				$(".camera-flash-detail").addClass("hide");
				$(".screen-before").removeClass("camera-lens-inside");
				$(".white-line").removeClass("camera-lens-reflection");
				// $("#intro-text").removeClass("hide-text");
				$(".screen").removeClass("camera-gray-stripe");
				$(".screen-2").removeClass("camera-gray-stripe");
				$(".yellow-background-circle").css("margin-left", 0);
				$(".yellow-background").removeClass("yellow-background-circle");
				$(".start-text").addClass("hide");

				$(".intro-text").fadeIn(800);
			}
			setTimeout(function(){
				trigger = false;
			}, 500); 
		}
	});
}


function uploadFunction(){
	$(".loader").hide();
	$(".main-return").removeClass("hide");
	resizeMainReturn();
}

if (trigger === false){

	$("#file-button").on("click", function(){
		intro = false;
		$(".yellow-background-circle").css("background-color", "#E5B616");
		$(".start-text").addClass("hide");
		$("#fileInput").change(function(){
				$("#intro").hide();
				$("#upload").show();
			setTimeout(function(){
				uploadFunction();
			},3000);
		});
	});
}


