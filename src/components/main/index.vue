
<template>
    <main :style="{width:'100%',height:'100%'}">
        <hualin-header></hualin-header>
        <hualinContent></hualinContent>
    </main>
</template>

<script>
import hualinHeader from './header'
import hualinContent from './centent'
export default {
    components:{hualinHeader,hualinContent}
}
</script>