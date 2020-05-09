 <template>
  <div>
    <a-row :gutter="24" style>
      <a-col :span="6">
        <a-card title="分类列表" style="height:calc(100vh - 164px)">
          <a slot="extra" href="#">新增</a>
          <a-tree
            :tree-data="categories"
            :replaceFields="{children:'children', title:'name', key:'id' }"
            autoExpandParent
          >
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="12" style="margin-top:50px;">
        <a-form
          :form="editModel"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="createOrUpdateCategory"
        >
          <a-form-item label="分类名称">
            <a-input v-model="editModel.name" />
          </a-form-item>
          <a-form-item label="上级分类">
            <a-select v-model="editModel.parentCategoryId" placeholder="无上级分类" allowClear>
              <a-select-option
                v-for="category in allCategories"
                :key="category.id"
                :value="category.id"
              >{{ category.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="排序">
            <a-input-number id="inputNumber" v-model="editModel.priority" :min="1" :max="1000000" />
          </a-form-item>
          <a-form-item label="分类描述">
            <a-textarea
              placeholder
              v-model="editModel.description"
              :auto-size="{ minRows: 3, maxRows: 6 }"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      allCategories: [],
      categories: [],
      editModel: {
        id: null,
        name: "",
        description: "",
        priority: 99,
        parentCategoryId: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      console.log(e);
    },
    getCategories() {
      this.$http.get("/api/v1/categories").then(categories => {
        this.allCategories = Object.assign({}, categories);

        this.categories = [];

        if (categories) {
          var topCategories = categories.filter(x => !x.parentCategoryId);
          this.poulateSubCategories(topCategories, categories);

          this.categories = topCategories;
        }
      });
    },
    poulateSubCategories(topCategories, categories) {
      for (var topCategory of topCategories) {
        var subCategories = categories.filter(
          x => x.parentCategoryId === topCategory.id
        );
        topCategory.children = subCategories;
        if (subCategories && subCategories.length > 0) {
          this.poulateSubCategories(subCategories, categories);
        }
      }
    },
    createOrUpdateCategory(e) {
      e.preventDefault();
      if (this.editModel.id) {
        this.update();
      } else {
        this.create();
      }
    },
    create() {
      this.$http.post("/api/v1/categories", this.editModel).then(() => {
        this.$notification.success({
          message: "新增分类成功",
          description: ""
        });
        this.resetEdit();
        this.getCategories();
      });
    },
    update() {
      this.$http.put("/api/v1/categories", this.editModel).then(() => {
        this.$notification.success({
          message: "更新分类成功",
          description: ""
        });
        this.resetEdit();
        this.getCategories();
      });
    },
    resetEdit() {
      this.editModel = {
        id: null,
        name: "",
        description: "",
        priority: 99,
        parentCategoryId: ""
      };
    }
  },
  mounted() {},
  created() {
    this.getCategories();
  }
};
</script>