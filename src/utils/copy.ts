// 复制内容到粘贴板

const copyText = async (val: any) => {
  if (navigator.clipboard && navigator.permissions) {
    await navigator.clipboard.writeText(val)
  } else {
    const textArea = document.createElement('textArea')
    textArea.value = val
    textArea.style.width = 0
    textArea.style.position = 'fixed'
    textArea.style.left = '-999px'
    textArea.style.top = '10px'
    textArea.setAttribute('readonly', 'readonly')
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

export { copyText }
