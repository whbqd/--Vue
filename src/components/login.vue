<template>
  <div id="login" @mousemove="eyeRote($event)">
    <slot></slot>
    <div id="owl-login" class="login-owl" :class="{ password: isFocusInPwd }">
      <div class="hand"></div>
      <div class="hand hand-r"></div>
      <div class="arms">
        <div class="arm"></div>
        <div class="arm arm-r"></div>
      </div>
      <div class="eye">
        <div class="eyes"></div>
        <div class="eyes"></div>
      </div>
    </div>
    <div class="msg" ref="msg"></div>
    <i
      class="out iconfont outIcon"
      title="关闭"
      @click="() => this.$Message.error('对方不想说话,并向你抛了个异常!')"
    ></i>
    <div class="author">
      <i
        class="iconfont authorIcon"
        :class="{ styleInput: login.user && login.password }"
      ></i>
    </div>
    <div class="content">
      <div class="item username" :class="{ styleBorder: login.user }">
        <label for="username"
          ><i
            :class="{ styleInput: login.user, left: login.user }"
            class="iconfont userIcon"
          ></i></label
        ><input
          type="text"
          id="username"
          v-model="login.user"
          spellcheck="false"
          autocomplete="off"
        />
      </div>
      <div class="item password" :class="{ styleBorder: login.password }">
        <label for="password"
          ><i
            :class="{ styleInput: login.password, left: login.password }"
            class="iconfont passwordIcon"
          ></i></label
        ><input
          type="password"
          id="password"
          v-model="login.password"
          @focus="
            () => {
              this.isFocusInPwd = true;
            }
          "
          @blur="
            () => {
              this.isFocusInPwd = false;
            }
          "
        />
      </div>
    </div>
    <div
      class="next"
      title="登录"
      @click="submitLogin"
      :class="{ nextBoder: login.user && login.password }"
    >
      <i class="iconfont nextIcon" title="登录"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login: {
        user: "",
        password: "",
      },
      isFocusInPwd: false,
      timer: null,
    };
  },
  methods: {
    exReg(obj) {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop) && !obj[prop]) {
          return false;
        }
      }
      return true;
    },
    submitLogin() {
      if (!this.exReg(this.login)) {
        this.msg("账号或密码为空");
        return;
      }
      this.$axios
        .post("login", {
          ...this.login,
        })
        .then((res) => {
          const code = res.code;
          const type = code === 100 ? "success" : "error";
          type === 'success' ? this.$Notice[type]({
            title: "登录",
            desc: res.message,
          }) : this.msg('账号或密码密码错误');
          if (res.code === 100) {
            window.localStorage.setItem("token", res.data);
            this.$router.push("/main");
          } else {
            this.login.password = "";
          }
        });
    },
    eyeRote(e) {
      // console.log(e);
      const eyes = document.querySelectorAll(".eyes");
      eyes.forEach((item) => {
        const x = item.offsetLeft + item.clientWidth / 2; //眼睛x轴
        const y = item.offsetTop + item.clientHeight / 2; //眼睛y轴
        const rad = Math.atan2(e.pageX - x, e.pageY - y);
        const rot = rad * (180 / Math.PI) * -1 + 180;
        item.style.transform = `rotate(${rot + 15}deg)`;
      });
    },
    msg(msg) {
      console.log(msg);
      if(this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.$refs["msg"].innerText = msg;
      this.$refs["msg"].style.opacity = 1;
      this.timer = setTimeout(() => {
        this.$refs["msg"].style.opacity = 0;
        clearTimeout(this.timer);
      }, 3000);
    },
  },

  created() {},
};
</script>

<style lang="stylus" scoped>
.userIcon::after {
  content: '\e611';
}

.passwordIcon::after {
  content: '\e697';
}

.outIcon::after {
  content: '\e60a';
}

.nextIcon::after {
  content: '\e602';
}

.authorIcon::after {
  content: '\e604';
}

#login {
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform-origin: 0 0 0;
  transform: scale(1.3) translate(-50%, -50%);
  width: 380px;
  height: 300px;
  background: #18212a;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 0 50px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 5px #18212a, 0 0 15px #18212a, 0 0 20px #18212a;

  .author {
    margin-top: 17px;
    // background red
    text-align: center;

    i {
      transition: all 0.8s;
      font-size: 34px;
    }
  }

  .content {
    margin-top: 0px;

    .item {
      position: relative;
      width: 100%;
      height: 70px;
      box-sizing: border-box;
      border-bottom: 2px solid #fff;

      &::after {
        content: '';
        transition: width 0.4s;
        width: 0;
        height: 2px;
        background: #05c46b;
        position: absolute;
        left: 0;
        bottom: -2px;
      }

      label {
        display: inline-block;
        width: 30px;
        height: 100%;
        line-height: 70px;
        text-align: center;

        i {
          font-size: 25px;
          transition: all 0.9s;
          position: relative;
          left: 10px;
        }
      }

      #password {
        font-size: 26px;
      }

      input {
        width: calc(100% - 30px - 50px);
        height: 30px;
        margin-left: 25px;
        background: none;
        border: none;
        outline: none;
        color: #fff;
        line-height: 30px;
        font-size: 18px;
        letter-spacing: 1px;
      }
    }
  }

  .out {
    position: absolute;
    right: 20px;
    top: 12px;
    color: #ff5e57;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: rotate(360deg);
    }
  }

  .next {
    position: absolute;
    left: 50%;
    bottom: 23px;
    transform: translateX(-50%);
    font-size: 18px;
    color: #05c46b;
    cursor: pointer;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    transition: all 0.5s;
    border: 3px solid #fff;

    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      transform-origin: 50% 50% 0;
      transition: all 0.3s;
    }

    &:hover {
      width: 50px;
      height: 50px;
      background: #05c46b;
      box-shadow: 0 0 5px #05c46b, 0 0 10px #35a772, 0 0 15px #35a772;
      border-color: #05c46b;
      border-radius: 50%;
    }

    &:hover > i {
      color: #fff !important;
      font-size: 28px;
    }
  }
}

