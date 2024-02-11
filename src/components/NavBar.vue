<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <li class="first"></li>
    <li v-for="(item, i) of list" :index="i" :key="i">
      <router-link :to="item.link">
        <span class="icon"> <i :class="item.icon"></i> </span
        >{{ item.title }}</router-link
      >
    </li>
  </el-menu>
  <button class="aside-btn" @click="toggle = true">
    <i class="fa-solid fa-bars"></i>
  </button>

  <el-drawer
    ref="drawerRef"
    v-model="toggle"
    :before-close="handleClose"
    direction="ltr"
    class="demo-drawer"
    size="300px"
  >
    <ul class="dialog-mobile">
      <li class="logo">
        <img src="../assets/logo.png" alt="" />
      </li>
      <li v-for="(item, i) of list" :index="i" :key="i" @click="toggle = false">
        <router-link :to="item.link">
          <span class="icon"> <i :class="item.icon"></i> </span
          >{{ item.title }}</router-link
        >
      </li>
    </ul>
  </el-drawer>
</template>

<script >
export default {
  data() {
    return {
      toggle: false,
      list: [
        {
          title: "Bosh Sahifa",
          link: "/",
          icon: "fas fa-home",
        },
        {
          title: "Mahsulotlar",
          link: "/product",
          icon: "fa-brands fa-product-hunt",
        },
        {
          title: "Taomlar",
          link: "/food",
          icon: "fa-solid fa-utensils",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.aside-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  display: none;
  i {
    font-size: 30px;
    width: 50px;
    height: 40px;
    color: #409eff;
  }
}
.el-menu {
  min-height: calc(100vh - 60px);
  .first {
    padding: 30px 0;
  }
  a {
    text-decoration: none;
    color: #333;
    display: block;
    padding: 15px 20px;
    .icon {
      margin-right: 10px;
    }

    &:hover {
      background-color: #409eff;
      color: #fff;
    }
    &.router-link-active {
      background-color: lighten($color: #409eff, $amount: 10);
      color: #fff;
    }
  }
}
.dialog-mobile {
  margin: -20px;
  .first {
    padding: 30px 0;
  }
  a {
    text-decoration: none;
    color: #333;
    display: block;
    padding: 15px 20px;
    .icon {
      margin-right: 10px;
    }

    &:hover {
      background-color: #409eff;
      color: #fff;
    }
    &.router-link-active {
      background-color: lighten($color: #409eff, $amount: 10);
      color: #fff;
    }
  }
}

.logo {
  width: 200px;
  overflow: hidden;
  margin-top: -40px;
  margin-bottom: 40px;
  img {
    width: 100%;
    // height: 50px;
    display: block;
    margin-bottom: -20px;
  }
}

@media (max-width: 1050px) {
  .aside-btn {
    display: block;
  }
  .el-menu-vertical-demo {
    display: none;
  }
}
</style>