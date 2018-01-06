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
	
	if (windowWidth < 450){
		$(".transform-container").css("margin-left", marginTotal/1.5);
		$("#header").css("margin-left", marginTotal/1.5);
	} else {
		$(".transform-container").css("margin-left", marginTotal/2);
		$("#header").css("margin-left", marginTotal/2);
	}
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
				$(".yellow-background-circle").css("margin-left", marginTotal/2.1);
			}
			$(".yellow-background").css("transition", "all 0s linear");
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
				$(".yellow-background-circle").css("margin-left", marginTotal/2.1);

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
			var mainBodyHeight = $(".main-body").height();
			var descriptionHeight = $(".footer").height();
			var uploadedImageHeight = $(".container-div-uploaded").height();
			var textHeight = $("#returned-text-one").height();
			var containerDivImageOne = $(".mocp-image-one").height() + $(".container-div-img-text").height();
			// console.log("uploaded height" + (uploadedImageHeight - (descriptionHeight/1.5)));

			if (y_scroll_pos > mainBodyHeight-(descriptionHeight*1.3)){
				$("#footer-line").addClass("footer-line-show");
			}
			if (y_scroll_pos < mainBodyHeight-(descriptionHeight*1.3)){
				$("#footer-line").removeClass("footer-line-show");
			}

			if (y_scroll_pos > uploadedImageHeight - (descriptionHeight/1.5)){
				$(".container-div-upload-text").addClass("vision-tags-on-scroll");
			}
			if (y_scroll_pos < uploadedImageHeight - (descriptionHeight/1.5)){
				$(".container-div-upload-text").removeClass("vision-tags-on-scroll");
			}
			if (y_scroll_pos > uploadedImageHeight - (descriptionHeight/4)){
				$(".container-div-upload-text").removeClass("vision-tags-on-scroll");
			}
			if (y_scroll_pos < uploadedImageHeight - (descriptionHeight/4) && y_scroll_pos > uploadedImageHeight - (descriptionHeight/1.5)){
				$(".container-div-upload-text").addClass("vision-tags-on-scroll");
			}

			if (y_scroll_pos > uploadedImageHeight + (textHeight/4)){
				$("#returned-text-one").removeClass("return-text-hide");
			}
			if (y_scroll_pos < uploadedImageHeight + (textHeight/4)){
				$("#returned-text-one").addClass("return-text-hide");
			}
			// console.log(uploadedImageHeight + (textHeight/1.5));
			if (y_scroll_pos > uploadedImageHeight + textHeight - (textHeight/1.75)){
				$("#returned-text-one").addClass("return-text-hide");
			}
			if ((y_scroll_pos < uploadedImageHeight + textHeight - (textHeight/1.75)) && (y_scroll_pos > uploadedImageHeight + (textHeight/4))){
				$("#returned-text-one").removeClass("return-text-hide");
			}
		});
	}
}


function uploadFunction(){
	setTimeout(function(){
		$(".loader").hide();
		$("#upload").show();
		resizeMainReturn();
		onScrollForUpload();
	},3000);
}

var clicked = false; 

$("#file-button").on("click", function(){
	if (clicked === false){
		console.log('click');
		clicked = true;
		intro = false;
		$(".start-text").addClass("hide");
		$("#fileInput").change(function(){
			$("#intro").hide();
			// $("#upload").show();
			$(".loader").show();
			setTimeout(function(){
				sendUploadedImage($('#fileInput'));
				uploadFunction();
			},300);
		});
	}
});


$(".mocp-image-one").on("click", function(){
	$(".mocp-image-one").addClass("container-div-clicked");
    $("#tags-one").removeClass("flip");
    setTimeout(function(){
		imgOne = true;
	}, 500);
});


function backArrowOne(){
	setTimeout(function(){
		// $("#tags-one").addClass("flip");
		$(".mocp-image-one").removeClass("container-div-clicked");
	}, 100);
}

function backArrowTwo(){
	setTimeout(function(){
		// $("#tags-two").addClass("flip");
		$(".mocp-image-two").removeClass("container-div-clicked");
	}, 100);
}

function addTagOne(){
	$("#add-tag-one").addClass("button-animation");
	setTimeout(function(){
		var addTagImageOne = prompt("Add a tag:");
		$("#add-tag-one").removeClass("button-animation");
		setTimeout(function(){
			backArrowOne();
			imgOne = false;
		}, 400);
	},500);
}

function addTagTwo(){
	$("#add-tag-two").addClass("button-animation");
	setTimeout(function(){
		var addTagImageTwo = prompt("Add a tag:");
		$("#add-tag-two").removeClass("button-animation");
		setTimeout(function(){
			backArrowTwo();
			imgTwo = false;
		}, 400);
	},500);
}

$(".bug-report").on("click", function(){
	$(".bug-report").addClass("bug-report-click");
	$(".bug-report-validation").hide();
	setTimeout(function(){
		if (windowWidth <= 450){
			var bugDescription = prompt("Tell us about your bug - be sure to include what browser and what device the error occured on.");
			$(".bug-report").removeClass("bug-report-click");
			$(".text-validation").css("opacity", 1);
		}
	}, 700);
});

$("#about").on("click", function(){
	$("#about").addClass(".button-clicked");
	setTimeout(function(){
		window.open('http://www.mocp.org/tagging-project');
	},500);
});


