// 호버 상태에 따른 이미지 맵핑 객체
const starImageSourceMap = {
    empty: './src/images/icon_empty_star.png',
    half: './src/images/icon_half_star.png',
    full: './src/images/icon_star.png'
}

class StarPoint{
    constructor(){
        this.starContentElement = document.querySelector('.content-star');
        this.starBackgroundElement = this.starContentElement.querySelector('.star-background');
        this.starImages = this.starBackgroundElement.querySelectorAll('img');
        this.starPointResetButton = this.starContentElement.querySelector('.icon-remove-star');
        this.lockedStarPoint = false; // 별점이 고정되어 있는지 아닌지를 알려주는 변수
        this.starText = document.querySelector('.star-average');
    }

    setUp(){
        this.bindEvents();
    }

    // 별점을 고정된 상태로 만들어주는 함수
    lockStarPoint(){
        this.lockedStarPoint = true;
    }
    // 별점을 고정되지 않은 상태로 만들어주는 함수
    unlockStarPoint(){
        this.lockedStarPoint = false;
    }
    // 별점의 상태를 반환하는 함수
    isLockedStarPoint(){
        return this.lockedStarPoint;
    }

    //고정된 별점을 글자로 나오게 하는 함수
    starTexting(starPointIndex, isOverHalf){
        console.log(starPointIndex);
        const cnt = (isOverHalf ? starPointIndex+1 : starPointIndex + 0.5);
        this.starText.innerText= `별점평균 : ${cnt}`;
    }

    bindEvents(){
        // 마우스 무브 이벤트
        this.starBackgroundElement.addEventListener('mousemove', (e) => {
            // 별점이 고정되어있다면 이벤트 핸들링 중지
            if(this.isLockedStarPoint()){
                return;
            }

            const { target, offsetX: currentUserPoint } = e; //offsetX : 타겟 요소에서의 마우스 포인터의 x위치 반환
            const { point } = target.dataset;
            let starPointIndex = parseInt(point, 10) -1;

            // 0번째 인덱스가 starimageClientRect에 들어간다,target.getClientRects()[0]과 동일
            const [starimageClientRect] = target.getClientRects(); // 요소의 좌표와 크기에 대한 정보를 반환
            const starImageWidth = starimageClientRect.width;
            const isOverHalf = starImageWidth/2 < currentUserPoint; // 마우스 포인터의 위치가 중간을 넘었는지

            this.starTexting(starPointIndex, isOverHalf);
            this.renderStarPointImages({drawableLimitIndex: starPointIndex, isOverHalf});

        });
        // 별점을 클릭하면 해당 별점이 고정된다.
        this.starBackgroundElement.addEventListener('click', () =>{
            this.lockStarPoint();
        });

        // x 버튼을 누르면 별점 고정이 해제된다.
        this.starPointResetButton.addEventListener('click', () => {
            this.unlockStarPoint();
            this.resetStarPointImages();
        });

        // 저장하지 않은 별점에서 마우스아웃시 별점 초기화
        this.starBackgroundElement.addEventListener('mouseout', () => {
            !this.isLockedStarPoint() && this.resetStarPointImages();
        });
    }

    // 마우스 무브에 따른 별 색칠해주는 함수
    renderStarPointImages(payload ={}){
        const {drawableLimitIndex = -1, isOverHalf = false} = payload; // 초기값 할당 
        // NodeList !== Array  (IE에서는 불가능)
        // call을 통해 함수를 호출하는 객체를 array에서 NodeList 객체로 재할당한다.
        Array.prototype.forEach.call(this.starImages, ((star, idx) => {
            // 현재 순환 순서보다 마우스가 호버된 별의 인덱스가 크다면 full 
            let imgSrc = idx < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;

            // 현재 순환 순서와 마우스가 호버된 별의 인덱스가 같은 경우
            if(drawableLimitIndex === idx){
                imgSrc = isOverHalf ? starImageSourceMap.full : starImageSourceMap.half;
            }

            // 현재 순환중인 이미지에 src 값을 할당
            star.src = imgSrc;
        }));
    }

    // 별점 제거 함수
    resetStarPointImages(){
        this.renderStarPointImages();
    }
}
export default StarPoint;