<template>
  <!--로그인 모달 창-->
  <div class="Modal_background" v-if="showLoginModal">
    <div class="Modal_container">
      <button class="closemodal_icon" @click="closeLoginModal">
        <img src="../assets/x.svg" style="width: 30px; height: 30px" />
      </button>
      <img src="../assets/BB.svg" class="modal_logo" />
      <div class="title_box">필요한 건 BUY! 필요없는 건 BYE!</div>
      <div class="subtitle_box">쉽고 빠르게 시작하세요</div>
      <div class="button_container">
        <button class="login_button" @mouseover="hoverBackground('kakao')" @mouseleave="hoverBackground('')"
          :style="isHovered === 'kakao' ? { backgroundColor: 'rgb(60, 52, 31)', color: 'white' } : {}">
          <div class="button_background"></div>
          카카오로 이용하기
        </button>
        <button class="login_button" @mouseover="hoverBackground('naver')" @mouseleave="hoverBackground('')"
          :style="isHovered === 'naver' ? { backgroundColor: 'rgb(3, 199, 90)', color: 'white' } : {}">
          <div class="naver_button button_background"></div>
          네이버로 이용하기
        </button>
        <a class="id_button" href="LogIn" @mouseover="hoverBackground('idpw')" @mouseleave="hoverBackground('')"
          :style="isHovered === 'idpw' ? { backgroundColor: 'rgb(0,0,0)', color: 'white' } : {}">
          <div class="basic_button"></div>
          ID/PW로 이용하기
        </a>
      </div>
      <div class="modal_footer">
        <p>도움이 필요하면 이메일 또는 고객센터1111-2222로 문의 부탁드립니다.<br>
          고객센터 운영시간: 09~18시 (점심시간 12~13시, 주말/공휴일 제외)</p>
      </div>
    </div>
  </div>
  <!--로그인 헤더 -->
  <div class="header_container">
    <div class="header_top">
      <!--로그인 상태 -->
      <div v-if="isLoggedIn" class="login_container">
        <div class="welcome_container">
          <span style="font-weight:700 ;">{{ nickname }}</span>
          <span style="margin-right: 10px; ">님 환영합니다!</span>
        </div>
        <div class="chat_container">
          <img src="../assets/chat-square-dots.svg" class="chat_logo">
          <span style="margin-right: 25px;">채팅하기</span>
          <span @click="performLogout">로그아웃</span>
        </div>
      </div>
      <!--로그아웃 상태 -->
      <div v-else class="login_container">
        <button class="login_text" @click="openLoginModal">
          로그인 / 회원가입
        </button>
      </div>
    </div>

    <header class="header">
      <div class="logo_container">
        <img @click="navigateToMain" src="../assets/buybye.svg" style="cursor: pointer;" alt="없음" class="logo" />
        <form>
          <div class="search_container">
            <div class="search_box">
              <input class="input_box" type="text" name="search" placeholder="검색어를 입력하세요" />
              <img src="../assets/search.svg" class="search_icon" />
            </div>
          </div>
        </form>
        <div class="list_container">
          <div class="list_box">
            <div class="list">
              <img src="../assets/bag.svg" class="list_icon" />
              <button class="list_button">중고거래</button>
            </div>
          </div>
          <div class="list_box">
            <div class="list">
              <img src="../assets/coin.svg" class="list_icon" />
              <button class="list_button">판매하기</button>
            </div>
          </div>
          <div class="list_box">
            <div class="list">
              <img src="../assets/shop.svg" class="list_icon" />
              <button class="list_button">내상점</button>
            </div>
          </div>
        </div>
      </div>

      <div class="categoly_container">
        <img src="../assets/list.svg" alt="없음" style="width: 25px; height: 25px" />
      </div>
    </header>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      showLoginModal: false, // 모달 창을 보여주는 상태 변수
      isHovered: '', // 현재 호버된 버튼의 종류를 저장
      
    };
  },
  computed:{
    ...mapState(['isLoggedIn','nickname'])
  },
  mounted() {

  },
  methods: {
    ...mapActions(['logout']),

    performLogout(){
      this.logout().then(() => {
        this.$router.push('/LogIn');
      });
    },

    openLoginModal() {
      this.showLoginModal = true; // 모달 창을 보여주는 메소드
    },
    closeLoginModal() {
      this.showLoginModal = false; // 모달 창을 닫는 메소드
    },
    hoverBackground(buttonType) {
      this.isHovered = buttonType; // 버튼 타입에 따라 현재 호버된 버튼을 설정
    },
    navigateToMain() {
      this.$router.push('/Main');
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

a {
  color: rgb(33, 33, 33);
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;

}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  width: 100%;
  border-top: 1px solid rgb(229, 229, 229);
  padding-top: 1rem;
  text-align: center;
}

.header_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  /* 혹은 최대 너비가 정해져 있다면 그 값을 사용 */
  transition: top 0.3s;
  z-index: 100;
}

