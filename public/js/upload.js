
// function loadFile(input) {
//   let file = input.files[0]; // 선택된 파일 가져오기

//   let newImage = document.createElement("img"); //새 이미지 추가

//   //이미지 source 가져오기
//   newImage.src = URL.createObjectURL(file);
//   newImage.id = "img-id"
  // newImage.style.width = "100%";
  // newImage.style.height = "100%";
  // newImage.style.objectFit = "cover";

//   //이미지를 imageShow div에 추가
//   let container = document.getElementById('imageShow');
//   container.innerHTML = '';
//   container.appendChild(newImage);
// }

let currentImg = -1; // 현재 보여지는 이미지의 인덱스
let totalImages = 0; // 총 이미지 수
const maxImageCount = 10; // 최대 선택 가능한 이미지 수

function loadFiles(input) {

  let imageShow = document.getElementById('imageShow');
  let fileInput = input;

  // 최대 선택 가능한 이미지 수 체크
  if (totalImages + input.files.length > maxImageCount) {
    alert(`${maxImageCount}장까지 선택 가능합니다.`);
    return;
  }
  
  for (let i = 0; i < input.files.length; i++) {
      let file = input.files[i];
      let reader = new FileReader();
      reader.onload = function(e) {
          if (currentImg >= 0) {
              document.getElementById('img-' + (currentImg + 1)).style.display = 'none';
          }

          let img = new Image();
          img.src = e.target.result;
          img.id = 'img-' + (++totalImages);
          currentImg = totalImages - 1;

          imageShow.appendChild(img);
          img.style.display = 'block';
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";

          updateImageCounter(currentImg + 1, totalImages);
          updateFilePath(fileInput.value);
      };
      reader.readAsDataURL(file);
  }
}

function showNextImage() {
    if (totalImages > 1) {
        document.getElementById('img-' + (currentImg + 1)).style.display = 'none'; // 현재 이미지 숨김
        currentImg = (currentImg + 1) % totalImages; // 다음 이미지 인덱스 계산
        document.getElementById('img-' + (currentImg + 1)).style.display = 'block'; // 다음 이미지 보임
        updateImageCounter(currentImg + 1, totalImages); // 이미지 카운터 업데이트
    }
}

function showPreviousImage() {
    if (totalImages > 1) {
        document.getElementById('img-' + (currentImg + 1)).style.display = 'none';
        currentImg = (currentImg - 1 + totalImages) % totalImages;
        document.getElementById('img-' + (currentImg + 1)).style.display = 'block';
        updateImageCounter(currentImg + 1, totalImages);
    }
}

function updateImageCounter(current, total) {
    document.getElementById('imageCounter').textContent = `${current} / ${total}`;
}
