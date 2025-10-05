# 예원이의 첫 생일 초대장 🎉

예원이의 첫 생일을 축하하는 현대적이고 모던한 웹 초대장입니다.

## 🎨 특징

- **현대적인 디자인**: 그라데이션과 부드러운 애니메이션
- **반응형 웹**: 모바일과 데스크톱 모두 최적화
- **인터랙티브 요소**: 갤러리 모달, RSVP 폼, 스크롤 애니메이션
- **한국어 지원**: Noto Sans KR 폰트 사용

## 📱 섹션 구성

1. **메인**: 애니메이션이 포함된 타이틀과 이벤트 정보
2. **인사말**: 따뜻한 초대 메시지
3. **달력**: 이벤트 날짜와 캘린더 위젯
4. **타임라인**: 예원이의 성장 과정
5. **갤러리**: 사진 갤러리 (모달 기능)
6. **오시는 길**: 장소 정보와 지도 링크
7. **방명록**: 참석 여부 전달 폼

## 🚀 GitHub Pages 배포

이 프로젝트는 GitHub Pages를 통해 자동으로 배포됩니다.

### 배포 방법

1. 이 저장소를 GitHub에 푸시
2. Settings > Pages에서 소스를 'Deploy from a branch'로 설정
3. Branch를 'main'으로 선택
4. Save 버튼 클릭

### 접속 URL

배포 완료 후 다음 URL로 접속 가능합니다:
`https://[사용자명].github.io/yw-first-birthday`

## 🛠️ 커스터마이징

### 사진 교체
`index.html`의 갤러리 섹션에서 placeholder 이미지를 실제 사진으로 교체하세요.

### 정보 수정
다음 정보들을 실제 정보로 수정하세요:
- 이벤트 날짜 및 시간
- 장소 정보
- 부모님 이름
- 연락처 정보

### 지도 API 설정
실제 지도를 표시하려면 카카오맵 API 키를 설정해야 합니다:

1. [카카오 개발자 센터](https://developers.kakao.com/)에서 계정 생성
2. 애플리케이션 등록 후 JavaScript 키 발급
3. `index.html`의 11번째 줄에서 `YOUR_KAKAO_MAP_API_KEY`를 실제 키로 교체

```html
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=실제_API_키"></script>
```

### 색상 변경
`styles.css`에서 CSS 변수를 수정하여 색상을 변경할 수 있습니다.

## 📝 사용된 기술

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션, 그라데이션
- **JavaScript (ES6+)**: 모달, 폼 처리, 스크롤 이벤트, 지도 API
- **카카오맵 API**: 실제 지도 표시 및 마커
- **Font Awesome**: 아이콘
- **Google Fonts**: Noto Sans KR

## 🎯 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 📄 라이선스

이 프로젝트는 개인 사용을 위한 것입니다.

---

💖 예원이의 첫 생일을 축하합니다! 💖