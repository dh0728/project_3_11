// 클릭
// container 제가 예전에 써놓고 함수에서 사용안해서 주석처리했어용
// 혹시 사용하시면 말해주세요!! 왜냐면 ejs를 건드렸거든여..
// 수정 전 파일 가지고 있어서 걱정 안 하셔도 됩니다요 ㅋㅋ
// mypage js는 하고 계신 거 같아서 괜히 충돌날까봐 안 건드렸구여 css만 하고 있어요
// 사실 제가 할 건 없긴 하죠 너무 버스 승객인 거 같아 눈치가 보이지만.. 죄송하고 또 감사합니다
// 열심히할게요 좋은 주말 보내세여 -다현
// 아닙니다 충분히 열심히 잘해주고 있어요. 빈말이 아닙니다. 저 눈치 준적 없어요...죄송해하지마세요.. 너무 충분하게 
// 잘하고 계십니다...로고도 너무 예쁩니다. 저도 프사하고 싶네요.ㅋㅋㅋ  
// 저도 감사합니다. 이렇게 잘 만들어주셔서요ㅠㅠ진심입니다. 일단 하고 병합했는데 달라진거 있는지 확인해보시고 말해주세용-동현 
// var container = document.getElementsByClassName("container");
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
