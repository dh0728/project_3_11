// 클릭
var container = document.getElementsByClassName("container");
var images = document.querySelectorAll(`#myPosts .postImg`);
console.log(">>",images)
images.forEach((img,index) => {
  var modal = document.querySelector(`#modal${index}`);
  var modalImg = document.querySelector(`#modalImage${index}`);
  var modalText = document.querySelector(`#modalText${index}`);
  img.onclick = function () {
    modal.style.border = "3px solid black";
    modal.style.display = "block";
    // modalImg.src = this.src;
    modalText.innerHTML = this.getAttribute("postText");
  };
  //닫기
  var span = modal.querySelector(".close");

  span.onclick = function () {
    modal.style.display = "none";
  };
  var deleteButton = document.getElementById(`deleteButton${index}`);

    deleteButton.onclick = function () {
      var button= this;
      if (confirm("정말 삭제하시겠습니까?")) {
        fetch(`http://localhost:3000/home/mypage`, {
          method: 'POST',
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            postID:button.dataset.id
          })
        })
        .then(response =>{
          if(response.ok){
            alert("삭제되었습니다.");
            //화면 자동 새로고침
            location.reload();
          }else{
            alert(`${button.dataset.id}`);
          }
        })
        .catch(error=>{
          console.error(error)
        })
      }
    };
  // function deleteRequest(button){
  //   var postID = button.dataset.id
  //   if (confirm("정말 삭제하시겠습니까?")) {
  //           fetch(`http://localhost:3000/home/mypage/${postID}`, {
  //             method: 'DELETE'
  //           })
  //           .then(response =>{
  //             if(response.ok){
  //               alert("삭제되었습니다.");
  //               //화면 자동 새로고침
  //               location.reload();
  //             }else{
  //               alert(`${postID}`);
  //             }
  //           })
  //           .catch(error=>{
  //             console.error(error)
  //           })
  //         }
  //   };
  
});




//예전꺼
// var container = document.getElementsByClassName("container");
// var modal = document.querySelector(".modal");
// var modalImg = document.querySelector(".modalImage");
// var modalText = document.querySelector(".modalText");

// // 클릭
// var images = document.querySelectorAll(`#myPosts .postImg`);
// console.log(">>",images)
// images.forEach((img) => {
//   img.onclick = function () {
//     modal.style.border = "3px solid black";
//     modal.style.display = "block";
//     modalImg.src = this.src;
//     modalText.innerHTML = this.getAttribute("postText");
//   };
// });

// // 닫기
// var span = document.querySelector(".close");

// span.onclick = function () {
//   modal.style.display = "none";
// };

// var deleteButton = document.getElementById("deleteButton");

// deleteButton.onclick = function () {
//   if (confirm("정말 삭제하시겠습니까?")) {
//     alert("삭제되었습니다.");
//   }
// };
