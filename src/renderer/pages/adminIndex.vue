<template>
  <div class="adminIndex">
      <navigator-bar />
      <div class=" content">
        <transition  enter-active-class=" animated zoomInRight">
            <router-view />
        </transition>
      </div>
  </div>
</template>

<script>
import navigatorBar from "@/components/navigatorBar";
import electron from "electron";
export default {
    name:"adminIndex",
    methods:{
       
    },
    components:{
        navigatorBar
    }

};
</script>

<style scoped lang="scss">
    .adminIndex
    {
        .content{
            position: absolute;
            top:50px;
            left: 0;
            width: 100%;
        }
    }
</style>
