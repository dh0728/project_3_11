
function loadFile(input) {
  let file = input.files[0]; // 선택된 파일 가져오기

  let newImage = document.createElement("img"); //새 이미지 추가

  //이미지 source 가져오기
  newImage.src = URL.createObjectURL(file);
  newImage.id = "img-id"
  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newImage.style.objectFit = "cover";

  //이미지를 imageShow div에 추가
  let container = document.getElementById('imageShow');
  container.innerHTML = '';
  container.appendChild(newImage);
}
// '다음' 버튼 클릭 시 페이지를 네비게이션하는 JavaScript 코드
let next= document.getElementById("upload").addEventListener("click", function() {
  location.href = "views/uploadText"; 
});