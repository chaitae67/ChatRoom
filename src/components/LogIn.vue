<template>
    <div class="login_container">
        <div class="logo_container">
            <img src="../assets/BB.svg" style="width: 80px; height: 80px;">
        </div>
        <div class="login_text">
            ID/PW 로그인 
        </div>
        <input type="text" placeholder="아이디 or 휴대폰번호로 입력" class="id_input">
        <input type="password" placeholder="비밀번호 입력" class="pw_input">
        <div class="search_box">
            <span class="search_text">아이디찾기</span>
            <span style="padding:0px 5px">|</span>
            <span class="search_text">비밀번호 찾기</span>
        </div>
        <div class="login_button">
            로그인
        </div>
        <div class="signup_box">
            <span class="first">처음이신가요? </span>
            <span class="signup_text">회원가입</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
</style>