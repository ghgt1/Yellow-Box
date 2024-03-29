# :clapper: OMDB API를 활용한 영화 검색 사이트 노랑박스 🗂

패스트캠퍼스에서 진행한 OMDB API를 활용 영화 검색 사이트 제작 프로젝트입니다.

##### (참고) [리액트 버전](https://github.com/ghgt1/yellow-box-react)으로 다시 만들어 보았습니다.

## 배포주소

데모를 [여기서](https://yellow-box-jyroh.netlify.app/) 보실수 있습니다 

## 설치법

```shell
$ git clone {주소복사}
$ npm install
$ npm init-y
$ npm i -D parcel
$ npm i parcel-resolver-ignore -D
$ npm i @parcel/transformer-sass
$ npm i parcel-reporter-static-files-copy
$ npm run dev
```

## 기간

- 2022/10/31 ~ 2022/11/15
- 리팩토링 : 2022/11/26 ~ 2022/11/27

## 사용 기술 스택

- Programming

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SASS&logoColor=white"> <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JAVASCRIPT&logoColor=white">

- Deploy

<img src="https://img.shields.io/badge/NETLIFY-00C7B7?style=for-the-badge&logo=NETLIFY&logoColor=white">

- Etc

<img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"> <img src="https://img.shields.io/badge/PARCEL-8DD6F9?style=for-the-badge&logoColor=white"> 

## 주요 구현 사항

- SPA구현 연습을 해보고자, `hashchange`이벤트를 사용하여 간단한 라우터 동작을 통해 싱글 페이지로 구성을 했습니다.
- 영상 종류별 검색기능을 버튼으로 구현하였습니다.
- 연도별 검색기능이 아닌, 시대별 검색기능을 구현하여 10년단위로 접근할수있게 구현을 했습니다.
- 모든 렌더링 과정에 로딩 애니메이션을 추가하여 사용성을 향상시켰습니다.
- 결과 페이지 상단에 검색 결과의 개수와 카테고리를 출력해주었습니다.
- 무한스크롤 기능을 사용하여 영화를 추가적으로 렌더링하게 구성하였습니다.
- 다양한 디바이스에 대응할수있게 반응형으로 디자인을 하였습니다.
- 여러번의 테스트를 통하여 다양한 에러 핸들링에 공들였습니다.
- JS 모듈화를 통해 가독성과 유지보수가 용이하게 구성하였습니다.

## 요구사항

### :exclamation: 필수

- [x] 영화 제목으로 검색 가능하고 검색된 결과의 영화 목록이 출력돼야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 스타일(CSS) 라이브러리나 프레임워크 사용은 자유입니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### :grey_question: 선택

- [ ] 한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.
- [ ] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [x] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [x] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있도록 만들어보세요.
- [x] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 영화 상세정보 포스터를 고해상도로 출력해보세요.(실시간 이미지 리사이징)
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [x] 영화와 관련된 기타 기능도 고려해보세요.

## 어려웠던 부분 && 아쉬웠던 부분

- 로딩이 진행되는동안 `스켈레톤 UI`를 통해 사용자 편의를 향상시키고 싶었으나 적용이 잘 되지 않았습니다.
- `History API`를 사용해 페이지 분리를 하고 싶었으나 해쉬값과 `hashchange`이벤트만을 사용해 정확하게 구현하지 못했습니다.
- 비동기 지식이 아직 부족해, async-await 처리 중 발생하는 예외사항에 대처하는게 힘들었습니다. 우선은 최대한 조건문으로 에러 핸들링을 해주었습니다.

## 피드백 받고 싶은 부분

- 전체적인 코드의 가독성과 html의 구조
- 재사용 가능한 코드가 있는지, 불필요하게 낭비된 코드가 있는지
- `media query`를 이용하여 반응형 구성을 할때, 우선순위에서 밀리는 값들에 대응하고자 `!important`를 부여하는것이 맞는지?
- 스켈레톤 UI는 로딩중에 img들이 있을곳에다가 출력을해준후, 로딩에 끝나면 img들이 덮어씌우는 방식인지?
- 실무에서는 SPA구성을 어떻게하는지
- 어떠한 조언과 피드백도 좋습니다!

## 리팩토링 진행

- CSS에서 `!important`로 우겨넣은 우선순위를 nesting으로 변경하여 해결하였습니다.
- 연도와, type 종류를 button으로 클릭 이벤트를 감지하여 구현을했었는데 이것을 `input radio`로 변경함으로서 JS코드를 획기적으로 줄였습니다.(btn.js 삭제)
- detail 페이지와 비슷하게, url에다가 영화 input정보를 삽입해주어 페이지 로직의 통일성을 주었습니다(쿼리문의 형태는 아닙니다).
- `searchMovies()`함수가 굉장히 길어서 유지보수와 가독성에서 단점이 있었는데, 화면(상부) 렌더부분을 따로 함수로 분리하였습니다.
- input에서 type을 선택하지 않았을때 기본값이 movie가 아닌, 모든 종류(ALL)를 검색할수있게 수정하였습니다.
- api key가 git에 공개되는것을 막기위해 `.env` 를 활용하여 환경변수로 숨겨주었습니다.
- 그외에 자잘하게 코드를 수정하였습니다.

#### 리팩토링 중 문제점

- `imgEl.onerror`가 재활용되는 코드여서 말씀해주신대로 따로 함수로 만들어봤는데 잘 동작하지 않는 문제가 있었습니다. 자세한것은 `search.js`에 주석으로 표시해두었습니다.
