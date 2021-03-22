<template>
  <div id="homeIndex">
    <div class="header">
      <!-- 头像 -->
      <div
        class="img"
        :class="{ autorHover: !isHover }"
        @mouseleave="
          () => {
            this.isHover = true;
          }
        "
        @mouseenter="
          () => {
            this.isHover = false;
          }
        "
        @click="
          () => {
            this.$router.push('/main/Homeauthor');
          }
        "
      >
        <img
          src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          alt=""
          v-show="isHover"
        />
        更改头像
      </div>
      <div class="info">
        <div class="name">{{ userName }}</div>
        <div class="flag">
          <Tag
            v-for="item in count"
            :key="item"
            :name="item"
            closable
            @on-close="handleClose2"
            color="success"
            >haha</Tag
          >

          <Button
            :style="{ background: 'transparentify' }"
            icon="ios-add"
            type="dashed"
            size="small"
            @click="handleAdd"
            v-if="count.length < 3"
            >添加标签</Button
          >
        </div>
      </div>
    </div>
    <Timeline style="margin-top:40px">
      <TimelineItem>
        <p class="time">1976年</p>
        <p class="content">Apple I 问世</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">1984年</p>
        <p class="content">发布 Macintosh</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">2007年</p>
        <p class="content">发布 iPhone</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">2010年</p>
        <p class="content">发布 iPad</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">2011年10月5日</p>
        <p class="content">史蒂夫·乔布斯去世</p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: [0, 1, 2],
      isHover: true,
      userName: "",
    };
  },
  methods: {
    handleAdd() {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1);
      } else {
        this.count.push(0);
      }
    },
    handleClose2(event, name) {
      const index = this.count.indexOf(name);
      this.count.splice(index, 1);
    },
    // 获取用户名
    getUserName() {
      this.$axios.get("view/getUserOfLogin").then((res) => {
        window.localStorage.setItem("userName", res.data.user);
        this.userName = res.data.user;
      });
    },
  },
  created() {
    this.getUserName();
  },
};
</script>
<style lang="stylus" scoped>
#homeIndex {
  width: 100%;

  .header {
    box-sizing: border-box;
    padding: 0 15px;
    background: #fff;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px #bdc3c7;
    border-radius: 10px;
    transition: all 0.7s;

    &:hover {
      box-shadow: 0 0 20px #bdc3c7;
    }

    .img {
      width: 90px;
      height: 90px;
      min-width: 90px;
      border-radius: 50%;
      overflow: hidden;
      text-align: center;
      line-height: 90px;
      cursor: pointer;
      color: #000;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex-wrap: wrap;
      overflow: hidden;

      .name {
        width: 100px;
        height: 60px;
        text-align: left;
        margin-left: 10px;
        line-height: 85px;
        font-size: 19px;
        color: #000;
      }

      .flag {
        width: 300px;
        height: 60px;
        overflow: hidden;
        display: flex;
        // justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
    }

    .setting {
      margin-left: 50px;
      width: 70px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #999;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        border-color: #2980b9;
        color: #2980b9;
      }
    }
  }
}

.autorHover {
  background: rgba(0, 0, 0, 0.2);
  opacity: 0.6;
}
</style>

