import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
  // 多个智能体列表，每个包含：name、agentId、apiKey
  const agents = ref([
    {
      name: '教学助手',
      agentId: '',
      apiKey: '',
    }
  ])

  // 当前选中的智能体索引
  const selectedIndex = ref(0)

  // 添加一个新智能体
  const addAgent = (agent) => {
    agents.value.push(agent)
  }

  // 删除智能体
  const deleteAgent = (index) => {
    agents.value.splice(index, 1)
    if (selectedIndex.value >= agents.value.length) {
      selectedIndex.value = 0
    }
  }

  // 选择一个智能体
  const selectAgent = (index) => {
    selectedIndex.value = index
  }

  // 获取当前智能体
  const currentAgent = () => agents.value[selectedIndex.value]

  return {
    agents,
    selectedIndex,
    addAgent,
    deleteAgent,
    selectAgent,
    currentAgent,
  }
}, {
  persist: true  // 保存在本地缓存中
})
