var container = document.getElementById("container");
var modal = document.getElementById("modal");
var modalImg = document.getElementById("modalImage");
var modalText = document.getElementById("modalText");

// 클릭
var images = document.querySelectorAll("#myPosts img");
images.forEach(img => {
  img.onclick = function(){
    modal.style.display = "block";
    // 데이터베이스에서 받아오기
    modalImg.src = this.src;
    modalText.innerHTML = this.src;
  }
});

// 닫기
var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
  modal.style.display = "none";
}

// window.onclick = function(event) {
//   if (event.target == container) {
//     modal.style.display = "none";
//   }
// }

var deleteButton = document.getElementById("deleteButton");

deleteButton.onclick = function() {
  confirm('정말 삭제하시겠습니까?')
  
}
