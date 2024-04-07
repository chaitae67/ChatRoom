<template>
  <nav class="chat-list">
    <div class="list-header">
      <div class="nickname-area">둗남</div>
    </div>
    <ul tabindex="0" role="list" aria-label="내 채널 리스트" class="list">
      <li v-for="channel in channels" :key="channel.id" class="channel">
        <a class="channel-content" @click="selectChannel(channel)">
          <div class="content-wrapper">
            <div class="profile-nickname-wrapper">
              <div class="profile-wrapper">
                <img :src="channel.profileImage" class="profile-image" alt="profile">
              </div>
              <div class="nickname-info">
                <div class="nickname">
                  <span class="preview-nickname">{{ channel.nickname }}</span>
                </div>
                <div class="sub-text">{{ channel.lastActive }}</div>
              </div>
            </div>
            <div class="preview-content">
              <span class="content-text">{{ truncateText(channel.lastMessage, 30) }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div class="footer"></div>
  </nav>
</template>

<script>
export default {
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectChannel(channel) {
      this.$emit('channel-selected', channel);
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 5) + '...'; // 텍스트 길이가 maxLength를 초과하면 생략 부호를 추가하여 반환
      }
      return text;
    },
    
  }
};
</script>

<style scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #dee2e6;
  min-height: 100vh;
  width: 400px;
  min-width: 400px;
  background-color: var(--seed-semantic-color-paper-default);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #dee2e6;
  padding: 0 20px;
}

.nickname-area {
  font-weight: bold;
  font-size: 20px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  flex: 1;
}

.channel {
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
  position: relative;
}

.channel-content {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.profile-nickname-wrapper {
  display: flex;
  align-items: center;
}

.profile-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nickname-info {
  display: flex;
  flex-direction: column;
}

.nickname {
  font-weight: bold;
}

.sub-text {
  color: var(--seed-scale-color-gray-600);
  font-size: 12px;
}

.preview-content {
  color: #495057;
  font-size: 14px;
  text-align: left;
  display: flex;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content-text {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
