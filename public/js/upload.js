let currentImg = -1; // 현재 보여지는 이미지의 인덱스
let totalImages = 0; // 총 이미지 수
const maxImageCount = 10; // 최대 선택 가능한 이미지 수

function loadFiles(input) {
    let imageShow = document.getElementById('imageShow');
    let fileInput = input;

    // 최대 선택 가능한 이미지 수
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
        document.getElementById('img-' + (currentImg + 1)).style.display = 'none';
        currentImg = (currentImg + 1) % totalImages;
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

function deleteCurrentImage() {
    if (currentImg >= 0 && totalImages > 0) {
        document.getElementById('img-' + (currentImg + 1)).remove();
        
        // 남은 이미지들
        for (let i = currentImg + 2; i <= totalImages; i++) {
            document.getElementById('img-' + i).id = 'img-' + (i - 1);
        }

        // 이미지 수 업데이트
        totalImages--;

        // 이미지가 아직 남아 있다면
        if (totalImages > 0) {
            if (currentImg === totalImages) { // 마지막 이미지를 삭제한 경우, 인덱스를 하나 줄임
                currentImg--;
            }
            
            // 현재 인덱스의 이미지만 표시
            for (let i = 1; i <= totalImages; i++) {
                document.getElementById('img-' + i).style.display = 'none';
            }
            document.getElementById('img-' + (currentImg + 1)).style.display = 'block';

            updateImageCounter(currentImg + 1, totalImages);
        } else {
            // 모든 이미지가 삭제된 경우 카운터 초기화
            currentImg = -1;
            updateImageCounter(0, 0);
        }
    }
}

function updateImageCounter(current, total) {
    document.getElementById('imageCounter').textContent = `${current} / ${total}`;
}
