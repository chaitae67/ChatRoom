<template>
  <div class="signup_container">
    <div class="logo_container">
        <img src="../assets/BB.svg" style="width: 80px; height: 80px;">
    </div>
    <div class="signup_text">회원가입</div>
    <div>
    <input class="id_input" placeholder="아이디">
    </div>
  </div>
</template>

<script>
export default {

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
.id_input{
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
</style>