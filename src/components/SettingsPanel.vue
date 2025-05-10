<script setup>
import { ref } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { ElMessage } from 'element-plus'

const settingStore = useSettingStore()
const visible = ref(false)

const newAgent = ref({
  name: '',
  agentId: '',
  apiKey: ''
})

const addAgent = () => {
  if (newAgent.value.name && newAgent.value.agentId && newAgent.value.apiKey) {
    settingStore.addAgent({ ...newAgent.value })
    newAgent.value = { name: '', agentId: '', apiKey: '' }
  } else {
    ElMessage.error('请完整填写所有字段')
  }
}

defineExpose({ openDrawer: () => (visible.value = true) })
</script>

<template>
  <el-drawer v-model="visible" title="设置智能体" direction="rtl" size="350px">
    <div class="setting-container">
      <!-- 智能体列表 -->
      <div
        class="setting-item"
        v-for="(agent, index) in settingStore.agents"
        :key="index"
      >
        <el-card shadow="hover">
          <div class="setting-label-row">
            <div class="label-with-tooltip">
              <b>{{ agent.name || '未命名智能体' }}</b>
            </div>
            <div>
              <el-button
                type="primary"
                size="small"
                @click="settingStore.selectAgent(index)"
                :disabled="settingStore.selectedIndex === index"
              >
                {{ settingStore.selectedIndex === index ? '使用中' : '切换' }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="settingStore.deleteAgent(index)"
              >
                删除
              </el-button>
            </div>
          </div>
          <div style="margin-top: 8px; font-size: 13px; color: #666">
            <p><b>Agent ID:</b> {{ agent.agentId }}</p>
            <p><b>API Key:</b> {{ agent.apiKey }}</p>
          </div>
        </el-card>
      </div>

      <!-- 添加新智能体 -->
      <el-divider>添加新智能体</el-divider>
      <el-form :model="newAgent" label-width="100px">
        <el-form-item label="智能体名称">
          <el-input v-model="newAgent.name" placeholder="例如：教学助手" />
        </el-form-item>
        <el-form-item label="Agent ID">
          <el-input v-model="newAgent.agentId" placeholder="请输入 Agent ID" />
        </el-form-item>
        <el-form-item label="API Key">
          <el-input v-model="newAgent.apiKey" placeholder="请输入 API Key" show-password />
        </el-form-item>
        <el-button type="success" @click="addAgent">添加</el-button>
      </el-form>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.setting-container {
  padding: 20px;
  color: #27272a;
}

.setting-item {
  margin-bottom: 24px;

  .setting-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    color: #27272a;

    .label-with-tooltip {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
