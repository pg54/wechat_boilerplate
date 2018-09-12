<template>
  <div>
    <div v-if="!showMarkdown" class="hello">
      <h1>{{ msg }}</h1>
      <p>
        For guide and recipes on how to configure / customize this project,<br>
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      </p>
      <h3>Installed CLI Plugins</h3>
      <ul>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      </ul>
      <h3>Essential Links</h3>
      <ul>
        <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
        <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
      </ul>
      <h3>Ecosystem</h3>
      <ul>
        <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
        <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
        <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
        <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
      </ul>
    </div>
    <div v-if="showMarkdown">
      <li>
        <input id="file" name="file" class="ipt" type="file" @change="handimg($event)" />
      </li>
      <li>
        <img id="previewImg" :src="previewImgSrc" alt="">
      </li>
      <li>
        <input id="btn_upload" @click="uploadImg" type="button" value="提交">
      </li>
    </div>


  </div>

</template>

<script>
  import {
    genUpToken
  } from '../common/qiniuToken.js';
  import axios from 'axios';
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        showMarkdown: true,
        previewImgSrc: '',
        postData: {
          file: null,
          token: null
        }
      }
    },
    methods: {
      handimg(e) {
        var file = e.srcElement.files[0]
        console.log(file)
        // var imgURL = window.URL.createObjectURL(file)
        // this.previewImgSrc = imgURL


        var reader = new FileReader()
        var _this = this;
        reader.onload = function (event) {
          var imgFile = event.target.result
          _this.previewImgSrc = imgFile
        };
        reader.readAsDataURL(file);

      },
      getBase64Image(img) {
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        // calculate the width and height, constraining the proportions 
        if (width > height) {
          if (width > 100) {
            height = Math.round(height *= 100 / width);
            width = 100;
          }
        } else {
          if (height > 100) {
            width = Math.round(width *= 100 / height);
            height = 100;
          }
        }
        canvas.width = width; /*设置新的图片的宽度*/
        canvas.height = height; /*设置新的图片的长度*/
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height); /*绘图*/
        var dataURL = canvas.toDataURL("image/png", 0.8);
        return dataURL.replace("data:image/png;base64,", "");
      },
      uploadImg() {
        var file = document.querySelector("#file").files[0];
        // var base64img = this.getBase64Image(file);
        var url = 'http://upload-z1.qiniup.com'
        var token;
        var policy = {};
        var ak = 'BBf8YEmfDYvN4dsFiduIIRE0R9A2GJux6aWM8NOg';
        var sk = 'h2L5lge7V97kd0Jmd9hzhFUNFUQUzpVVE';
        var bucket = 'note';
        var deadline = Math.round(new Date().getTime() / 1000) + 3600;
        policy.scope = 'note';
        policy.deadline = deadline;
        
        token = genUpToken(sk, sk, policy);
        console.log('token');
        console.log(token);
        const options = {
          method: 'POST',
          headers: {
            'Authorization': 'UpToken ' + token
          },
          data: this.previewImgSrc.split(',')[1],
          url: 'http://up.qiniu.com'
        }

        // var data = new FormData();
        // data.append('token', token);
        // data.append('file', file);
        // const options = {
        //         method: 'POST',
        //         url: 'http://up.qiniu.com',
        //         data: data
        //     }

        const formdata = new FormData()
        formdata.append('file', file)
        var tStr = `BBf8YEmfDYvN4dsFiduIIRE0R9A2GJux6aWM8NOg:q7f_tjdUPJsPMgwLfG9TvayyqgQ=:eyJzY29wZSI6Im5vdGUiLCJkZWFkbGluZSI6MTUzNjM4NzYwNn0=`
        formdata.append('token', tStr)
        formdata.append('key', 'key1.jpg')
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        var u1 = 'https://upload.qiniup.com/' //up.qbox.me    https://upload.qiniup.com/
        // axios.post(u1, formdata, config)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        var tokenBody = {
          ak: ak,
          sk: sk,
          bucket: bucket
        }

        axios.post('http://18.221.19.188:8080/upToken', tokenBody)
        .then(res => console.log(res.token))
        .catch()

        // axios(options)
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });




      }
    },
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>