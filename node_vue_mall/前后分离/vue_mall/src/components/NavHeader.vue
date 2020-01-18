<template>
  <header class="header">
    <div class="navlogin">
      <a v-if="!nickName" @click="showlogin">login</a>
      <a v-if="nickName" @click="logout">logOut</a>
    </div>
    <div v-if="loginModalFlag" class="loginmodel">
      <p>login</p>
      <ul>
        <li>
          <input
            type="text"
            tabindex="1"
            name="loginname"
            v-model="userName"
            placeholder="User Name"
            data-type="loginname"
          />
        </li>
        <li>
          <input
            type="password"
            tabindex="2"
            name="password"
            v-model="userPwd"
            placeholder="Password"
            @keyup.enter="login"
          />
        </li>
      </ul>
      <el-button @click="login">login</el-button>
    </div>
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
  </header>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userName: "top",
      userPwd: "123456",
      errorTip: false,
      loginModalFlag: false
    };
  },
  computed: {
    ...mapState(["nickName", "cartCount"])
  },
  /*nickName(){
          return this.$store.state.nickName;
        },
        cartCount(){
          return this.$store.state.cartCount;
        }*/
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      axios.get("/users/checkLogin").then(response => {
        var res = response.data;
        var path = this.$route.pathname;
        if (res.status == "0") {
          // nickName
          this.$store.commit("updateUserInfo", res.result);
          this.loginModalFlag = false;
        } else {
          this.loginModalFlag = true;
          if (this.$route.path != "/goods") {
            this.$router.push("/goods");
          }
        }
      });
    },
    showlogin() {
      this.loginModalFlag = true;
    },
    login() {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true;
        return;
      }
      axios
        .post("/users/login", {
          userName: this.userName,
          userPwd: this.userPwd
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.errorTip = false;
            this.mdShow = false;
            this.$store.commit("updateUserInfo", res.result.userName);
            this.loginModalFlag = false;
          } else {
            this.errorTip = true;
          }
        });
    },
    logout() {
      axios.post("/users/logout").then(response => {
        let res = response.data;
        if (res.status == "0") {
          // this.nickName = '';
          this.$store.commit("updateUserInfo", res.result.userName);
        }
      });
    }
  }
};
</script>

<style>
.md-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
}
.navlogin {
  width: 100%;
  height: 25px;
  margin-right: 30px;
  text-align: right;
  background-color: #33f1d4fa;
}
.header {
  width: 100%;
  background-color: white;
  font-family: "moderat", sans-serif;
  font-size: 16px;
  position: relative;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 70px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 20px 10px 20px;
}
.loginmodel {
  width: 500px;
  height: 200px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  border: 1px solid;
  z-index: 300;
  background-color: white;
  margin: auto;
}
</style>