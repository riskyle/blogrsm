export const useSidebar = () => {
    const isCollapsed = useState('sidebar.isCollapsed', () => false)
    const isMobile = useState('sidebar.isMobile', () => false)

    const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value
    }

    const collapseSidebar = () => {
        isCollapsed.value = true
    }

    const expandSidebar = () => {
        isCollapsed.value = false
    }

    const setMobile = (mobile: any) => {
        isMobile.value = mobile
        if (mobile) {
            isCollapsed.value = true
        }
    }

    // Computed properties
    const sidebarWidth = computed(() => isCollapsed.value ? '60px' : '250px')
    const shouldShowOverlay = computed(() => !isCollapsed.value && isMobile.value)

    return {
        isCollapsed: readonly(isCollapsed),
        isMobile: readonly(isMobile),
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
        setMobile,
        sidebarWidth,
        shouldShowOverlay
    }
}