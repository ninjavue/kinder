<template>
  <h1>Bosh sahifa</h1>
  <el-row>
    <el-col :span="12">
      <el-card class="mr-2">
        <h1>Ovqatlar soni</h1>
        <div class="cnt">{{ foods.length }}</div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="ml-2">
        <h1>Mahsulotlar soni</h1>
        <div class="cnt">{{ products.length }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  computed: {
    products() {
      return this.$store.getters.products;
    },
    foods() {
      return this.$store.getters.foods;
    },
  },
  mounted() {
    document.title = "Bosh sahifa";
  },
};
</script>
<style lang="scss">
.el-card {
  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
    text-align: center;
  }
  .cnt {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 40px;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .el-card {
    h1 {
      font-size: 16px;
    }
    .cnt {
      font-size: 18px;
    }
  }
}
</style>