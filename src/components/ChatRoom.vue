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
    <div class="box" ref="chatBox">
      <div class="chat-messages">
        <component
          v-for="(message, index) in channelMessages[channel.id]"
          :key="index"
          :is="message.sender === 'user' ? 'UserMessage' : 'OtherMessage'"
          :message="message"
        />
      </div>
    </div>
    <!-- 메시지 입력 폼 -->
    <form class="message-form" @submit.prevent>
      <textarea v-model="newMessage" placeholder="메세지를 입력하세요." class="message-input" @keydown.enter="sendMessageOnEnter"></textarea>
      <!-- 파일 선택 input -->
      <input type="file" id="fileInput" @change="handleFileUpload" style="display: none;" />
      <!-- 파일 선택 버튼 -->
      <label for="fileInput" class="img-button">
        <img src='../assets/image_file_icon_149928.png' alt="Upload Icon" class="photo" />
      </label>
      <!-- 송신 버튼 -->
      <button type="submit" class="send-button1" :class="{ 'send-button-active': newMessage }" @click.prevent="sendMessage">전송</button>
    </form>

    <!-- 모달 -->
    <Modal v-if="isModalOpen" @close="closeModal" @send="sendImage">
      <img :src="previewImage" alt="Preview" class="preview-image" />
      <div class="modal-buttons">
        <button class="modal-send" @click="sendImage">전송</button>
        <button class="button-cancel" @click="cancelImage">취소</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import UserMessage from './UserMessage.vue';
import OtherMessage from './OtherMessage.vue';
import axios from 'axios';

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
        // 필요에 따라 다른 채널의 메시지 배열 추가
      },
      newMessage: '',
      selectedFile: null,
      isModalOpen: false,
      previewImage: '',
      lastMessage: '', // 마지막 보낸 메시지를 저장할 변수 추가
      LastImage: '',
      refreshInterval: null // 타이머를 저장할 변수
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() || this.selectedFile) {
        const message = {
          text: this.newMessage,
          timestamp: Date.now(),
          sender: 'user',
          file: this.selectedFile ? URL.createObjectURL(this.selectedFile) : null,
        };
        this.channelMessages[this.channel.id].push(message);
        this.newMessage = '';
        this.selectedFile = null;
        this.lastMessage = message.text;
        this.$emit('new-message', message);
      }
    },
    async sendImage() {
      if (this.selectedFile) {
        try {
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          const response = await axios.post('http://localhost:8000/classify', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const { metadata_result, classify_result } = response.data;

          alert(`메타데이터 확인 결과: ${metadata_result}`);
          alert(`이미지 분류 결과: ${classify_result}`);

          const message = {
            file: URL.createObjectURL(this.selectedFile),
            text: `${metadata_result} - ${classify_result}`,
            timestamp: Date.now(),
            sender: 'user',
          };

          this.channelMessages[this.channel.id].push(message);
          this.closeModal();
        } catch (error) {
          console.error('이미지 전송 중 오류 발생:', error);
          alert('이미지 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
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
    cancelImage() {
      this.closeModal();
    },
    sendMessageOnEnter(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    },
    scrollToBottom() {
      const chatBox = this.$refs.chatBox;
      chatBox.scrollTop = chatBox.scrollHeight;
    },
    fetchMessages() {
      // 서버에서 메시지 가져오는 로직 (더미 데이터 예시)
      axios.get(`http://localhost:8000/messages/${this.channel.id}`).then(response => {
        this.channelMessages[this.channel.id] = response.data;
        console.log("Messages updated!");
      }).catch(error => {
        console.error('메시지 업데이트 중 오류 발생:', error);
      });
    }
  },
  watch: {
    channelMessages: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    }
  },
  mounted() {
    this.scrollToBottom();

    // 10초마다 새로고침 설정
    this.refreshInterval = setInterval(() => {
      this.fetchMessages();
    }, 10000); // 10,000ms = 10초
  },
  beforeUnmount() {
    // 컴포넌트가 파괴될 때 타이머 정리
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
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
  background-color: white;
  margin: 0 auto; /* 중앙 정렬 */
  height: calc(100vh - 150px); /* 변경 */
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: #FFF;
  border-bottom: 1px solid #dee2e6;
}

.profile-wrapper {
  display: flex;
  align-items: center;
  margin-left: 20px;
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

.send-button1 {
  align-self: flex-end;
  margin-top: 8px;
  padding: 8px 20px;
  background-color: #CCC; /* 회색 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* 호버 시 색상 전환에 애니메이션 적용 */
}

/* 메시지 입력이 있을 때 버튼 색상 변경 */
.message-input:not(:empty) + .send-button1 {
  background-color: #04B404; /* 초록색 */
}

.send-button1.send-button-active {
  background-color: #04B404; /* 활성 상태인 경우 초록색 유지 */
}

.box {
  background-color: white;
  height: calc(100vh - 250px);
  border-radius: 0px;
  padding: 10px;
  overflow-y: scroll; /* auto 대신 scroll로 변경 */
}
.box::-webkit-scrollbar {
  display: none;
}

.photo {
  width: 35px;
  height: 35px;
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

.modal-send {
  background-color: #04B404;
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
