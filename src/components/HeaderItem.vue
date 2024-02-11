<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div class="block mt-1">
      <el-avatar :size="50" :src="circleUrl" />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;

  .logo img {
    width: 150px;
    // height: 50px;
    display: block;
  }
  .block {
    margin-left: auto;
  }

  .el-avatar {
    cursor: pointer;
  }

  @media (max-width: 1050px) {
    .logo img {
      display: none;
    }
  }
}
</style>