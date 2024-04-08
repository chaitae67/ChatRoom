<template>
  <div class="chatroom">
    <!-- 채널 정보 헤더 -->
    <div class="chat-header">
      <div class="profile-wrapper">
        <img :src="channel.profileImage" class="profile-image" alt="Channel Profile">
      </div>
      <div class="channel-info">
        <div class="channel-nickname">{{ channel.nickname }}</div>
      </div>
    </div>
    <!-- 채팅 내용 표시 -->
    <div class="box">
      <div class="chat-messages" ref="chatMessages">
        <component
          v-for="(message, index) in channelMessages[channel.id]"
          :key="index"
          :is="message.sender === 'user' ? 'UserMessage' : 'OtherMessage'"
          :message="message"
        />
      </div>
    </div>
    <!-- 메시지 입력 폼 -->
    <form class="message-form" @submit.prevent="addMessage">
      <textarea v-model="newMessage" placeholder="메세지를 입력하세요." class="message-input"></textarea>
      <!-- 파일 선택 input -->
      <input type="file" id="fileInput" @change="handleFileUpload" style="display: none;" />
      <!-- 파일 선택 버튼 -->
      <label for="fileInput" class="img-button">
        <img src="../assets/photo.png" alt="Upload Icon" class="photo" />
      </label>
      <!-- 전송 버튼 -->
      <button type="submit" class="send-button">전송</button>
    </form>
    <!-- 모달 -->
    <Modal v-if="isModalOpen" @close="closeModal" @send="sendImage">
      <img :src="previewImage" alt="Preview" class="preview-image" />
      <div class="modal-buttons">
        <button class="button-send" @click="sendImage">전송</button>
        <button class="button-cancel" @click="cancelImage">취소</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import UserMessage from './UserMessage.vue';
import OtherMessage from './OtherMessage.vue';
import { io } from 'socket.io-client';

export default {
  components: {
    Modal,
    UserMessage,
    OtherMessage
  },
  props: {
    channel: Object
  },
  data() {
    return {
      channelMessages: {
        1: [],
        2: []
      },
      lastMessages: {
        1: null,
        2: null
      },
      newMessage: '',
      selectedFile: null,
      isModalOpen: false,
      previewImage: '',
      lastMessage: '',
      
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage.trim() || this.selectedFile) {
        const messageData = {
          text: this.newMessage,
          timestamp: Date.now(),
          sender: 'user',
          file: this.selectedFile ? URL.createObjectURL(this.selectedFile) : null,
        };

        // WebSocket을 통해 서버로 메시지 전송
        this.socket.emit('message', messageData);

        // 메시지를 자체적으로 표시하는 대신 소켓에서 받은 메시지를 기다림
        this.channelMessages[this.channel.id].push(messageData);

        this.newMessage = '';
        this.selectedFile = null;
        this.scrollToBottom();
        this.lastMessage = messageData.text;

        // 마지막 메시지를 업데이트
        this.updateLastMessage(messageData);
      }
    },
    
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);
        this.openModal();
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.previewImage = '';
      this.selectedFile = null;
    },
    sendImage() {
      if (this.selectedFile) {
        const messageData = {
          file: URL.createObjectURL(this.selectedFile),
          sender: 'user'
        };
        
        // WebSocket을 통해 서버로 이미지 메시지 전송
        this.socket.emit('message', messageData);

        // 메시지를 자체적으로 표시하는 대신 소켓에서 받은 메시지를 기다림
        this.channelMessages[this.channel.id].push(messageData);

        this.newMessage = '';
        this.closeModal();
        this.scrollToBottom();
        this.lastMessage = 'Image';

        // 마지막 메시지를 업데이트
        this.updateLastMessage(messageData);
      }
    },
    cancelImage() {
      this.closeModal();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
    updateLastMessage(message) {
      // 마지막 메시지 업데이트
      this.lastMessage = message.text;
    }
  },
  mounted() {
    // VueSocketIO 대신 socket.io-client를 사용하여 소켓 초기화
    this.socket = io('http://localhost:8080');

    // 서버로부터 받은 메시지를 처리하는 부분
    this.socket.on('message', (messageData) => {
      this.channelMessages[this.channel.id].push(messageData);
      this.scrollToBottom();

      // 받은 메시지를 통해 마지막 메시지를 업데이트
      this.updateLastMessage(messageData);
      
      // 새로운 메시지를 받으면 해당 메시지를 미리보기로 표시
      this.lastMessages[this.channel.id] = messageData.text;
    });
  }
};
</script>



<style scoped>
/* ChatRoom 컴포넌트에 대한 스타일링 */
.chatroom {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 812px;
  background-color: white;
  margin: 0 auto; /* 중앙 정렬 */
}
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 43px;
    background-color: #FFF;
  }
  
  .profile-wrapper {
    display: flex;
    align-items: center;
  }
  
  .profile-image {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    object-fit: contain;
  }
  
  .channel-info {
    flex-grow: 1;
  }
  
  .channel-nickname {
    font-size: 16px;
    font-weight: bold;
  }
  
  .message-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 125px;
    border: 2px solid rgb(45, 168, 55);
    border-radius: 8px;
    padding: 5px;
  }
  
  .message-input {
    flex-grow: 1;
    margin: 4px;
    padding: 4px;
    resize: none;
    font-size: 14px;
    border: none;
    outline: none;
  }
  
  .img-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .photo {
    width: 24px;
    height: 24px;
  }
  
  .send-button {
    align-self: flex-end;
    margin-top: 8px;
    padding: 6px 12px;
    background-color: #04B404;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .box {
    padding: 0px 20px;
    background-color:white ;
    height: 750px;
    border-radius: 0px;
    overflow-y: auto; /* 새로운 스타일: 메시지가 많을 경우 스크롤 가능 */
  }
  
  .box::-webkit-scrollbar {
    display: none;
  }
  
  .photo {
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-bottom: -50px;
    margin-right: 750px;
  }
  .modal-buttons{
    display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  }
.button-cancel {
  background-color: #E74C3C;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-send {
  background-color: #2ECC71;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  filter: brightness(110%);
}
.preview-image {
  width: 100%; /* 이미지가 모달 안에 꽉 차도록 설정 */
  height: auto;
  margin-bottom: 20px; /* 이미지와 버튼 사이 간격 조정 */
}

  </style>
