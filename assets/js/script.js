
var acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      this.getElementsByClassName('plus')[0].getElementsByClassName('fa-plus')[0].style.display = 'block'
      this.getElementsByClassName('plus')[0].getElementsByClassName('fa-minus')[0].style.display = 'none'
    } else {
      panel.style.display = "block";
      this.getElementsByClassName('plus')[0].getElementsByClassName('fa-plus')[0].style.display = 'none'
      this.getElementsByClassName('plus')[0].getElementsByClassName('fa-minus')[0].style.display = 'block'
    }
  });
}
