<template>
  <div class="app">
    <div class="sidebar sidebar-left"></div>
    <SideBar />
    <ChatList :channels="channels" @channel-selected="handleChannelSelected" />
    <div class="content">
      <div v-if="selectedChannel" class="chat-room">
        <ChatRoom :channel="selectedChannel" :messages="channelMessages[selectedChannel.id]" @new-message="addNewMessage" />
      </div>
      <div v-else class="empty-box">
        <EmptyBox />
      </div>
    </div>
    <div class="sidebar sidebar-right"></div>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';
import ChatRoom from './ChatRoom.vue';
import EmptyBox from './EmptyBox.vue';
import ChatList from './ChatList.vue';

export default {
  components: {
    SideBar,
    ChatRoom,
    EmptyBox,
    ChatList,
  },
  data() {
    return {
      selectedChannel: null,
      channels: [
        {
          id: 1,
          profileImage: 'https://example.com/profile1.jpg',
          nickname: '바이바이',
          lastActive: '오전 03:03',
          lastMessage: '내 컴퓨터에서 로그인했어요. 본인이 아니라면 로그아웃 해주세요.'
        },
        {
          id: 2,
          profileImage: 'https://example.com/profile2.jpg',
          nickname: '안녕하세요',
          lastActive: '오후 01:30',
          lastMessage: '안녕하세요. 지금 어디 계세요?'
        }
        // 추가 채널 정보
      ],
      // 각 채널에 대한 메시지를 분리하여 저장
      channelMessages: {
        '1': [], // 1번 채널 메시지 저장 객체
        '2': [], // 2번 채널 메시지 저장 객체
        // 추가 채널에 대한 메시지 저장 객체
      }
    };
  },
  methods: {
    handleChannelSelected(channel) {
      this.selectedChannel = channel;
    },
    addNewMessage(newMessage) {
      if (this.selectedChannel) {
        // 현재 선택된 채널에 대한 메시지만 저장
        const messages = [...this.channelMessages[this.selectedChannel.id] || []];
        messages.push({
          id: messages.length + 1, // id 값은 예시입니다. 실제 구현에서는 고유한 값을 사용해야 합니다.
          text: newMessage.text,
          timestamp: Date.now(), // 변경된 부분
          sender: 'user',
        });
        this.channelMessages[this.selectedChannel.id] = messages;

        // 마지막 메시지 정보 업데이트
        const updatedChannels = this.channels.map(channel => {
          if (channel.id === this.selectedChannel.id) {
            return {
              ...channel,
              lastMessage: newMessage.text,
              lastActive: new Date().toLocaleTimeString(),
            };
          }
          return channel;
        });
        this.channels = updatedChannels;
      }
    },
  },
}
</script>

<style scoped>
.app {
  display: flex;
  height: calc(100vh - 100px);
  background: #FFFFFF;
  width: 100%;
}

.sidebar {
  background-color: #f1f3f5;
  width: 100px;
}

.sidebar-left {
  height: calc(100vh - 100px);
}

.sidebar-right {
  height: calc(100vh - 100px);
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dee2e6;
}

.chat-room,
.empty-box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
