<template>
  <div id="leaving">
    <span class="title">留言区</span>
    <div class="item">
      <div class="avatar">
        <img src="../assets/avatar.jpeg" alt="" />
      </div>
      <div class="content">
        <textarea
          name="msg"
          rows="5"
          placeholder="发条友善的留言"
          class="ipt-txt"
          v-model="content"
          spellcheck="false"
        ></textarea>
      </div>
      <div class="submit" @click="submitData">发表</div>
    </div>
    <List :loading="isLoading" size='large'>
      <ListItem v-for="item in list" :key="item.id">
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          :title="item.name"
          :description="item.desc"
        />
        <Time :time="new Date(item.date)" :style="{ marginLeft: '15px' }" />
        <template slot="action">
          <li style="color: #38ada9" @click="delData(item.id, item.name)">
            <Icon type="md-trash" :size="20" />
          </li>
        </template>
      </ListItem>
    </List>
    <Page
      :style="{ marginTop: '20px' }"
      :total="count"
      :page-size="pageSize"
      :current="pageNow"
      @on-change="changepage"
      @on-page-size-change="changepagesize"
      show-total
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      content: "",
      count: 0, //总条数
      pageSize: 50, // 每页显示数量
      pageNow: 1, //当前页
      isLoading: true,
    };
  },
  methods: {
    // 获取留言列表
    async getList(pageNow, pageSize) {
      this.isLoading = true;
      return await this.$axios({
        url: "leaving/view/getLeaving",
        method: "post",
        params: {
          pageNow: pageNow,
          pageSize: pageSize,
        },
      });
    },
    // 获取用户名
    async getUserName() {
      return await this.$axios.get("view/getUserOfLogin");
    },
    // 发表
    async submitLeaving(userName) {
      return await this.$axios({
        url: "leaving/view/submitLeaving",
        method: "post",
        params: {
          name: userName,
          desc: this.content,
        },
      });
    },
    // 删除
    async delLeaving(id) {
      return await this.$axios({
        url: "leaving/view/delLeaving",
        method: "post",
        params: {
          id,
        },
      });
    },
    getData(pageNow, pageSize) {
      this.getList(pageNow, pageSize).then((res) => {
        if (res.code === 100) {
          //  count: 0, //总条数
          // pageSize: 0, // 每页显示数量
          // currentPage: 0, //当前页
          this.list = res.data.list.reverse();
          this.count = res.data.total;
          this.isLoading = false;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    submitData() {
      if (!this.content.trim()) {
        this.$Message.error("留言不能为空");
        
        return;
      }
      // 获取用户名
      this.getUserName().then((res) => {
        const userName = res.data.user;
        if (!userName) {
          this.$Message.error(res.message);
          return;
        }
        this.submitLeaving(userName).then((res) => {
          // 提交处理
          console.log(res);
          const type = res.code === 100 ? "success" : "error";
          this.$Message[type](res.message);
          if (res.code === 100) {
            this.getData(this.pageNow, this.pageSize);
            this.content = "";
          }
        });
      });
    },
    delData(id, thisName) {
      this.getUserName().then((res) => {
        const userName = res.data.user;
        if (!userName) {
          this.$Message.error(res.message);
          return;
        }
        if (thisName !== userName) {
          this.$Message.error("你没有权限删除非己留言!");
          return;
        }
        this.delLeaving(id).then((res) => {
          const type = res.code === 100 ? "success" : "error";
          this.$Message[type](res.message);
          res.code === 100 && this.getData(this.pageNow, this.pageSize);
        });
      });
    },
    changepage(val) {
      console.log(val);
      this.pageNow = val;
      this.getData(this.pageNow, this.pageSize);
    },
    changepagesize(){
      
    }
  },
  created() {
    this.getData(this.pageNow, this.pageSize);
  },
};
</script>

<style lang="stylus" scoped>
#leaving {
  width: 100%;
  height: 100%;

  .title {
    display: inline-block;
    font-size: 17px;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .item {
    margin-top: 0px;
    max-width: 800px;
    height: 100px;
    display: flex;
    user-select: none;

    .avatar {
      flex: 1;
      display: flex;
      align-items: center;
      margin-right 10px
      img {
        width: 40px;
        border-radius: 50%;
      }
    }

    .content {
      flex: 13;
      display: flex;
      align-items: center;

      .ipt-txt {
        width: 100%;
        height: 70px;
        outline: none;
        padding: 8px;
        box-sizing: border-box;
        resize: none;
        color: #555;
        border: 1px solid #e5e9ef;
        border-radius: 4px;
        background: #fff;
      }
    }

    .submit {
      width: 70px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #fff;
      background: #00a1d6;
      margin-left: 15px;
      margin-top: auto;
      margin-bottom: auto;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      box-sizing: border-box;
      font-weight: 700;

      &:hover {
        background: #00b5e5;
      }
    }
  }
}
</style>