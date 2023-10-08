/* 팝업창 보여주기 숨기기 기능 */
const addBox = document.querySelector(".add-box"); // 메모추가 박스
const popupBox = document.querySelector(".popup-box"); // 팝업 박스
const closeIcon = popupBox.querySelector('header i'); // 팝업창 닫기 아이콘
 
addBox.addEventListener('click', () => {
  // 메모 추가를 클릭하면 팝업 박스에 .show가 추가
  popupBox.classList.add('show');
})

closeIcon.addEventListener('click', () => {
  // 팝업창의 X버튼을 클릭하면 팝업 박스에 .show를 제거
  popupBox.classList.remove('show');
})