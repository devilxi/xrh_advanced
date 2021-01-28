<template>
  <div>
    <el-form inline :model="user" :rules="rules">

      <el-form-item label="审批人" prop="name">
        <el-input v-model="user.name" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="工号" prop="number">
        <el-input v-model="user.number" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="submit">提交</el-button>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validator = function (rule,value,callback){
      console.log(rule,'================>rule');
      if(value.length>3 &&value.length<10 ){
        callback();
      }else {
        callback(new Error('用户名必须大于3'));
      }
    };
    return {
      user:{
        'name':'',
        'number':''
      },
      rules:{
        name:[
          {required:true,trigger:'change',message:'不能为空'},
          {validator:validator,trigger: 'change'}
        ],
        number:[
          {required:true,trigger:'change',message:'不能为空'},
          {validator:validator,trigger: 'change'}
        ]
      },
    }
  },
  methods:{
    submit(){
      console.log(this.user,'1111111111');
    }
  },
  mounted() {
    console.log(this.user,'2222222222');
  },
  //局部守卫
  beforeRouteEnter(to,form,next){
    console.log('beforeRouteEnter');
    next();
  },
  beforeRouteLeave(){
    console.log('beforeRouteLeave')
  }
}
</script>