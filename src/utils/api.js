const API_BASE_URL = 'https://api.coze.cn/open_api/v2'

export const createChatCompletion = async (messages, agentId, apiKey) => {
  const payload = {
    agent_id: agentId,
    query: messages[messages.length - 1].content, // 只取最后一条用户消息
    user: 'user-123' // 可换成当前用户的唯一 ID
  }

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }

  try {
    const startTime = Date.now()
    const response = await fetch(`${API_BASE_URL}/chat`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const duration = (Date.now() - startTime) / 1000

    // 计算每秒生成速度
    if (data.usage && data.usage.completion_tokens) {
      data.speed = (data.usage.completion_tokens / duration).toFixed(2)
    }

    return data
  } catch (error) {
    console.error('Chat API Error:', error)
    throw error
  }
}
