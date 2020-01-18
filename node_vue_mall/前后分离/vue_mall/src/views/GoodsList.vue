<template>
  <div>
    <nav-header></nav-header>
    <div>
      <ul class="good-list">
        <li v-for="item in goodsList" :key="item.productName">
          <div class="pic">
            <a href="#">
              <img :src="'static/'+item.productImage" />
            </a>
          </div>
          <div class="main">
            <div class="name">{{item.productName}}</div>
            <div class="price">{{item.salePrice | currency('$')}}</div>
            <div>
               <el-button style="width:100%" @click="addCart(item.productId)">加入购物车</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import NavHeader from "./../components/NavHeader";
// import NavFooter from './../components/NavFooter'
// import NavBread from './../components/NavBread'
// import Modal from './../components/Modal'
import axios from "axios";
export default {
  data() {
    return {
      userName: "top",
      userPwd: "123456",
      goodsList: [],
      sortFlag: true,
      page: 1,
      pageSize: 8,
      busy: true,
      loading: false,
      mdShow: false,
      mdShowCart: false,
      priceFilter: [
        {
          startPrice: "0.00",
          endPrice: "100.00"
        },
        {
          startPrice: "100.00",
          endPrice: "500.00"
        },
        {
          startPrice: "500.00",
          endPrice: "1000.00"
        },
        {
          startPrice: "1000.00",
          endPrice: "5000.00"
        }
      ],
      priceChecked: "all",
      filterBy: false,
      overLayFlag: false
    };
  },
  mounted() {
    this.getGoodsList();
  },
  components: {
    NavHeader
  },
  methods: {
    getGoodsList(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      };
      this.loading = true;
      axios
        .get("/goods/list", {
          params: param
        })
        .then(response => {
          var res = response.data;
          this.loading = false;
          if (res.status == "0") {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list);

              if (res.result.count == 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
        });
    }
  }
};
</script>
<style>
.good-list > li {
  width: 23%;
  margin-right: 15px;
  margin-bottom: 15px;
  float: left;
  background: #fff;
  border: 2px solid #e9e9e9;
  transition: all 0.5s ease-out;
}
.good-list .main{
  padding: 20px 10px 10px 10px;
}

.good-list .main div{
  text-align: left;
    margin: 10px 20px;
}
.pic img{
  width: 100%;
}
.pic a{
      display: block;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
}
.login {
  width: 280px;
  height: 300px;
}
</style>