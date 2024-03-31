<template>
    <div class="chat-room">
      <div class="chat-header">
        <img class="profile-picture" :src="profilePicture" alt="Profile Picture">
        <h2 class="user-name">{{ userName }}</h2>
      </div>
      <MessageContainer :messages="messages"/>
      <MessageContainerR :receive="receive"/>
      <div class="input-container">
        <button @click="showFileInput" class="attach-button">사진 첨부</button>
        <input type="file" accept="image/*" ref="fileInput" @change="handleImageSelect" capture="environment" class="file-input">
        <div class="message-input-container">
          <img v-if="previewImage" :src="previewImage" alt="Selected Image" class="inside-preview-image" @click="clearPreviewImage">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="메시지를 입력하세요" class="message-input">
        </div>
        <button @click="sendMessage" class="send-button">전송</button>
      </div>
    </div>
  </template>
  
  <script>
  import MessageContainer from './MessageContainer.vue';
  import socket from '../../server.js';
  import MessageContainerR from './MeesageContainerR.vue';
  import axios from 'axios';
  import FormData from 'form-data';
  
  export default {
    name: 'Chat',
    components: {
      MessageContainer:MessageContainer,
      MessageContainerR:MessageContainerR,
    },

    props: {
      profilePicture: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        messages: [],
        newMessage: '',
        previewImage: null,
        selectedFile: null,
      };
    },

    methods: {
      async sendMessage() {
        if (this.previewImage) {
          // 이미지 메시지를 전송하는 경우
          const messageToSend = { image: this.previewImage, type: 'image' };
          socket.emit("sendmessage", messageToSend, async (res) => {
            if (res?.ok) {
              this.messages.push({ image: this.previewImage, fromMe: true, type: 'image' });
              
              // 이미지 분석 API로 이미지 전송
              try {
                const analyzeResult = await this.sendImageToAnalyze(this.selectedFile);
                console.log('Analyze result:', analyzeResult);
                // 필요하다면 분석 결과를 상태에 저장하거나 사용자에게 표시할 수 있습니다.
              } catch (error) {
                console.error('Image analysis failed:', error);
              }

              // 이미지 전송 후 미리보기 초기화
              this.previewImage = null;
            } else {
              console.error('Image send failed:', res?.error);
            }
          });
        } else if (this.newMessage.trim() !== '') { 
          // 텍스트 메시지를 전송하는 경우
          const messageToSend = { text: this.newMessage.trim(), type: 'text' };
          socket.emit("sendmessage", messageToSend, (res) => {
            if (res?.ok) {
              this.messages.push({ text: this.newMessage, fromMe: true, type: 'text' });
              this.newMessage = ''; // 텍스트 전송 후 입력창 초기화 함
            } else {
              console.error('Text send failed:', res?.error);
            }
          });
        }
      },
      async sendImageToAnalyze() {
        const formData = new FormData();
        formData.append('file', this.selectedFile); // 'this.selectedFile'은 사용자가 선택한 파일 객체입니다.

        try {
          const response = await axios.post('http://220.69.241.101:8000/analyze/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
          console.log("분석 결과:", response.data);
          // 분석 결과를 처리합니다.
        } catch (error) {
          console.error('Image analysis failed:', error);
        }
      },
      handleImageSelect(event) {
        const file = event.target.files[0];
        if (file) {
          // 미리보기를 위해 이미지 URL을 생성합니다.
          this.previewImage = URL.createObjectURL(file);
          // 선택된 파일을 저장합니다. Base64 인코딩 없이 파일 객체를 직접 사용합니다.
          this.selectedFile = file;
        }
      },
      showFileInput() {
        this.$refs.fileInput.click();
      },
      clearPreviewImage() {
        this.previewImage = null;
      }
    },

    mounted() {
    socket.on('receiveMessage', (message) => {
      const messageWithFromMe = { ...message, fromMe: false };
      this.messages.push(messageWithFromMe);
    });
  },

  };
  </script>

<style scoped>
/* 채팅방 스타일 */
.chat-room {
    max-width: 500px;
    height: 700px;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

/* 채팅 헤더 스타일 */
.chat-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-name {
    font-size: 16px;
    margin: 0;
}

/* 메시지 컨테이너 스타일 */
.message-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 0 10px;
}

/* 메시지 스타일 */
.message {
    margin-bottom: 10px;
}

.my-message {
    background-color: #dcf8c6;
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
    word-wrap: break-word;
    align-self: flex-end;
    margin-left: auto;
    margin-top: 10px
}

.other-message {
    background-color: #e6e6e6;
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
    word-wrap: break-word;
}

/* 입력 컨테이너 스타일 */
.input-container {
    display: flex;
    align-items: center;
    margin-top: auto;
    /* 하단에 고정 */
    margin-top: 15px;
}

.attach-button {
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

.file-input {
    display: none;
    /* 파일 입력 창 숨기기 */
}

.message-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.send-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.send-button:hover {
    background-color: #0056b3;
}

/* 이미지 프리뷰 스타일 */
.image-preview {
    margin-top: 10px;
    text-align: center;
}

.selected-image {
    max-width: 100px;
    /* 이미지 미리보기 최대 너비 설정 */
    cursor: pointer;
}

.sent-image {
    max-width: 100%;
    /* 이미지가 채팅방 너비를 넘지 않도록 함 */
    height: auto;
    /* 이미지 높이 자동 조정 */
    display: block;
    /* 이미지를 블록 요소로 처리 */
    margin: 0 auto;
}

.selected-image-preview {
    max-width: 50px;
    /* 미리보기 이미지 크기 조정 */
    max-height: 50px;
    /* 높이 제한 추가 */
    margin-right: 10px;
    /* 메시지 입력창과의 간격 */
    cursor: pointer;
    /* 클릭 가능 표시 */
}

.message-input-container {
  flex: 1; /* 컨테이너가 가능한 모든 공간을 차지하도록 함 */
  display: flex; /* 인풋 박스와 이미지 미리보기를 옆으로 배열 */
  align-items: center; /* 중앙 정렬 */
  position: relative; /* 내부의 이미지 위치 조정을 위함 */
}

.inside-preview-image {
  position: absolute; /* 컨테이너 내에서 절대 위치 사용 */
  left: 10px; /* 왼쪽에서부터의 간격 */
  max-width: 30px; /* 이미지 크기 조정 */
  max-height: 30px; /* 이미지 높이 조정 */
}

.message-input {
  flex: 1; /* 가능한 모든 공간을 차지 */
  padding-left: 45px; /* 이미지 미리보기와 텍스트 사이의 공간 확보 */
  /* 기존 스타일 유지 */
}
</style>