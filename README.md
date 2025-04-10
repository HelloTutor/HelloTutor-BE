
## 프로젝트명

>**HelloTutor**
> 독학으로 공부하는 학생, 막히는 문제가 있거나 질문할 대상이 없는 학생
>
> 재능을 나누고 수익도 얻고 싶은, 멘토가 되고 싶은 tutor
>
> 커뮤니티 게시판과 질문게시판으로 원하는 질문과 답을 얻으며 소통

## :pushpin: 문서

- 프로젝트 명세서(AWS): [프로젝트_명세서.pdf](https://github.com/HelloTutor/HelloTutor-BE/files/14266887/_.pdf) 
- ERD: https://www.erdcloud.com/d/qM68dDtFG7oyzrpL9
- API문서: https://documenter.getpostman.com/view/28488382/2s9Yyy8ycG

## :pushpin:사용 기술
- OS: Window
- Back-End: JavaScript, Express.js
- DB: MySql
- TEST: jest
- CLOUD: AWS EC2, RDS
    
## :pushpin: 프로젝트 내용 

### 1. 회원가입
- 이메일: DB에 중복 이메일이 있는지 확인
- 비밀번호: 정규식을 통해 비밀번호 정규화(bcrypt를 이용해 암호화 한 후 DB에 저장)
- 비밀번호 찾기: mailer를 사용하여 email전송 후 비밀번호 수정

### 2. 로그인
- JWT를 이용한 로그인
- passport를 이용하여 OAuth2를 구현(구글 로그인)

### 3. 게시판
**자유게시판, 질문하기게시판**
- 페이지 네이션, 검색, sort, 이미지 업로드, 좋아요, 댓글

**튜터게시판**
- 리뷰, 별점, 찜하기

### 4. 마이페이지
**계정설정**
  - 프로필사진, 닉네임, 계정탈퇴

**질문하기**
  - 작성글 내역

**튜터찾기**
  - 찜한 tutor

**자유게시판**
  - 작성글 / 댓글 내역

**튜터게시판(튜터)**
 - 튜터정보, 프로필사진

------------------------


