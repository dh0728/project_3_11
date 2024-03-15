var container = document.getElementsByClassName("container");
var modal = document.querySelector(".modal");
var modalImg = document.querySelector(".modalImage");
var modalText = document.querySelector(".modalText");

// 클릭
var images = document.querySelectorAll("#myPosts .postImg");
console.log(">>",images)
images.forEach((img) => {
  img.onclick = function () {
    modal.style.border = "3px solid black";
    modal.style.display = "block";
    modalImg.src = this.src;
    modalText.innerHTML = this.getAttribute("postText");
  };
});

// 닫기
var span = document.querySelector(".close");

span.onclick = function () {
  modal.style.display = "none";
};

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

var deleteButton = document.getElementById("deleteButton");

deleteButton.onclick = function () {
  if (confirm("정말 삭제하시겠습니까?")) {
    alert("삭제되었습니다.");
  }
};
