export const useSidebar = () => {
    // i only used isCollapsed only
    const isCollapsed = useState('sidebar.isCollapsed', () => false)
    
    // and the rest of the code is not used
    // but i will keep it here for future reference
    const supabase = useSupabaseClient()
    const navigateTo = useRouter().push
    const isMobile = useState('sidebar.isMobile', () => false)

    // also the toggleSidebar is used
    const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value
    }

    const collapseSidebar = () => {
        isCollapsed.value = false
    }

    const expandSidebar = () => {
        isCollapsed.value = true
    }

    const setMobile = (mobile: any) => {
        isMobile.value = mobile
        if (mobile) {
            isCollapsed.value = true
        }
    }

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