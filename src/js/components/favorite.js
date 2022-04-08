class Favorite{
    // 생성자
    constructor() {
        this.favoriteElement = document.querySelector(".content-favorite");
    }

    // bindEvents()를 실행하는 함수
    setUp(){
        this.bindEvents();
    }
    
    // 이벤트 리스너를 처리하는 함수
    bindEvents() {
        this.favoriteElement.addEventListener('click', (event) => {
            const cPath = event.composedPath();
            const element = cPath.find(element => element.tagName === 'BUTTON');

            if(!element) {
                return;
            }
            element.classList.toggle('on');
        });
    }
}

export default Favorite;