<template>
  <el-container>
    <el-header>
      <HeaderItem />
    </el-header>
    <el-container>
      <el-aside>
        <NavBar />
      </el-aside>
      <el-main>
        <el-card class="box-card">
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "./components/NavBar";
import HeaderItem from "./components/HeaderItem";

export default {
  components: {
    NavBar,
    HeaderItem,
  },
  mounted() {
    this.$store.dispatch("allProducts");
    this.$store.dispatch("allFoods");
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
