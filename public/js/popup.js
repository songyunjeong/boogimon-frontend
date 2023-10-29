function boogicard() {
    document.querySelector(".card-popup").classList.add("show");
}

function cardclose() {
    document.querySelector(".card-popup").classList.remove("show");
}

function showmap() {
    document.querySelector(".map-popup").classList.add("show");
}

function mapclose() {
    document.querySelector(".map-popup").classList.remove("show");
}

document.querySelector("#boogicard").addEventListener("click", boogicard);
document.querySelector("#showmap").addEventListener("click", showmap);
document.querySelector("#cardclose").addEventListener("click", cardclose);
document.querySelector("#mapclose").addEventListener("click", mapclose);



// 이미지 저장 버튼 클릭 시 모달 내용을 이미지로 저장
document.getElementById('downloadImage').addEventListener('click', function() {
    // HTML2Canvas를 사용하여 모달 내용을 이미지로 변환
    html2canvas(document.querySelector('.popup')).then(function(canvas) {
        var fileName = prompt("이미지 파일 이름을 입력하세요", "modal_image.png");
        if (fileName) {
            // 새로운 링크를 생성하여 이미지를 다운로드
            var a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = fileName;
            a.click();
        }
    });
});

