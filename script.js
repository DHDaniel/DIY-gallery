$(function() {

var idPhoto = 1;
var paused = true;

var interaction_text = "<strong>Hint (interacting with the website):</strong> to advance in the gallery, click on the right side of the image, or the right side button. To go back (or left), click on the left side of the image, or the left side button. To pause the slideshow, click on the center of the image. To go back and edit the URLs or the title, click on the \"Go Back\" button. Also, try resizing the window, or hovering over the thumbnails, and see what happens!"

$("#interaction").html(interaction_text);

// Function that handles the submit button
$("#submit-button").click(function () {

  // Gets sources of thumbnail pictures
  var src1 = $("#url-1").val();
  var src2 = $("#url-2").val();
  var src3 = $("#url-3").val();
  var src4 = $("#url-4").val();

  // Gets title
  var title = $("#title-of-gallery").val();

  // Sets sources of pictures
  $("#1").attr("src", src1);
  $("#2").attr("src", src2);
  $("#3").attr("src", src3);
  $("#4").attr("src", src4);
  $("#big").attr("src", src1);

  // Sets title
  $("#tab-title").html(title);
  $("#web-title").html(title);

  // Shows gallery of pictures and "Go Back" button, hides submit area (without reloading page)
  $("#gallery").css("visibility", "visible");
  $("#display-img").css("visibility", "visible");
  $("#go-back-button").css("visibility", "visible");

  $("#build").css("display", "none");

  // Starts slideshow
  paused = false;
});

// Handles the go back button shown in the gallery
$("#go-back").click(function () {
  $("#build").css("display", "");

  $("#gallery").css("visibility", "hidden");
  $("#display-img").css("visibility", "hidden");

  $("#go-back-button").css("visibility", "hidden");

  paused = true;
});

// Controls what to do based on width of window
$(window).resize(function () {

  // Sets page to small version, without buttons
  if ($(window).width() < 1024) {

    $(".button-left").parent().css("display", "none");
    $(".button-right").parent().css("display", "none");

  }
// Sets page to big version, with buttons
  else {
    $(".button-left").parent().css("display", "");
    $(".button-right").parent().css("display", "");
  };
});

// Handles clicking of thumbnails to show in the big image
$(".thumbnail").click(function () {
  source = this.src;
  idPhoto = this.id;
  $("#big").attr("src", source);
});

// Turns thumbnail images to color when hovering over them
$(".thumbnail").hover(function () {
  $(this).css("-webkit-filter", "grayscale(0%)");
}, function () {
  $(this).css("webkit-filter", "grayscale(100%)");
});

// Handle buttons
$(".button-left").click(function () {
  idPhoto--;
  if (idPhoto == 0) {
    idPhoto = 4;
  }
  $("#big").attr("src",
      $("#" + idPhoto).attr("src"));
});

$(".button-right").click(function () {
  idPhoto++;
  if (idPhoto == 5) {
    idPhoto = 1;
  }
  $("#big").attr("src",
      $("#" + idPhoto).attr("src"));
});

// Click in middle: Sets "paused" to its opposite - functions as a play/pause button, sort of.
// Click right: moves right
// Click left: moves left
$("#big").click(function(event) {
  if (event.offsetX < $(this).width() * 0.3) {
    idPhoto--;
    if (idPhoto == 0) {
      idPhoto = 4;
    };
    $("#big").attr("src",
        $("#" + idPhoto).attr("src"));
  } else if (event.offsetX > $(this).width() * 0.7) {
    idPhoto++;
    if (idPhoto == 5) {
      idPhoto = 1;
    }
    $("#big").attr("src",
        $("#" + idPhoto).attr("src"));
  } else {
    paused = !paused;
  };
});

// The function is called every 2000 miliseconds (two seconds)
// It only executes if paused equals false.
setInterval(function () {
  if (paused == false) {
  $(".button-right").click();
  };
}, 2000);

})
