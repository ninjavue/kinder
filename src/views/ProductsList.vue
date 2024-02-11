<template>
  <el-row justify="space-between">
    <h1>Mahsulotlar</h1>
    <el-button type="primary" @click="toggle = !toggle">
      <i class="fa-solid fa-plus mr-2"></i>
      Yangi mahsulot
    </el-button>
  </el-row>
  <el-divader />
  <div class="scroll">
    <el-table :data="products">
      <el-table-column prop="title" label="Mahsulot nomi"></el-table-column>
      <el-table-column prop="price" label="Mahsulot narxi">
        <template #default="scope">
          {{ scope.row.price.toLocaleString() }} so'm /
          {{ types[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column label="Ammallar" align="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row.id)">
            <i class="fa-solid fa-pen-to-square"></i>
          </el-button>
          <el-button type="danger" @click="deleteProduct(scope.row.id)">
            <i class="fa-solid fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="toggle"
    :title="`${toggleBtn ? 'Yangi mahsulot' : 'Mahsulotni tahrirlash'}`"
    width="500px"
  >
    <el-form :model="newProduct" label-position="top">
      <el-form-item label="Mahsulot nomi">
        <el-input v-model="newProduct.title"> </el-input>
      </el-form-item>
      <el-form-item label="Mahsulot turlar">
        <el-select v-model="newProduct.type" placeholder="Ro'yhatdan tanlang">
          <el-option
            v-for="(item, i) of types"
            :key="i"
            :label="item"
            :value="i"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Mahsulot narxi">
        <el-input v-model="newProduct.price" placeholder="Misol: 25 000">
          <template #append>
            so'm/{{ types[newProduct.type] || types[0] }}
          </template>
        </el-input>
      </el-form-item>
      <div align="right">
        <el-button @click="add" v-if="toggleBtn" type="primary"
          >Kiritish</el-button
        >
        <el-button @click="save" v-if="!toggleBtn" type="primary"
          >Tahrirlash</el-button
        >
        <el-button @click="cancel" type="danger">Bekor qilish</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      toggleDel: false,
      toggleBtn: true,
      newProduct: {},
      toggle: false,
      confrm: "",
    };
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    types() {
      return this.$store.getters.types;
    },
  },
  methods: {
    add() {
      this.$store.dispatch("addProduct", this.newProduct);
      this.$message({
        message: "Mahsulot qo'shildi",
        type: "success",
      });
      this.newProduct = {};
      this.toggle = false;
    },
    edit(id) {
      if (id) {
        this.$store.dispatch("getProduct", id).then((res) => {
          this.newProduct = res.data;
          this.toggle = true;
          this.toggleBtn = false;
        });
      }
    },
    deleteProduct(id) {
      if (id) {
        this.$store.dispatch("deleteProduct", id);
        this.$message({
          message: "Mahsulot o'chirildi",
          type: "success",
        });
      }
    },
    save() {
      this.$store.dispatch("editProduct", this.newProduct);
      this.$message({
        message: "Mahsulot tahrirlandi",
        type: "success",
      });
      this.newProduct = {};
      this.toggle = false;
      this.toggleBtn = true;
    },
    cancel() {
      this.newProduct = {};
      this.toggle = false;
      this.toggleBtn = true;
    },
  },
  mounted() {
    document.title = "Mahsulotlar";
  },
};
</script>

<style langscss>
.el-table {
  max-height: 355px;
  overflow-y: scroll;
}
.dialog-scroll {
  max-height: 200px;
  overflow-y: scroll;
}

@media (max-width: 800px) {
  .el-table {
    min-width: 600px;
  }
  .scroll {
    overflow-x: scroll;
  }
  .el-table .cell {
    --text-wrap: nowrap;
  }
}
@media (max-width: 610px) {
  .el-dialog {
    width: 400px;
  }
}
@media (max-width: 450px) {
  .el-dialog {
    width: 300px;
  }
}
</style>