<template>
  <div class="header_top">
    <div class="login_container">
      <button class="login_button">로그인</button>
      <button class="login_button">회원가입</button>
    </div>
  </div>

  <header class="header">
    <div class="logo_container">
      <img src="../assets/buybye.svg" alt="없음" class="logo">
      <form>
        <div class="search_container">
          <div class="search_box">
            <input class="input_box" type="text" name="search" placeholder="검색어를 입력하세요">
            <img src="../assets/search.svg" class="search_icon">
          </div>
        </div>
      </form>
      <div class="list_container">
        <div class="list_box">
          <div class="list">
            <img src="../assets/bag.svg" class="list_icon">
            <button class="list_button">중고거래</button>
          </div>
        </div>
        <div class="list_box">
          <div class="list">
            <img src="../assets/coin.svg" class="list_icon">
            <button class="list_button">판매하기</button>
          </div>
        </div>
        <div class="list_box">
          <div class="list">
            <img src="../assets/shop.svg" class="list_icon">
            <button class="list_button">내상점</button>
          </div>
        </div>
      </div>
    </div>

    <div class="categoly_container">
      <img src="C:\Users\chait\OneDrive\바탕 화면\3팀\ChatRoom\src\assets\list.svg" alt="없음">
    </div>
  </header>
</template>

<script>
export default {
//
}
</script>

<style>
body {
  margin: 0;
}

.header_top {
  border-bottom: 1px solid rgb(238, 238, 238);
  height: 40px;
  align-items: center;
  display: flex;
}

.login_container {
  width: 1024px;
  margin: 0 auto;
  justify-content: flex-end;
  display: flex;
}

.login_button {
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
  padding: 10px;
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
  border: 3px solid rgb(45, 168, 55);
  width: 350px;
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
}

.search_icon {
  width: 20px;
  height: 20px;
}

.list_icon {
  width: 22px;
  height: 22px;
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

.categoly_container{
  width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;;
}
</style>