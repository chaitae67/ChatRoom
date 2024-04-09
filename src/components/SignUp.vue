<template>
    <div class="signup_container">
        <div class="logo_container">
            <img @click="navigateToMain" src="../assets/BB.svg" style="width: 80px; height: 80px; cursor: pointer;">
        </div>
        <div class="signup_text">회원가입</div>
        <div>
            <input v-model="userId" class="input" placeholder="아이디">
        </div>
        <div class="password_box">
            <input v-model="password" placeholder="비밀번호 입력" type="password" class="input"> <!-- type을 password로 변경 -->
            <div class="check_box">
                <input v-model="confirmPassword" placeholder="비밀번호 확인" type="password" class="input"> <!-- type을 password로 변경 -->
            </div>
        </div>
        <input v-model="nickname" placeholder="닉네임" type="text" class="input" maxlength="6" style="margin-bottom: 20px;">
        <input v-model="name" placeholder="이름" type="text" class="input">
        <div class="birth_box">
            <input v-model="birthdate" placeholder="주민등록번호 앞 6자리" class="input" maxlength="6"  width="30%"> 
            <div class="birth_"></div>
            <input v-model="gender" width="8%" placeholder class="birth_blank" maxlength="1"> <!-- width 제거 -->
            <div class="birth_fill">●●●●●●</div>
        </div>
        <input v-model="phoneNumber" placeholder="휴대폰번호" class="phone_number" style="margin-bottom: 6px;" maxlength="11">
        <div v-if="errorMessage" class="error_message">{{ errorMessage }}</div> <!-- v-if 조건 변경 -->
        <button @click="checkFieldsAndSubmit" type="submit" class="signup_button" style="margin-top: 30px;">회원가입 완료</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userId: '',
            password: '',
            nickname: '',
            name: '',
            birthdate: '',
            phoneNumber: '',
            gender: '',
            showErrorMessage: false,
            confirmPassword: '',
            errorMessage: '', // 사용자에게 보여줄 에러 메시지
        };
    },
    methods: {
        navigateToMain(){
        this.$router.push('/Main');  
        },
        async checkFieldsAndSubmit() {
            // 비밀번호 일치 여부 확인
            if (this.password !== this.confirmPassword) {
                this.errorMessage = '비밀번호가 일치하지 않습니다'; // 에러 메시지 업데이트
                return; // 여기서 함수 실행 종료
            }

            if (this.allFieldsFilled()) {
                this.submitSignup();
                this.errorMessage = ''; // 모든 것이 유효하면 에러 메시지 클리어
            } else {
                this.errorMessage = '모든 필드를 올바르게 채워주세요.'; // 필드 누락에 대한 메시지 설정
            }
        },
        allFieldsFilled() {
            // 모든 필드가 채워져 있는지 검사
            return this.userId && this.password && this.nickname && this.name && this.birthdate && this.gender && this.phoneNumber;
        },
        async submitSignup() {
            const formData = {
                userId: this.userId,
                password: this.password,
                nickname: this.nickname,
                name: this.name,
                birthdate: this.birthdate,
                phoneNumber: this.phoneNumber,
                gender: this.gender,
            };
            try {
                const response = await axios.post('http://220.69.241.101:3001/signup', formData);
                alert('회원가입이 성공적으로 완료되었습니다.');
                this.$router.push('/LogIn');
            } catch (error) {
                console.error('회원가입 실패:', error);
                this.errorMessage = '회원가입 과정에서 오류가 발생했습니다.'; // 서버 오류에 대한 메시지 설정
            }
        }
    }
};
</script>


<style scoped>
.error_message {
    color: red;
}

.signup_container {
    width: 400px;
    margin: 130px auto 0px;
}

.logo_container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 25px;
}

.signup_text {
    font-size: 22px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 40px;
}

.input {
    outline: none;
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    font-size: 16px;
    padding: 0px 0px 10px;
    width: 100%;
    border-bottom: 1px solid rgb(240, 240, 240);
}

.password_box {
    margin: 20px 0px;
}

.check_box {
    margin-top: 20px;

}

.birth_box {
    display: flex;
    margin-top: 15px;
}

.birth_input {
    outline: none;
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    font-size: 16px;
    padding: 0px 0px 10px;
    width: 30%;
    border-bottom: 1px solid rgb(240, 240, 240);
}

.birth_ {
    width: 9px;
    height: 2px;
    margin: 0px 0.5rem;
    background-color: rgb(221, 221, 221);
    flex-shrink: 0;
    align-self: center;
}

.birth_blank {
    outline: none;
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    font-size: 16px;
    padding: 0px 0px 10px;
    width: 8%;
    border-bottom: 1px solid rgb(240, 240, 240);
}

.birth_fill {
    color: rgb(221, 221, 221);
    font-size: 30px;
    padding-bottom: 4px;
}

.phone_number {
    margin-top: 23px;
    outline: none;
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    font-size: 16px;
    padding: 0px 0px 10px;
    width: 100%;
    border-bottom: 1px solid rgb(240, 240, 240);
}

.signup_button {
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