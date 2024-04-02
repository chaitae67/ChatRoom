<template>
  <div class="signup_container">
    <div class="logo_container">
        <img src="../assets/BB.svg" style="width: 80px; height: 80px;">
    </div>
    <div class="signup_text">회원가입</div>
    <div>
    <input class="input" placeholder="아이디" v-model="englishInput" @input="validateEnglishInput">
    </div>
    <div class="password_box">
        <input placeholder="비밀번호 입력" type="password" class="input">
        <div class="check_box">
            <input placeholder="비밀번호 확인" type="password" class="input">
        </div>
    </div>
    <input placeholder="닉네임" type="text" class="input" style="margin-bottom: 20px;">
    <input placeholder="이름" type="text" class="input">
    <div class="birth_box">
        <input placeholder="생년월일" width="30%" class="input" maxlength="6">  
        <div class="birth_"></div>
        <input width="8%" placeholder class="birth_blank" maxlength="1">
        <div class="birth_fill">●●●●●●</div>
    </div>
    <input placeholder="휴대폰번호" class="phone_number" style="margin-bottom: 45px;" maxlength="11">
    <button type="submit" class="signup_button">
        회원가입 완료
    </button>
  </div>
</template>

<script>
export default {
    data() {
    return {
      englishInput: ''
    };
  },
  methods: {
    validateEnglishInput() {
      // 정규 표현식을 사용하여 입력된 값이 영어 알파벳인지 확인
      if (!/^[a-zA-Z]*$/.test(this.englishInput)) {
        // 입력된 값이 영어 알파벳이 아니면 입력을 막음
        this.englishInput = this.englishInput.replace(/[^A-Za-z]/g, '');
      }
    }
  } 
}
</script>

<style scoped>
.signup_container{
    width: 400px;
    margin: 140px auto 0px;
}
.logo_container{
    display: flex; 
    align-items: center; 
    justify-content: center; 
    flex-direction: column;
    margin-bottom: 25px;
}
.signup_text{
    font-size: 22px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 40px;
}
.input{
    outline: none ;
    border-top: none ;
    border-right: none ;
    border-left: none ;
    border-image: initial ;
    font-size: 16px ;
    padding: 0px 0px 10px ;
    width: 100% ;
    border-bottom: 1px solid rgb(240, 240, 240);
}
.password_box{
    margin: 20px 0px;
}
.check_box{
    margin-top: 20px;
    
}
.birth_box{
    display: flex;
    margin-top: 15px;
}
.birth_input{
    outline: none ;
    border-top: none ;
    border-right: none ;
    border-left: none ;
    border-image: initial ;
    font-size: 16px ;
    padding: 0px 0px 10px ;
    width: 30% ;
    border-bottom: 1px solid rgb(240, 240, 240); 
}
.birth_{
    width: 9px;
    height: 2px;
    margin: 0px 0.5rem;
    background-color: rgb(221, 221, 221);
    flex-shrink: 0;
    align-self: center;
}
.birth_blank{
    outline: none ;
    border-top: none ;
    border-right: none ;
    border-left: none ;
    border-image: initial ;
    font-size: 16px ;
    padding: 0px 0px 10px ;
    width: 8% ;
    border-bottom: 1px solid rgb(240, 240, 240);   
}
.birth_fill{
    color: rgb(221, 221, 221);
    font-size: 30px;
    padding-bottom: 4px;
}
.phone_number{
    margin-top: 23px;
    outline: none ;
    border-top: none ;
    border-right: none ;
    border-left: none ;
    border-image: initial ;
    font-size: 16px ;
    padding: 0px 0px 10px ;
    width: 100% ;
    border-bottom: 1px solid rgb(240, 240, 240);   
}
.signup_button{
    border: none;
    width: 100%;
    height: 60px;
    background: rgb(82, 187, 82);
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    color: rgb(255, 255, 255);
    cursor: pointer;
}
</style>