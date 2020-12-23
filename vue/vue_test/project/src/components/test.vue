<template>
  <div>
    <img :src="imgSrc"/>
    <div class="list" v-for="(item,index) in awyLiat" v-bind:key="index">
      <div>{{item.amount}}</div>
      <div class="user-item">
        <div v-for="(item1,index) in item.showUser" v-bind:key="index" >
          <div class="user-item-user" @click="goClick()"> {{item1}}</div>
        </div>
        <div @click="click_more(item)" v-show="item.users.length >12">点击获取个别更多数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import jsonData from "../json/1.json";
export default {
  data(){
    return{
      imgSrc:'11',
      ary:[],
      awyLiat:[],
      showList:[]
    }
  },
  methods:{
    goClick(){
      console.log('12');
    },
    click_more(item){
      item.showUser = [...item.showUser,...item.users.splice(0,24)];
    }
  },
  beforeMount() {
    let startTime = new Date().valueOf();
    jsonData.data.records.forEach((item)=>{
      this.awyLiat = item.records;
      item.records.forEach((item1)=>{
        item1.showUser = item1.users.splice(0,12);
        item1.count =12;
        // this.ary = [...this.ary,...item1.users];
        this.ary =  this.ary.concat(item1.users);
        // item1.users.forEach((user)=>{
        //   this.ary.push(user);
        // });
      });
    });
    let endTime = new Date().valueOf();
    console.log(endTime-startTime , "===========>");
    console.log( this.ary,' this.awyLiat')
  }
}
</script>
<style>
.img{
  height: 300px;
  width: 600px;
}
.user-item{
  background-color: red;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.user-item-user{
  height: 50px;
  width: 120px;
  line-height: 50px
}
</style>