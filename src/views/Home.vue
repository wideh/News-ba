<template>
  <div class="board-row" v-for="(item ,i) in list" :key="i">
    <button v-for="(item1,ind) in list" :key="ind" class="square">{{item1+i*3}}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  // data() {
  //   return {
  //     list: [1, 2, 3],
  //   }
  // },
  setup(props){
    let list = ref<number[]>([1, 2, 3])
    console.log(list.value)
    return {
      list
    }
  }
})
</script>

<style lang="less">
.board-row{
  &:after {
    clear: both;
    content: "";
    display: table;
  }
  .square {
    background: #fff;
    border: 1px solid #dd2222;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
  }
}
</style>
