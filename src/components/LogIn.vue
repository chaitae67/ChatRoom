<template>
  <div class="login_container">
    <div class="logo_container">
      <img src="../assets/BB.svg" style="width: 80px; height: 80px;">
    </div>
    <div class="login_text">
      ID/PW 로그인 
    </div>
    <input v-model="userId" type="text" placeholder="아이디 or 휴대폰번호로 입력" class="id_input">
    <div class="password_box">
      <input v-model="userPassword" :type="showPassword ? 'text' : 'password'" placeholder="비밀번호 입력" class="pw_input">
      <img :src="showPassword ? getPwPng(1) : getPwPng(0)" class="password_icon" @click="togglePasswordVisibility">
    </div>
    <div class="search_box">
      <span class="search_text">아이디찾기</span>
      <span style="padding:0px 5px">|</span>
      <span class="search_text">비밀번호 찾기</span>
    </div>
    <div @click="login" class="login_button" >
      로그인
    </div>
    <div class="signup_box">
      <span class="first">처음이신가요? </span>
      <span @click="handleSignup" class="signup_text">회원가입</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    showPassword: false,
    userId: '',
    userPassword: '',
  };
},
methods: {
  getPwPng(num) {
    return num == 0 ? require('../assets/ico_join_pw_on.png') : require('../assets/ico_join_pw_off.png');
  },
  handleSignup() {
    this.$router.push('./SignUp');
  },
  login() {
    axios.post('http://220.69.241.101:3001/login', {
      userId: this.userId,
      password: this.userPassword,
    })
    .then(response => {
      console.log('로그인 성공:', response);
      //this.$router.push('./MainPage');
      console.log(response.data);
    })
    .catch(error => {
      console.error('로그인 실패:', error);
      console.log(response.data);
    });
  }
}
};
</script>

<style scoped>
.password_box{
  position: relative;
}
.login_container{
  width:400px;
  margin: 0px auto;
  padding-top: 120px;

}
.logo_container{
  display: flex; 
  align-items: center; 
  justify-content: center; 
  flex-direction: column;
  margin-bottom: 25px;
}
.login_text{
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 40px;
}
.id_input{
  width: 100%;
  margin-top: 20px;
  border-top: none;
  border-right: none ;
  border-left: none ;
  border-image: initial;  
  font-size: 13px ;
  padding: 0px 0px 8px; 
  border-bottom: 1px solid rgb(240, 240, 240);
  outline: none;
  color: gray;
}
.pw_input{
  width: 100%;
  margin-top: 20px;
  border-top: none;
  border-right: none ;
  border-left: none ;
  border-image: initial;  
  font-size: 13px ;
  padding: 0px 0px 8px; 
  border-bottom: 1px solid rgb(240, 240, 240);
  outline: none;
  color: gray;
  height: 22px;
}
.search_box{
  text-align: right;
  color: rgb(51, 51, 51);
  margin: 10px 0px 30px;
}
.search_text{
  font-size:12px;
  cursor: pointer;
}
.login_button{
  color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 18px 0px;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  border-radius: 3px;
  margin: 15px 0px 20px;
  background-color: rgb(5, 174, 5);
}
.signup_box{
  text-align: center;
}
.first{
  font-size: 14px;
  font-weight: medium;
}
.signup_text{
  font-size:14px;
  cursor: pointer;
  font-weight:700;
  color: rgb(5, 174, 5);
}
.password_icon{
  position: absolute;
  top: 23px;
  right: 23px;
  width: 20px;
  height: 16px;
  cursor: pointer; 
}
</style>