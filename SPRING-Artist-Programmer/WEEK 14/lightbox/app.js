
$(document).ready(function(){
  
  const lightbox = $(".lightbox");
  const overlay = $("#lightbox-overlay");
  const overlayImage = $("#lightbox-overlay-image");
  const close = $("#close");
  
  lightbox.click(function(){
    
    // $(this) corresponds to whatever DOM element we just clicked on
    let src = $(this).children("img").attr("src");
    console.log(src)
    
    overlayImage.attr("src", src);
    overlay.show();
    
  });
  
  close.click( () => {
    overlay.hide();
  });
  
  overlay.click( () => {
    overlay.hide();
  });
  
});