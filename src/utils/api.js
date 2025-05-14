// 统一 API 根路径（正式地址）
const API_BASE_URL = 'https://coze.nankai.edu.cn/api/proxy/api/v1'

// 主控 Agent 的四元组配置
const mainAgent = {
  agentId: 'cvqckejkphnujaq2b1t0', //
  workflowId: 'cvubiejkphnujaq2reu0',
  workspaceId: 'cvmedgah1u3c25s9d7m0',
  apiKey: 'd0hg4tmunshmtco3r1j0' //
}

// 核心调用方法：发送用户消息给主控 Agent，并返回回复内容
export const createChatCompletion = async (messages) => {
  // 提取最后一条用户消息内容
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
  const userInput = lastUserMessage?.content || ''

  // 构造 Hiagent 所需请求体（注意：InputData 必须为字符串）
  const payload = {
    ID: mainAgent.workflowId,
    WorkspaceID: mainAgent.workspaceId,
    InputData: JSON.stringify({ input: userInput }), // 💡 注意必须是字符串
    Top: {} // 可扩展参数（如温度、top_p 等），目前为空即可
  }

  try {
    const response = await fetch(`${API_BASE_URL}/SubmitWorkflowDebug`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mainAgent.apiKey}` // ✅ 关键：带上 API Key
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ 接口响应错误文本:', errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    const reply = result?.data?.ReplyText || '[主控智能体未返回内容]'
    return { content: reply }

  } catch (error) {
    console.error('❌ 主控Agent调用失败:', error)
    return { content: '[调用失败，请稍后再试]' }
  }
}
