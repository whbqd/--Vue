<template>
  <div id="homeAuthor">
    <h1 style="margin-bottom: 10px">头像</h1>
    <Upload
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048" 
      type="drag"
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击或者拖拽上传头像</p>
      </div>
    </Upload>
    <Button type="success" long>SUBMIT</Button>
  </div>
</template>