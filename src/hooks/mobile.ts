import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useMobileStore } from '@/store';


export default function useMobileHook() {
  const mobileStore = useMobileStore();
  const  onResize=()=> {
    if (window.innerWidth <= 1024) {
      mobileStore.showAnchor = false
      mobileStore.is_pc = false
    } else {
      mobileStore.is_pc = true
    }
    if (window.innerWidth <= 768) {
      mobileStore.showCollapse = true
      mobileStore.hideAfter = 2000
      mobileStore.articleMenuNodeTooltipPlacement = 'top'
      mobileStore.asideWidth = 0
      mobileStore.splitInit = '0px'
      mobileStore.placement = "bottom"
    } else {
      mobileStore.showCollapse = false
      mobileStore.hideAfter = 0
      mobileStore.articleMenuNodeTooltipPlacement = 'right'
      mobileStore.placement = "right"
      mobileStore.asideWidth = 280
      mobileStore.splitInit = '300px'
    }
  }
  onMounted(async () => {
    if (window.innerWidth <= 1024) {
      mobileStore.showAnchor = false
      mobileStore.is_pc = false
    } else {
      mobileStore.is_pc = true
    }
    if (window.innerWidth <= 768) {
      mobileStore.showCollapse = true
      mobileStore.hideAfter = 2000
      mobileStore.articleMenuNodeTooltipPlacement = 'top'
      mobileStore.asideWidth = 0
      mobileStore.splitInit = '0px'
      mobileStore.placement = "bottom"
    } else {
      mobileStore.showCollapse = false
      mobileStore.hideAfter = 0
      mobileStore.articleMenuNodeTooltipPlacement = 'right'
      mobileStore.placement = "right"
      mobileStore.asideWidth = 280
      mobileStore.splitInit = '300px'
    }
    window.addEventListener("resize", onResize);
    // 首先我们获得视口高度并将其乘以1%以获得1vh单位的值
    let vh = window.innerHeight * 0.01
    // 然后，我们将——vh自定义属性中的值设置为文档的根
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    // 我们监听resize事件 视图大小发生变化就重新计算1vh的值
    window.addEventListener('resize', () => {
      // 我们执行与前面相同的脚本
      vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  })
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });


  return {
    useMobileHook,
  };
}
