const TELEGRAM_API = 'https://api.telegram.org'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) {
    return res.status(500).json({ ok: false, error: 'TELEGRAM_BOT_TOKEN is not configured on server' })
  }

  let body
  try {
    body = req.body
    if (typeof body === 'string') body = JSON.parse(body)
  } catch (e) {
    return res.status(400).json({ ok: false, error: 'Invalid JSON body' })
  }

  // Validate required fields
  const order = body?.order
  if (!order || typeof order !== 'object') {
    return res.status(400).json({ ok: false, error: 'Missing order' })
  }
  const { orderNumber, customer, items, subtotal, notes } = order
  if (!orderNumber || !customer?.name || !customer?.phone || !customer?.address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ ok: false, error: 'Incomplete order data' })
  }

  const message = buildOrderMessage(order)

  // Resolve destination chat_id: env override, then bot's last chat via getUpdates
  let chatId = process.env.TELEGRAM_CHAT_ID
  if (!chatId) {
    try {
      const updatesRes = await fetch(`${TELEGRAM_API}/bot${token}/getUpdates`, {
        headers: { 'Content-Type': 'application/json' },
      })
      const updatesData = await updatesRes.json()
      if (updatesData.ok && updatesData.result && updatesData.result.length > 0) {
        const firstMessage = updatesData.result.find((u) => u.message || u.channel_post || u.my_chat_member)
        if (firstMessage) {
          chatId = (firstMessage.message?.chat?.id) ??
                    (firstMessage.channel_post?.chat?.id) ??
                    (firstMessage.my_chat_member?.chat?.id)
        }
      }
    } catch (e) {
      // fall through
    }
  }

  if (!chatId) {
    return res.status(500).json({
      ok: false,
      error: 'No TELEGRAM_CHAT_ID configured and could not auto-resolve chat. Please set TELEGRAM_CHAT_ID on Vercel.',
    })
  }

  const sendUrl = `${TELEGRAM_API}/bot${token}/sendMessage`
  try {
    const sendRes = await fetch(sendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    const data = await sendRes.json()
    if (data.ok) {
      return res.status(200).json({ ok: true, message: 'Order notification sent to Telegram' })
    }
    return res.status(502).json({ ok: false, error: 'Telegram send failed', detail: data })
  } catch (err) {
    return res.status(502).json({ ok: false, error: 'Telegram send request failed' })
  }
}

function buildOrderMessage(order) {
  const { orderNumber, customer, items, subtotal, notes } = order
  const lines = []
  lines.push('━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('🛍️ <b>NEW ORDER</b>')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━')
  lines.push(`<b>Order #:</b> ${orderNumber}`)
  lines.push('')
  lines.push('📦 <b>ITEMS</b>')
  items.forEach((item, i) => {
    lines.push(
      `${i + 1}. ${item.nameEn || item.name}\n` +
      `   Size: ${item.size} | Color: ${item.color}\n` +
      `   Qty: ${item.quantity} × $${Number(item.price).toFixed(2)} = <b>$${(item.quantity * item.price).toFixed(2)}</b>`
    )
  })
  lines.push('')
  const shipping = 0
  lines.push(`💰 <b>TOTAL:</b> $${Number(subtotal || 0).toFixed(2)}`)
  lines.push(`🚚 Shipping: Free`)
  lines.push('')
  lines.push('👤 <b>CUSTOMER</b>')
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  lines.push(`Address: ${customer.address}`)
  if (notes) lines.push(`Notes: ${notes}`)
  lines.push('')
  lines.push('⏰ ' + new Date().toLocaleString('en-KH', { timeZone: 'Asia/Phnom_Penh' }))
  lines.push('━━━━━━━━━━━━━━━━━━━━━━')
  return lines.join('\n')
}