.styleInput {
  color: #05c46b;
}

.styleBorder::after {
  width: 100% !important;
}

.nextBoder {
  border-color: #05c46b !important;
}

.nextBoder i {
  color: #05c46b !important;
}

.left {
  left: 0px !important;
}
</style>

<style scoped>
#owl-login {
  background-image: url(../assets/mty2.png);
  -webkit-background-size: 211px 108px;
  -moz-background-size: 211px 108px;
  background-size: 211px 108px;
  width: 211px;
  height: 108px;
  overflow: hidden;
  position: absolute;
  top: -100px;
  left: 50%;
  margin-left: -111px;
}
#login #owl-login.password .hand {
  -webkit-transform: translateX(44px) translateY(-15px) scale(0.7);
  -moz-transform: translateX(44px) translateY(-15px) scale(0.7);
  -o-transform: translateX(44px) translateY(-15px) scale(0.7);
  -ms-transform: translateX(44px) translateY(-15px) scale(0.7);
  transform: translateX(44px) translateY(-15px) scale(0.7);
}
#login #owl-login.password .hand.hand-r {
  -webkit-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -moz-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -o-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -ms-transform: translateX(-42px) translateY(-15px) scale(0.7);
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}

#login #owl-login.password .arms .arm {
  -webkit-transform: translateY(-40px) translateX(40px);
  -moz-transform: translateY(-40px) translateX(40px);
  -o-transform: translateY(-40px) translateX(40px);
  -ms-transform: translateY(-40px) translateX(40px);
  transform: translateY(-40px) translateX(40px);
}
#login #owl-login.password .arms .arm.arm-r {
  -webkit-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -moz-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -o-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -ms-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
#owl-login .hand {
  width: 34px;
  height: 34px;
  -webkit-border-radius: 40px;
  border-radius: 40px;
  background-color: #472d20;
  -webkit-transform: scaleY(0.6);
  -moz-transform: scaleY(0.6);
  -o-transform: scaleY(0.6);
  -ms-transform: scaleY(0.6);
  transform: scaleY(0.6);
  -webkit-transition: 0.3s ease-out;
  -moz-transition: 0.3s ease-out;
  -o-transition: 0.3s ease-out;
  -ms-transition: 0.3s ease-out;
  transition: 0.3s ease-out;
  position: absolute;
  left: 14px;
  bottom: -8px;
}
.hand.hand-r {
  left: 165px !important;
}

#owl-login .arms {
  top: 58px;
  position: absolute;
  width: 100%;
  height: 41px;
  z-index: 999;
  overflow: hidden;
}
#owl-login .arms .arm {
  background-image: url(http://v.bootstrapmb.com/2018/9/4ma5s2295/images/owl-login-arm@2x.png);
  -webkit-background-size: 40px 65px;
  -moz-background-size: 40px 65px;
  background-size: 40px 65px;
  transition: all 0.4s;
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 50px;
  transform: rotate(-20deg);
}

#owl-login .arms .arm.arm-r {
  -webkit-transform: rotate(20deg) scaleX(-1);
  -moz-transform: rotate(20deg) scaleX(-1);
  -o-transform: rotate(20deg) scaleX(-1);
  -ms-transform: rotate(20deg) scaleX(-1);
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}

.eye {
  width: 98px;
  height: 42px;
  /* background: #000; */
  position: absolute;
  left: 59px;
  top: 51px;
  display: flex;
  justify-content: space-between;
}
.eye .eyes {
  width: 18px;
  height: 18px;
  background: #000;
  border-radius: 50%;
  margin: 22px auto;
  position: relative;
}
.eyes::after {
  content: "";
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: 3px;
  top: 1px;
}
.eyes:nth-child(2)::after {
  right: 2px;
}
.msg {
  position: absolute;
  right: -50px;
  top: -100px;
  width: 150px;
  height: 50px;
  border-radius: 40px;
  background: #1e272e;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0;
  transition: all 0.4s;
}
.msg::before {
  content: "";
  width: 13px;
  height: 10px;
  border-radius: 10px;
  background: #1e272e;
  position: absolute;
  left: -10px;
  bottom: -7px;
  opacity: 0.7;
}
.msg::after {
  content: "";
  width: 11px;
  height: 10px;
  border-radius: 10px;
  background: #1e272e;
  position: absolute;
  left: -25px;
  bottom: -25px;
  opacity: 0.5;
}
</style>