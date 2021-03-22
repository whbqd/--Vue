<template>
  <Table border :columns="columns12" :data="data6">
    <template slot-scope="{ row }" slot="name">
      <strong>{{ row.name }}</strong>
    </template>
    <template slot-scope="{ index }" slot="action">
      <Button
        type="primary"
        size="small"
        style="margin-right: 5px"
        @click="show(index)"
        >View</Button
      >
      <Button type="error" size="small" @click="remove(index)">Delete</Button>
    </template>
  </Table>
</template>
<script>
export default {
  data() {
    return {
      columns12: [
        {
          title: "id",
          key: "id",
        },
        {
          title: "账号",
          key: "user",
        },
        {
          title: "密码",
          key: "password",
        },
        {
          title: "邮箱",
          key: "email",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data6: [],
    };
  },
  methods: {
    getData() {
      this.$axios({
        url: "view/queryAll",
        method: "post",
        params: {
          pageNow: 1,
          pageSize: 20,
        },
      }).then((res) => {
          res.code !== 100 ? this.$Message.error(res.message) : (this.data6 = res.data.list);
      });
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `用户名: ${this.data6[index].user}<br>密码: ${this.data6[index].password}<br>邮箱: ${this.data6[index].email}`,
      });
    },
    remove(index) {
      const id = this.data6[index].id;
      this.$axios({
        url: "view/del",
        method: "post",
        params: {
          id,
        },
      }).then((res) => {
        this.$Message.success(res.message);
        res.code === 100 && this.data6.splice(index, 1);
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>