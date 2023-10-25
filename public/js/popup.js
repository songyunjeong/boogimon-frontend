document.addEventListener('DOMContentLoaded', function() {
    // 버튼 클릭 시 팝업 창 열기
    var popupButton = document.getElementById('popup-button');

    if (popupButton) {
        popupButton.addEventListener('click', function() {
            // 팝업 창 열기
            var popupWindow = window.open('/public/views/popup_card.html', 'popupWindow', 'width=500, height=700');
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // 버튼 클릭 시 팝업 창 열기
    var popupButton = document.getElementById('popup-button2');

    if (popupButton) {
        popupButton.addEventListener('click', function() {
            // 팝업 창 열기
            var popupWindow = window.open('/public/views/popup_address.html', 'popupWindow', 'width=500, height=700');
        });
    }
});