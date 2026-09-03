export type CartItem = {
  key: string
  sabor: string
  categoria: string
  preco: number
  quantidade: number
}

export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => [])
  const isOpen = useState('cart-open', () => false)
  const hydrated = useState('cart-hydrated', () => false)
  const config = useRuntimeConfig()

  if (import.meta.client && !hydrated.value) {
    try { items.value = JSON.parse(localStorage.getItem('belli-cart') || '[]') } catch { items.value = [] }
    hydrated.value = true
  }

  const persist = () => { if (import.meta.client) localStorage.setItem('belli-cart', JSON.stringify(items.value)) }
  const count = computed(() => items.value.reduce((total, item) => total + item.quantidade, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.preco * item.quantidade, 0))
  const formatPrice = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const add = (item: Omit<CartItem, 'quantidade'>) => {
    const existing = items.value.find(cartItem => cartItem.key === item.key)
    if (existing) existing.quantidade += 1
    else items.value.push({ ...item, quantidade: 1 })
    persist()
    isOpen.value = true
  }
  const decrease = (key: string) => {
    const item = items.value.find(cartItem => cartItem.key === key)
    if (!item) return
    if (item.quantidade === 1) remove(key)
    else item.quantidade -= 1
    persist()
  }
  const remove = (key: string) => { items.value = items.value.filter(item => item.key !== key); persist() }
  const clear = () => { items.value = []; persist() }
  const whatsappHref = computed(() => {
    const lines = items.value.map(item => `${item.quantidade}x ${item.categoria} - ${item.sabor} (${formatPrice(item.preco * item.quantidade)})`)
    const message = `Olá, Belli Cucina! Quero fazer este pedido:\n${lines.join('\n')}\nTotal: ${formatPrice(total.value)}`
    return `https://wa.me/${config.public.whatsappNumber}?text=${encodeURIComponent(message)}`
  })

  return { items, isOpen, count, total, formatPrice, add, decrease, remove, clear, whatsappHref }
}
