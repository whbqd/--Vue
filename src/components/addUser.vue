<template>
  <div id="addUser">
    <span class="title">新增用户</span>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-contact" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          v-model="formInline.password"
          placeholder="Password"
        >
          <Icon type="md-key" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem prop="email">
        <Input type="email" v-model="formInline.email" placeholder="Email">
          <Icon type="ios-mail-open" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')"
          >Signin</Button
        >
        <Button @click="handleReset('formInline')" style="margin-left: 8px"
          >Reset</Button
        >
      </FormItem>
    </Form>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        email: "",
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async register() {
      return await this.$axios({
        url: "register",
        method: "post",
        data: {
          ...this.formInline,
        },
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.register().then((res) => {
            const code = res.code;
            const type = code === 100 ? "success" : "error";
            this.$Message[type](res.message);
            this.handleReset(name);
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>
<style lang="stylus" scoped>
#addUser {
  width: 100%;
  height: 100%;

  .title {
    display: inline-block;
    font-size: 17px;
    margin-bottom: 15px;
    font-weight: 600;
  }
}
</style>
