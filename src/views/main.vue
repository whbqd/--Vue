
<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider
        breakpoint="lg"
        collapsible
        collapsed-width="0"
        v-model="isCollapsed"
      >
        <Menu
          active-name="1-2"
          theme="light"
          width="auto"
          :open-names="['1']"
          :style="{ height: '100%' }"
        >
          <Submenu name="1">
            <template slot="title">
              <Icon type="md-home" />
              主页
            </template>

            <MenuItem name="1-2" to="/main">
              <Icon type="logo-snapchat" />个人
            </MenuItem>
            <MenuItem name="1-3" to="/main/homeAuthor"
              ><Icon type="ios-contact-outline" />头像</MenuItem
            >
            <MenuItem name="1-1" to="/main/homeData"
              ><Icon type="ios-stats" />数据</MenuItem
            >
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="md-contacts" />
              详情
            </template>
            <MenuItem name="2-1" to="/main/detUser"
              ><Icon type="md-person" />用户</MenuItem
            >
            <MenuItem name="2-2" to="/main/detPerson"
              ><Icon type="logo-octocat" />个人</MenuItem
            >
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="md-person-add" />
              新增
            </template>
            <MenuItem name="3-1" to="/main/addUser"
              ><Icon type="md-swap" />账号</MenuItem
            >
            <MenuItem name="3-2" to="/main/addMsg"
              ><Icon type="md-information-circle" />信息</MenuItem
            >
            <MenuItem name="3-3" to="/main/leaving"
              ><Icon type="md-happy" />留言</MenuItem
            >
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          class="header"
          :style="{
            background: '#fff',
            boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'
          }"
        >
          <div class="title"><i class="iconfont htIcon"></i> 用户管理系统</div>
          <div class="unLogin">
            <span @click="unLogin">退出登录</span>
          </div>
        </Header>
        <Content :style="{ padding: '0 16px 16px' }">
          <Breadcrumb :style="{ margin: '16px 23px' }">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div :style="{ minHeight: '560px' }">
              <router-view></router-view>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  computed: {
    menuitemClasses: function () {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    unLogin() {
      this.$axios.get("view/logout").then((res) => {
        const code = res.code;
        const type = code === 100 ? "success" : "error";
        this.$Notice[type]({
          title: "退出",
          desc: res.message,
        });
        code === 100 && this.$router.push("/");
        window.localStorage.removeItem('token')
      });
    },
    
  },
};
</script>

<style scoped>
.htIcon::after {
  content: "\e749";
  color: #3a3a3a;
  margin-right: 3px;
}
#nav {
  position: fixed;
  
}
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.router-link-active {
  color: none;
}
</style>

<style lang="stylus" scoped>
.header {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  user-select: none;

  .unLogin {
    span {
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #ff5252;
      }
    }
  }
}
</style>