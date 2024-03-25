<template>
  <div class="header_top">
    <div class="login_container">
      <button class="login_button">로그인</button>
      <button class="login_button">회원가입</button>
    </div>
  </div>

  <header class="header">
    <div class="logo_container">
      <img src="../assets/BB.svg" alt="없음" class="logo">
      <form>
        <div class="search_container">
          <div class="search_box">
            <input class="input_box" type="text" name="search" placeholder="검색어를 입력하세요">
            <img src="../assets/search.svg" class="search_icon">
          </div>
        </div>
      </form>
      <div>
        <button class="list_button">
          <img src="../assets/bag.svg" class="list_icon">
          중고거래
        </button>
        <button class="list_button">
          <img src="../assets/coin.svg" class="list_icon">
          판매하기
        </button>
        <button class="list_button">
          <img src="../assets/shop.svg" class="list_icon">
          내상점
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>
body {
  margin: 0;
}

.header_top {
  border-bottom: 1px solid rgb(238, 238, 238);
  height: 50px;
  align-items: center;
  display: flex;
}

.login_container {
  margin-left: 70%;
}

.login_button {
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: gray;
}

.logo {
  width: 80px;
  height: 80px;
}

.header {
  position: sticky;
  display: flex;
  width: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 35px;
  background: rgb(255, 255, 255);
  z-index: 10;
  border-bottom: 1px solid rgb(238, 238, 238);
  top: 0px;
  left: 0px;
}

.logo_container {
  display: flex;
  align-items: center;
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
  border: 3px solid rgb(45, 168, 55);
  width: 460px;
  height: 40px;
  box-sizing: border-box;
  position: relative;
}

.input_box {
  color: rgb(102, 102, 102);
  -webkit-box-flex: 1;
  flex-grow: 1;
  border: none;
}

.search_icon {
  width: 20px;
  height: 20px;
}
.list_icon{
  width: 22px;
  height: 22px;
}
.list_button{
  font-size: 18px;
  border: none;
  background-color: transparent;
}
</style>