.Modal_background {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  display: flex;
}

.Modal_container {
  background: rgb(247, 247, 247);
  width: 420px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 50px 0px;
  position: relative;
  padding-top: 40px;
}

.closemodal_icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  cursor: pointer;
  border: none;
}

.modal_logo {
  height: 60px;
  width: 60px;
  display: block;
  margin: auto auto 20px;
}

.title_box {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

.subtitle_box {
  line-height: 1.5;
  margin-bottom: 35px;
  text-align: center;
  font-weight: normal;
}

.button_container {
  padding: 0px 70px;
}

.login_button {
  width: 100%;
  height: 38px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 7px 0px;
  background: rgb(255, 255, 255);
  text-align: center;
  border-radius: 4px;
  margin-bottom: 12px;
  position: relative;
  border: none;
  color: black;
  font-weight: medium;
  cursor: pointer;
}

.id_button {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 38px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 7px 0px;
  background: rgb(255, 255, 255);
  text-align: center;
  border-radius: 4px;
  margin-bottom: 12px;
  position: relative;
  padding: 0;
  /* 내부 패딩 제거 */
  text-decoration: none;
  /* 밑줄 제거 */
  font-size: 13.3px;
}

.button_background {
  position: absolute;
  top: calc(50% - 12px);
  left: 35px;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-repeat: no-repeat;
}

.kakao_button {
  background-image: "~@/asserts/kakao.png";
}

.naver_button {
  background-image: "../assets/naver.png";
}

.basic_button {
  background-image: "../assets/basic.svg";
}

.modal_footer {
  padding: 2.5rem 2rem 1.5rem;
  font-size: 11px;
  line-height: 1.5;
  color: rgb(153, 153, 153);
}

.header_top {
  border-bottom: 1px solid rgb(238, 238, 238);
  height: 40px;
  align-items: center;
  display: flex;
  background: white;

}

.login_container {
  width: 1024px;
  margin: 0 auto;
  justify-content: flex-end;
  display: flex;
}

.login_text {
  border: none;
  background-color: transparent;
  font-size: 13px;
  color: gray;
  cursor: pointer;
}

.logo {
  width: 110px;
  height: 110px;
  color: rgb(5, 174, 5);
}

.header {
  background: rgb(255, 255, 255);
  z-index: 10;
  border-bottom: 1px solid rgb(238, 238, 238);
  top: 0px;
  left: 0px;
}

.logo_container {
  width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: rgb(255, 255, 255);
  z-index: 10;
}

.serch_button {
  color: green;
}

.search_box {
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 15px;
}

.search_container {
  border: 4px solid rgb(45, 168, 55);
  width: 400px;
  height: 40px;
  box-sizing: border-box;
  position: relative;
  margin-left: 110px;
}

.input_box {
  color: rgb(102, 102, 102);
  -webkit-box-flex: 1;
  flex-grow: 1;
  border: none;
  outline: none;
}

.search_icon {
  width: 17px;
  height: 17px;
}

.list_icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.list_button {
  font-size: 18px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.list_box {
  display: flex;
  align-items: center;
  margin-left: 15px;
}

.list {
  display: flex;
  align-items: center;
}

.list_box:not(:last-child)::after {
  content: "";
  position: relative;
  display: block;
  width: 1px;
  height: 10px;
  background-color: rgb(197, 197, 197);
  margin-left: 10px;
}

.list_container {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  margin: 0 auto;
}

.categoly_container {
  width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.chat_logo {
  margin-left: 30px;
  margin-right: 5px;
  width: 22px;
  height: 22px;

}

.chat_container {
  display: flex;
  cursor: pointer;
  margin-right: 5px;
}

.welcome_container {
  margin-right: auto;
}
</style>