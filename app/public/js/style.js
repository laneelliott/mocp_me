var windowWidth = $(window).width();
var marginTotal = windowWidth - $(".rectangle").width();

// this lets us know if the animation happened
var trigger = false;

// this tells us if we are on #intro or #upload
// if intro = false, we are on #upload
var intro = true;

// ~~~~~~~~~~~~~~~ resizes #upload ~~~~~~~~~~~~~~~
function resizeMainReturn(){
	var logoHeight = $(".description").height();
	var marginUpload = logoHeight/4;

	$(".logo-sideways").css("height", logoHeight);
	$(".description-mobile-container").css("height", logoHeight + (marginUpload*2));
	$(".description-mobile-container").css("padding-top", marginUpload);
	$(".description-mobile-container").css("padding-bottom",marginUpload);
}

// ~~~~~~~~~~~~~~~ resizes #intro ~~~~~~~~~~~~~~~
function resizeWindows(){
	windowWidth = $(window).width();
	marginTotal = windowWidth - 272;
	
	$(".transform-container").css("margin-left", marginTotal/1.5);
	$("#header").css("margin-left", marginTotal/1.5);
}

function onloadFunction(){
	$("#upload").hide();
	$(".return-mocp-image").hide();
	$(".white-line").removeClass("white-line-hide");
	resizeWindows();
}
onloadFunction();

// ~~~~~~~~~~~~~~~ resize windows when screen is resized ~~~~~~~~~~~~~~~
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


// ~~~~~~~~~~~~~~~ on scroll events for #intro ~~~~~~~~~~~~~~~
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

// ~~~~~~~~~~~~~~~ on scroll events for #upload ~~~~~~~~~~~~~~~
function onScrollForUpload(){
	if (intro === false){
		$(window).on('scroll',function() {
			var y_scroll_pos = window.pageYOffset;

			if (y_scroll_pos > $(".main-body").height()){
				$("#footer-line").addClass("footer-line-show");
			}
			if (y_scroll_pos < $(".main-body").height()){
				$("#footer-line").removeClass("footer-line-show");
			}
		});
	}
}


function uploadFunction(){
	// $(".loader").hide();
	// $(".main-return").removeClass("hide");
	resizeMainReturn();
	onScrollForUpload();
}

$("#file-button").on("click", function(){
	console.log('click')
	intro = false;
	$(".yellow-background-circle").css("background-color", "#E5B616");
	$(".start-text").addClass("hide");
	// $("#fileInput").change(function(){
			$("#intro").hide();
			$("#upload").show();
		setTimeout(function(){
			// sendUploadedImage($('#fileInput'));
			uploadFunction();
		},300);
	// });
});


$(".mocp-image-one").hover(function(){
    $("#tags-one").removeClass("flip");
    }, function(){
    $("#tags-one").addClass("flip");
});
$(".mocp-image-two").hover(function(){
    $("#tags-two").removeClass("flip");
    }, function(){
    $("#tags-two").addClass("flip");
});

function addTagOne(){
	$("#add-tag-one").addClass("button-animation");
	setTimeout(function(){
		var addTagImageOne = prompt("Add a tag:");
		$("#add-tag-one").removeClass("button-animation");
	},500);
}
function addTagTwo(){
	$("#add-tag-two").addClass("button-animation");
	setTimeout(function(){
		var addTagImageTwo = prompt("Add a tag:");
		$("#add-tag-two").removeClass("button-animation");
	},500);
}

$(".bug-report").on("click", function(){
	setTimeout(function(){
		var bugDescription = prompt("Tell us about your bug - be sure to include what browser and what device the error occured on.");
    	$("#bug-report-title").css("opacity", 0);
		$(".bug-report-validation").css("display", "none");
		$("#bug-line").css("display", "none");
		$(".text-validation").css("opacity", 1);
		$(".text-validation").css("display", "block");
	}, 700);
});


