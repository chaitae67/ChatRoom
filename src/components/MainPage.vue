<template>
  <Header @headerHeightUpdated="setTopPadding" />
  <div class="content_container">
    <section class="main_first">
      <div class="main_container">
        <div class="text_container">
          <h1 class="title_text">BUY-BYE와 함께<br>새로운 만남의 시작을.</h1>
          <p class="subtitle_text">필요한 건 BUY!</p>
          <p class="subtitle_text">필요없는 건 BYE!</p>
          <div class="button_container">
            <a class="main_button">
              <div class="button_text">
                둘러보기
              </div>
            </a>
            <a class="main_button">
              <div class="button_text">
                주요기능
              </div>
            </a>
          </div>
        </div>
        <img src="../assets/MainLogo.svg" class="main_logo">
      </div>
    </section>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {
    Header: Header,
  },
  mounted() {
    this.$emit('headerHeightUpdated', this.$el.offsetHeight);
  },

  setTopPadding(height) {
    this.headerHeight = height;
  },
}
</script>

<style scoped>
.content_container {
  padding-top: 197px;
}

.main_first {
  background-color: rgb(225, 241, 211);
}

.main_container {
  width: 1024px;
  height: 700px;
  margin: 0 auto;
  position: relative;
  align-items: center;
  display: flex;
}
.title_text{
  margin: 0;
  padding-top: 40px;
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 70px;
  margin-bottom: 2rem;
}
.subtitle_text{
  font-weight: 400;
  font-size: 23px;
  line-height: 30px;
  margin: 0;
  color:#7c7c7c;
}
.button_container{
  margin-top: 30px;
}
.main_button{
  width: 180px;
  height: 56px;
  border-radius: 10px;
  background: rgb(17, 148, 28);;
  box-sizing: border-box;
  text-decoration: none;
  padding: 14px 2rem;
  display: inline-block;
  text-align: center;
  margin-right:2.5rem;
}
.button_text{
  display: inline-block;
  color: white;
  font-size: 19px;
  vertical-align: middle;
  font-weight: 700;
  line-height: 30px;
  cursor: pointer;
}
.main_logo{
  width: 500px;
  height: 500px;
  right:-90px;
  position: absolute;
}
</style>