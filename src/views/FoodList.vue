<template>
  <el-row justify="space-between">
    <h1>Ovqatlar ro'yhati</h1>
    <el-button type="primary" @click="toggle = !toggle">
      <i class="fa-solid fa-plus mr-2"></i>
      Yangi ovqat
    </el-button>
  </el-row>
  <el-divader />
  <div class="scroll">
    <el-table :data="foods">
      <el-table-column prop="title" label="Taom nomi"></el-table-column>
      <el-table-column label="Barcha mahsulotlar">
        <template #default="scope">
          <span
            v-for="(product, index) of getProduct(scope.row.products)"
            :key="index"
          >
            {{ product }}
            <span v-if="index !== getProduct(scope.row.products).length - 1"
              >,
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Summa">
        <template #default="scope">
          {{ scope.row.summa.toLocaleString() }} so'm
        </template>
      </el-table-column>
      <el-table-column label="Ammallar" align="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row.id)">
            <i class="fa-solid fa-pen-to-square"></i>
          </el-button>
          <el-button type="danger" @click="deleteFood(scope.row.id)">
            <i class="fa-solid fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="toggle"
    :title="`${toggleBtn ? 'Yangi Taom' : 'Taomni tahrirlash'}`"
    width="500px"
  >
    <el-form :model="newFood" label-position="top">
      <el-form-item label="Taom nomi">
        <el-input v-model="newFood.title"> </el-input>
      </el-form-item>
      <div class="dialog-scroll">
        <el-row v-for="(item, index) of newFood.products" :key="index">
          <el-col :span="12">
            <el-form-item class="mr-5" label="Mahsulot ">
              <el-select
                v-model="item.product"
                placeholder="Ro'yhatdan tanlang"
              >
                <el-option
                  v-for="(item, i) of products"
                  :key="i"
                  :label="item.title"
                  :value="item.id"
                  :disabled="check(item.id)"
                  @change="calc()"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="ml-5"
              :label="`Og'irligi/${getType(item.product) || 'gr'}`"
            >
              <el-input-number
                controls-position="right"
                min="0"
                v-model="item.weight"
                @blur="calc()"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-button type="success" @click="more">
        <i class="fa-solid fa-plus mr-2"></i>
      </el-button>
      <el-divider />
      <b>Summa:</b> {{ summa.toLocaleString() }} so'm
      <el-divider />

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
      summa: 0,
      toggleDel: false,
      toggleBtn: true,
      newFood: {
        summa: 0,
        products: [
          {
            product: "",
            weight: 0,
          },
        ],
      },
      toggle: false,
      confrm: "",
    };
  },
  computed: {
    foods() {
      return this.$store.getters.foods;
    },
    products() {
      return this.$store.getters.products;
    },
    types() {
      return this.$store.getters.types;
    },
    typesList() {
      return this.$store.getters.typesList;
    },
  },
  methods: {
    getProduct(p) {
      let f = [];
      p.forEach((item) => {
        let pro = this.products.find((p) => p.id == item.product);
        f.push(pro.title);
      });
      return f;
    },
    calc() {
      let sum = 0;
      this.newFood.products.forEach((item) => {
        let product = this.products.find((p) => p.id == item.product);
        if (product) {
          let p = product.price * item.weight;
          if (product.type !== 2) {
            p = Math.round(p / 1000);
          }
          sum += p;
        }
      });
      this.summa = sum;
    },
    getType(id) {
      let product = this.products.find((item) => item.id === id);
      if (product) {
        return this.typesList[product.type];
      } else {
        return "";
      }
    },
    check(id) {
      let index = this.newFood.products.findIndex((item) => item.product == id);
      return index !== -1 ? true : false;
    },
    more() {
      if (
        this.newFood.products.at(-1).product.length > 0 &&
        this.newFood.products.at(-1).weight > 0
      ) {
        this.newFood.products.push({ product: "", weight: 0 });
      }
    },
    add() {
      this.newFood.products = this.newFood.products.filter((item) => {
        if (item.product && item.weight > 0) {
          return item;
        }
      });
      this.newFood.summa = this.summa;

      this.$store.dispatch("addFood", this.newFood);
      this.$message({
        message: "Taom qo'shildi",
        type: "success",
      });
      this.summa = 0;
      this.newFood = {};
      this.toggle = false;
    },
    edit(id) {
      if (id) {
        this.$store.dispatch("getFood", id).then((res) => {
          this.newFood = res.data;
          this.summa = res.data.summa;
          this.toggle = true;
          this.toggleBtn = false;
        });
      }
    },
    deleteFood(id) {
      if (id) {
        this.$store.dispatch("deleteFood", id);
        this.$message({
          message: "Taom o'chirildi",
          type: "success",
        });
      }
    },
    save() {
      this.newFood.summa = this.summa;
      this.$store.dispatch("editFood", this.newFood);
      this.$message({
        message: "Taom tahrirlandi",
        type: "success",
      });
      this.newFood = {};
      this.toggle = false;
      this.toggleBtn = true;
    },
    cancel() {
      this.newFood = {};
      this.toggle = false;
      this.toggleBtn = true;
    },
  },
  mounted() {
    document.title = "Ovqatlar sahifasi";
  },
};
</script>
  
  <style lang="scss">
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