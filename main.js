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

/* 메모 추가기능 */
const addBtn = popupBox.querySelector('button'); //추가하기 버튼
const titleTag = popupBox.querySelector('input'); //제목칸
const descTag = popupBox.querySelector('textarea'); //내용칸

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// notes가 클릭이벤트 안에 있을 경우, 클릭마다 빈 배열로 초기화되는 문제가 발생한다.
//이를 해결하고자 notes를 전역으로 변수를 만들었다.
// 로컬스토리지에서 notes에 접근하고, notes가 없을 경우에는 빈 배열을 반환한다.
const notes = JSON.parse(localStorage.getItem('notes') || "[]");

addBtn.addEventListener('click', (e) => {
  // form 태그 새로고침 방지
  e.preventDefault();

  // 제목, 내용칸 변수 생성
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  if(noteTitle || noteDesc) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()]; // 월
    let day = dateObj.getDate(); // 일
    let year = dateObj.getFullYear(); // 연

    // 노트 데이터 객체 생성
    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`
    }

    //notes에 생성된 noteInfo 객체를 배열 안에 추가함
    notes.push(noteInfo);

    // 로컬스토리지에 notes 배열을 저장함
    // 로컬스토리지에 객체를 저장하기 위해서는 문자화를 해줘야함
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // closeIcon에 클릭이벤트가 동작하게 함
    closeIcon.click();
    // 노트 화면에 렌더링하기
    showNotes();
  }
})

/* 로컬스토리지 렌더링에 담긴 데이터 불러오기 */

function showNotes() {
  // notes 배열에 담긴 noteInfo 데이터 접근하기
  notes.forEach((note) => {
    // 노트 컴포넌트 생성
    let liTag = `
      <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
          </div>
          <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
              <i class="uil uil-ellipsis-h"></i>
              <ul class="menu">
                <li><i class="uil uil-pen"></i>Edit</li>
                <li><i class="uil uil-trash"></i>Delete</li>
              </ul>
            </div>
          </div>
        </li>
    `;
    // 노트 컴포넌트 생성 - addBox의 뒤로 liTag를 추가하라
    addBox.insertAdjacentHTML("afterend", liTag);
  })
}